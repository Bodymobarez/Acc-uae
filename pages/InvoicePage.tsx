
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// comment fix: Corrected import paths
import { Booking, Client, Invoice, InvoiceItem, BookingCategory, ServiceType } from '../types';
// comment fix: Corrected import paths
import { mockBookings, mockClients } from '../data/mockData'; 
// comment fix: Corrected import paths
import PageHeader from '../components/common/PageHeader';
// comment fix: Corrected import paths
import Card from '../components/common/Card';
// comment fix: Corrected import paths
import Button from '../components/common/Button';
// comment fix: Corrected import paths
import { useLanguage } from '../contexts/LanguageContext';
// comment fix: Corrected import paths
import { UAE_VAT_RATE } from '../constants';

const IconPrint = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.558c.244.13.47.285.682.465a.75.75 0 01.088 1.054l-.058.088a.75.75 0 01-1.054-.088A1.5 1.5 0 0013.25 7.5h-1.141A.751.751 0 0111.25 7H8.75a.751.751 0 01-.859-.75H6.75A1.5 1.5 0 005 7.942a.75.75 0 01-1.054.088l-.058-.088a.75.75 0 01.088-1.054c.213-.18.438-.336.682-.465V2.75zM6.5 8.5c0-.276.224-.5.5-.5h6c.276 0 .5.224.5.5v9.25a.75.75 0 01-.75.75H7.25a.75.75 0 01-.75-.75V8.5zM7.5 12A.5.5 0 018 11.5h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h4a.5.5 0 010 1H8a.5.5 0 01-.5-.5z" clipRule="evenodd" /></svg>;


const InvoicePage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);

  const formatCurrency = (value: number) => value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits:2, maximumFractionDigits:2 }).replace('AED', t('common.amount_aed').split(' ')[1]);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    if (bookingId) {
      const booking = mockBookings.find(b => b.id === bookingId);
      if (booking) {
        const client = mockClients.find(c => c.id === booking.clientId);
        
        const items: InvoiceItem[] = booking.services.map(s => ({
          description: s.serviceName,
          quantity: s.quantity,
          unitPrice: s.price, // This is the price client sees per unit for this item
          total: s.price * s.quantity,
        }));

        const subtotalForInvoice = booking.totalPrice; 
        const vatAmountForInvoice = booking.vatAmount || 0;
        
        let invoiceSubtotal = 0;
        items.forEach(item => {
            const bookingItem = booking.services.find(s => s.serviceName === item.description); 
            if(booking.bookingCategory === BookingCategory.DOMESTIC || bookingItem?.serviceType === ServiceType.VISA) {
                invoiceSubtotal += item.total / (1 + UAE_VAT_RATE);
            } else {
                invoiceSubtotal += item.total;
            }
        });

        const grandTotalForInvoice = invoiceSubtotal + vatAmountForInvoice;
        const generatedInvoiceNumber = booking.invoiceNumber || `INV-${booking.fileNumber}-${Date.now().toString().slice(-5)}`;

        setInvoiceData({
          id: booking.id, 
          invoiceNumber: generatedInvoiceNumber,
          bookingFileNumber: booking.fileNumber,
          issueDate: new Date().toISOString(),
          clientName: client?.name || t('common.unknown_client'),
          clientAddress: client?.address,
          clientVatNumber: client?.vatNumber,
          items, 
          subtotal: invoiceSubtotal, 
          vatRate: UAE_VAT_RATE,
          vatAmount: vatAmountForInvoice, 
          grandTotal: grandTotalForInvoice, 
          companyName: t('invoice.companyName'),
          companyAddress: t('invoice.companyAddress'),
          companyVatNumber: t('invoice.companyVat'),
          notes: booking.notes,
          bookingCategory: booking.bookingCategory
        });

        if (!booking.invoiceNumber) {
            const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
            if (bookingIndex !== -1) {
                mockBookings[bookingIndex].invoiceNumber = generatedInvoiceNumber;
                if (mockBookings[bookingIndex].vatAmount === undefined) { 
                     mockBookings[bookingIndex].vatAmount = vatAmountForInvoice;
                }
            }
        }

      }
    }
  }, [bookingId, t, locale]); 

  if (!invoiceData) {
    return (
      <div>
        <PageHeader title={t('common.loading')} />
        <p>{t('common.loading')}...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={t('invoice.pageTitle')} subtitle={`${t('invoice.invoiceNumber')} ${invoiceData.invoiceNumber}`}>
        <Button onClick={() => window.print()} leftIcon={<IconPrint />} className="no-print">{t('invoice.printInvoice')}</Button>
      </PageHeader>

      <Card className="max-w-4xl mx-auto p-4 sm:p-8 print-invoice-styles">
        <style>
          {`
            @media print {
              body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .no-print { display: none !important; }
              .print-invoice-styles { box-shadow: none !important; border: none !important; margin: 0 !important; max-width: 100% !important; padding: 0 !important; }
              header, footer, .no-print-header { display: none !important; } 
              main { padding: 0 !important; }
            }
          `}
        </style>
        <header className="flex justify-between items-start mb-8 pb-4 border-b">
          <div>
            <h1 className="text-3xl font-bold text-primary-600">{t('invoice.invoice')}</h1>
            <p className="text-secondary-500">{`${t('invoice.invoiceNumber')} ${invoiceData.invoiceNumber}`}</p>
            <p className="text-secondary-500">{`${t('invoice.bookingFile')} ${invoiceData.bookingFileNumber}`}</p>
            {invoiceData.bookingCategory && <p className="text-secondary-500">{`${t('bookings.bookingCategory')}: ${t(invoiceData.bookingCategory === BookingCategory.DOMESTIC ? 'bookings.categoryDomestic' : 'bookings.categoryInternational')}`}</p>}
          </div>
          <div className="text-end">
            <h2 className="text-xl font-semibold text-secondary-800">{invoiceData.companyName}</h2>
            <p className="text-sm text-secondary-600">{invoiceData.companyAddress}</p>
            <p className="text-sm text-secondary-600">{invoiceData.companyVatNumber}</p>
            <p className="text-sm text-secondary-600">{`${t('invoice.dateOfIssue')} ${formatDate(invoiceData.issueDate)}`}</p>
          </div>
        </header>

        <section className="mb-8">
          <h3 className="text-md font-semibold text-secondary-700 mb-1">{t('invoice.invoiceTo')}</h3>
          <p className="font-medium text-secondary-800">{invoiceData.clientName}</p>
          {invoiceData.clientAddress && <p className="text-sm text-secondary-600">{invoiceData.clientAddress}</p>}
          {invoiceData.clientVatNumber && <p className="text-sm text-secondary-600">{`${t('common.vat_number')}: ${invoiceData.clientVatNumber}`}</p>}
        </section>

        <section className="mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-secondary-100">
                <tr>
                  <th className="px-4 py-2 text-start text-sm font-semibold text-secondary-700">{t('common.description')}</th>
                  <th className="px-4 py-2 text-end text-sm font-semibold text-secondary-700">{t('bookings.qty')}</th>
                  <th className="px-4 py-2 text-end text-sm font-semibold text-secondary-700">{t('bookings.price')}</th>
                  <th className="px-4 py-2 text-end text-sm font-semibold text-secondary-700">{t('bookings.totalPrice')}</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b border-secondary-100">
                    <td className="px-4 py-2 text-secondary-700">{item.description}</td>
                    <td className="px-4 py-2 text-end text-secondary-700">{item.quantity}</td>
                    <td className="px-4 py-2 text-end text-secondary-700">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-4 py-2 text-end text-secondary-700">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex justify-end mb-8">
          <div className="w-full sm:w-1/2 lg:w-2/5 space-y-2">
            <div className="flex justify-between">
              <span className="text-secondary-600">{t('invoice.subtotal')}:</span>
              <span className="font-medium text-secondary-800">{formatCurrency(invoiceData.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">{t('invoice.vatRate', { rate: (invoiceData.vatRate * 100).toFixed(0) })}:</span>
              <span className="font-medium text-secondary-800">{formatCurrency(invoiceData.vatAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-secondary-300">
              <span className="text-lg font-bold text-primary-600">{t('invoice.grandTotal')}:</span>
              <span className="text-lg font-bold text-primary-600">{formatCurrency(invoiceData.grandTotal)}</span>
            </div>
          </div>
        </section>

        {invoiceData.notes && (
          <section className="mb-8 p-4 bg-secondary-50 rounded-md">
            <h4 className="font-semibold text-secondary-700 mb-1">{t('common.notes')}:</h4>
            <p className="text-sm text-secondary-600 whitespace-pre-line">{invoiceData.notes}</p>
          </section>
        )}

        <footer className="text-center text-sm text-secondary-500 pt-4 border-t">
          <p>{t('invoice.thankYou')}</p>
        </footer>
      </Card>
      <div className="mt-6 text-center no-print">
         <Button onClick={() => window.print()} leftIcon={<IconPrint />}>{t('invoice.printInvoice')}</Button>
      </div>
    </div>
  );
};

export default InvoicePage;
    
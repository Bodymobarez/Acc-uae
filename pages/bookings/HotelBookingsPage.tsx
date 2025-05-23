import React, { useState, useMemo, useCallback } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import { Booking, BookingStatus, Client, ServiceType } from '../../types';
import { mockBookings, mockClients } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

// Icons
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;
const IconInvoice = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3.505 2.365A.5.5 0 003 2.5v15a.5.5 0 00.505.435L16.25 18.5V2.5l-12.745-.635zM4.5 4h11v11.5l-11 1V4z"/><path d="M7.25 7a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zM7 10.25a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zM7.25 13a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"/></svg>;

const BookingStatusColors: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [BookingStatus.CONFIRMED]: "bg-green-100 text-green-800",
  [BookingStatus.COMPLETED]: "bg-blue-100 text-blue-800",
  [BookingStatus.CANCELLED]: "bg-red-100 text-red-800",
};

interface HotelBookingsPageProps {
  serviceTypeFocus: ServiceType.HOTEL; 
}

const HotelBookingsPage: React.FC<HotelBookingsPageProps> = ({ serviceTypeFocus }) => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const navigate = useNavigate();

  const [allBookings, setAllBookings] = useState<Booking[]>(mockBookings); 
  const [clients] = useState<Client[]>(mockClients);

  const hotelBookings = useMemo(() => {
    return allBookings.filter(booking => 
      booking.services.some(service => service.serviceType === serviceTypeFocus)
    );
  }, [allBookings, serviceTypeFocus]);

  const formatCurrency = (value: number) => value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits:2, maximumFractionDigits:2 }).replace('AED', t('common.amount_aed').split(' ')[1]);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);

  const columns = React.useMemo(() => [
    { Header: 'bookings.fileNumber', accessor: 'fileNumber' as keyof Booking },
    { Header: 'bookings.client', accessor: (row: Booking) => clients.find(c => c.id === row.clientId)?.name || t('common.na') },
    { Header: 'common.date', accessor: 'bookingDate' as keyof Booking, Cell: (value: string) => formatDate(value) },
    { Header: 'bookings.totalPrice', accessor: 'totalPrice' as keyof Booking, Cell: (value: number) => formatCurrency(value) },
    { Header: 'common.vatAmount', accessor: 'vatAmount' as keyof Booking, Cell: (value?:number) => value ? formatCurrency(value) : '-' },
    { Header: 'bookings.netProfit', accessor: 'netProfit' as keyof Booking, Cell: (value: number) => formatCurrency(value) },
    { Header: 'bookings.commission', accessor: 'employeeCommissionAmount' as keyof Booking, Cell: (value: number) => formatCurrency(value) },
    { Header: 'common.status', accessor: 'status' as keyof Booking, Cell: (value: BookingStatus) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${BookingStatusColors[value]}`}>
            {t(`bookings.${value.toLowerCase()}` as any) || value}
        </span>
    )},
  ], [clients, t, formatDate, formatCurrency]);

  const handleAddNewHotelBooking = () => {
    navigate('/bookings/hotels/manage/new');
  };

  const handleEditHotelBooking = (bookingId: string) => {
    navigate(`/bookings/hotels/manage/edit/${bookingId}`);
  };

  const handleDeleteBooking = useCallback((bookingId: string) => {
    if (window.confirm(t('common.confirm_delete_prompt'))) {
      setAllBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
    }
  }, [t]);
  
  const handleGenerateInvoice = (bookingId: string) => {
    const bookingToUpdate = allBookings.find(b => b.id === bookingId);
    if (bookingToUpdate && !bookingToUpdate.invoiceNumber) {
        const updatedBooking = { ...bookingToUpdate, invoiceNumber: `INV-${bookingToUpdate.fileNumber}-${Date.now().toString().slice(-4)}`};
        setAllBookings(currentBookings => currentBookings.map(b => b.id === bookingId ? updatedBooking : b));
    }
    navigate(`/invoice/${bookingId}`);
  };

  const renderRowActions = useCallback((booking: Booking) => (
     <>
      <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); handleEditHotelBooking(booking.id);}} leftIcon={<IconPencil />} className="me-1">
        {t('common.edit')}
      </Button>
      <Button variant="secondary" size="sm" onClick={(e) => {e.stopPropagation(); handleGenerateInvoice(booking.id);}} leftIcon={<IconInvoice />} className="me-1">
        {t('bookings.generateInvoice')}
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteBooking(booking.id);}} leftIcon={<IconTrash />}>
        {t('common.delete')}
      </Button>
    </>
  ), [t, handleDeleteBooking, navigate]); // Removed handleEditHotelBooking from dep array as it's stable

  return (
    <div>
      <PageHeader title={t('bookings.hotelBookingsPageTitle')} subtitle={t('bookings.hotelBookingsPageSubtitle')}>
        <Button onClick={handleAddNewHotelBooking} leftIcon={<IconPlus />} size="lg">
          {t('bookings.addNewHotelBooking')}
        </Button>
      </PageHeader>

      <Table<Booking> columns={columns} data={hotelBookings} renderRowActions={renderRowActions} />
    </div>
  );
};

export default HotelBookingsPage;
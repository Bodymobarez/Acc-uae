
import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
// FIXME: Corrected BookingCategory import from types
import { Booking, BookingServiceItem, BookingStatus, Client, Employee, TourismService, ServiceType, HotelServiceDetails, BookingCategory } from '../types';
import { mockBookings, mockClients, mockEmployees, mockServices, generateId } from '../data/mockData';
import Card from '../components/common/Card';
import { useLanguage } from '../contexts/LanguageContext';
import HotelServiceForm from '../components/HotelServiceForm';
// FIXME: Corrected BOOKING_CATEGORY_OPTIONS import from constants
import { SERVICE_TYPE_OPTIONS, BOOKING_CATEGORY_OPTIONS, UAE_VAT_RATE } from '../constants';
import { useNavigate } from 'react-router-dom';


const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;
const IconInvoice = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3.505 2.365A.5.5 0 003 2.5v15a.5.5 0 00.505.435L16.25 18.5V2.5l-12.745-.635zM4.5 4h11v11.5l-11 1V4z"/><path d="M7.25 7a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zM7 10.25a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zM7.25 13a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"/></svg>;

// Fix: Added customerServiceCommissionPercentage and customerServiceCommissionAmount to initial state object and its type.
// The type Omit<Booking, 'id' | 'totalCost' | 'totalPrice' | 'netProfit' | 'employeeCommissionAmount' | 'invoiceNumber'>
// expects these fields as they are not in the omit list.
const initialBookingFormState: Omit<Booking, 'id' | 'totalCost' | 'totalPrice' | 'netProfit' | 'employeeCommissionAmount' | 'invoiceNumber'> = {
  fileNumber: `TF-${new Date().getFullYear()}-${String(Math.floor(Math.random()*900)+100).padStart(3,'0')}`,
  clientId: '',
  employeeId: '',
  bookingDate: new Date().toISOString().split('T')[0],
  bookingCategory: BookingCategory.DOMESTIC,
  services: [], // This will be managed by currentServiceItems
  employeeCommissionPercentage: 10,
  // FIX: Add missing properties
  customerServiceCommissionPercentage: 0,
  customerServiceCommissionAmount: 0, // This will be recalculated, but satisfies the type for useState
  status: BookingStatus.PENDING,
  notes: '',
  vatAmount: 0, // This will be recalculated, but satisfies the type for useState
};

const BookingStatusColors: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [BookingStatus.CONFIRMED]: "bg-green-100 text-green-800",
  [BookingStatus.COMPLETED]: "bg-blue-100 text-blue-800",
  [BookingStatus.CANCELLED]: "bg-red-100 text-red-800",
};

interface SelectOption { value: string; label: string; }


const BookingsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [clients] = useState<Client[]>(mockClients);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [allServices] = useState<TourismService[]>(mockServices);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [bookingForm, setBookingForm] = useState<Omit<Booking, 'id' | 'totalCost' | 'totalPrice' | 'netProfit' | 'employeeCommissionAmount' | 'invoiceNumber'>>(initialBookingFormState);
  
  const [currentServiceItems, setCurrentServiceItems] = useState<BookingServiceItem[]>([]);
  const [selectedServiceToAdd, setSelectedServiceToAdd] = useState<string>('');
  const [selectedServiceTypeToAdd, setSelectedServiceTypeToAdd] = useState<ServiceType>(ServiceType.GENERIC);

  const [isHotelDetailModalOpen, setIsHotelDetailModalOpen] = useState(false);
  const [editingHotelServiceItemIndex, setEditingHotelServiceItemIndex] = useState<number | null>(null);

  const formatCurrency = (value: number) => value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits:2, maximumFractionDigits:2 }).replace('AED', t('common.amount_aed').split(' ')[1]);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);

  // FIX: Ensure customerServiceCommissionAmount is calculated and used
  const { totalCost, totalPrice, netProfit, employeeCommissionAmount, customerServiceCommissionAmount, totalVatAmount } = React.useMemo(() => {
    let calculatedTotalCost = 0;
    let calculatedTotalPriceToClient = 0; 
    let calculatedTotalVat = 0;
    let calculatedNetProfitAfterVAT = 0;

    currentServiceItems.forEach(item => {
        const itemTotalCost = item.cost * item.quantity;
        const itemRevenueFromPrice = item.price * item.quantity; 
        calculatedTotalCost += itemTotalCost;
        calculatedTotalPriceToClient += itemRevenueFromPrice;

        let itemVAT = 0;
        let itemNetRevenueForProfitCalc = itemRevenueFromPrice;
        
        const isDomesticVATRule = bookingForm.bookingCategory === BookingCategory.DOMESTIC || item.serviceType === ServiceType.VISA;

        if (isDomesticVATRule) {
            itemNetRevenueForProfitCalc = itemRevenueFromPrice / (1 + UAE_VAT_RATE);
            itemVAT = itemRevenueFromPrice - itemNetRevenueForProfitCalc;
        } else { 
            const itemGrossProfit = itemRevenueFromPrice - itemTotalCost;
            // Ensure grossProfit is positive before calculating VAT to avoid negative VAT
            itemVAT = itemGrossProfit > 0 ? itemGrossProfit * UAE_VAT_RATE : 0;
        }
        calculatedTotalVat += itemVAT;
        if (isDomesticVATRule) {
            calculatedNetProfitAfterVAT += itemNetRevenueForProfitCalc - itemTotalCost;
        } else {
            calculatedNetProfitAfterVAT += (itemRevenueFromPrice - itemTotalCost) - itemVAT;
        }
    });

    const finalNetProfitAfterVAT = Math.max(0, calculatedNetProfitAfterVAT); // Ensure profit is not negative

    const empCommission = finalNetProfitAfterVAT * (bookingForm.employeeCommissionPercentage / 100);
    // FIX: Calculate customerServiceCommissionAmount using customerServiceCommissionPercentage from form
    const csCommission = finalNetProfitAfterVAT * ((bookingForm.customerServiceCommissionPercentage || 0) / 100);
    
    return { 
        totalCost: calculatedTotalCost, 
        totalPrice: calculatedTotalPriceToClient, 
        netProfit: finalNetProfitAfterVAT, 
        employeeCommissionAmount: empCommission,
        customerServiceCommissionAmount: csCommission, // FIX: Return calculated csCommission
        totalVatAmount: calculatedTotalVat,
    };
  }, [currentServiceItems, bookingForm.bookingCategory, bookingForm.employeeCommissionPercentage, bookingForm.customerServiceCommissionPercentage]);


  const clientOptions: SelectOption[] = clients.map((c) => ({ value: c.id, label: c.name }));
  const employeeOptions: SelectOption[] = employees.map((e) => ({ value: e.id, label: e.name }));
  const baseServiceOptions: SelectOption[] = allServices.map((s) => ({ value: s.id, label: s.name })); 
  const bookingStatusOptions: SelectOption[] = Object.values(BookingStatus).map((status) => ({ value: status, label: t(`bookings.${status.toLowerCase()}` as any) || status }));
  const serviceTypeOptions: SelectOption[] = SERVICE_TYPE_OPTIONS.map(opt => ({...opt, label: t(opt.label as any, {defaultValue: opt.value})}));
  const categoryOptions: SelectOption[] = BOOKING_CATEGORY_OPTIONS.map(opt => ({ ...opt, label: t(opt.label as any, { defaultValue: opt.value }) }));


  const columns = React.useMemo(() => [
    { Header: 'bookings.fileNumber', accessor: 'fileNumber' as keyof Booking },
    { Header: 'bookings.client', accessor: (row: Booking) => clients.find(c => c.id === row.clientId)?.name || t('common.na') },
    { Header: 'common.date', accessor: 'bookingDate' as keyof Booking, Cell: (value: string) => formatDate(value) },
    { Header: 'bookings.totalPrice', accessor: 'totalPrice' as keyof Booking, Cell: (value: number) => formatCurrency(value) },
    { Header: 'bookings.netProfit', accessor: 'netProfit' as keyof Booking, Cell: (value: number) => formatCurrency(value) },
    { Header: 'bookings.commission', accessor: 'employeeCommissionAmount' as keyof Booking, Cell: (value: number) => formatCurrency(value) },
    { Header: 'common.status', accessor: 'status' as keyof Booking, Cell: (value: BookingStatus) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${BookingStatusColors[value]}`}>
            {t(`bookings.${value.toLowerCase()}` as any) || value}
        </span>
    )},
  ], [clients, t, formatDate, formatCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const val = (name === 'employeeCommissionPercentage' || name === 'customerServiceCommissionPercentage') ? parseFloat(value) : value;
    setBookingForm(prev => ({ ...prev, [name]: val as any }));
  };

  const handleServiceItemChange = (index: number, field: keyof BookingServiceItem, value: string | number | ServiceType) => {
    const updatedItems = [...currentServiceItems];
    // @ts-ignore
    updatedItems[index][field] = typeof value === 'string' && (field === 'cost' || field === 'price' || field === 'quantity') ? parseFloat(value) : value;
    setCurrentServiceItems(updatedItems);
  };
  
  const addServiceItem = () => {
    if (!selectedServiceToAdd) return;
    const serviceDetails = allServices.find(s => s.id === selectedServiceToAdd);
    if (serviceDetails) {
      const newItem: BookingServiceItem = {
        id: generateId(),
        serviceId: serviceDetails.id,
        serviceName: serviceDetails.name,
        serviceType: selectedServiceTypeToAdd,
        cost: serviceDetails.defaultCost,
        price: serviceDetails.defaultPrice,
        quantity: 1,
      };
      if (selectedServiceTypeToAdd === ServiceType.HOTEL) {
        newItem.hotelDetails = {}; // Initialize with empty or default hotel details
      }
      setCurrentServiceItems(prev => [...prev, newItem]);
      setSelectedServiceToAdd(''); 
      setSelectedServiceTypeToAdd(ServiceType.GENERIC);
    }
  };

  const removeServiceItem = (index: number) => {
    setCurrentServiceItems(prev => prev.filter((_, i) => i !== index));
  };

  const openHotelDetailModal = (itemIndex: number) => {
    setEditingHotelServiceItemIndex(itemIndex);
    setIsHotelDetailModalOpen(true);
  };

  const handleHotelDetailsSubmit = (hotelData: HotelServiceDetails) => {
    if (editingHotelServiceItemIndex !== null) {
      const updatedItems = [...currentServiceItems];
      updatedItems[editingHotelServiceItemIndex].hotelDetails = hotelData;
      setCurrentServiceItems(updatedItems);
    }
    setIsHotelDetailModalOpen(false);
    setEditingHotelServiceItemIndex(null);
  };

  const openModalForCreate = () => {
    setEditingBooking(null);
    const newFileNumber = `TF-${new Date().getFullYear()}-${String(bookings.length + 101).padStart(3,'0')}`;
    setBookingForm({...initialBookingFormState, fileNumber: newFileNumber});
    setCurrentServiceItems([]);
    setIsModalOpen(true);
  };

  const openModalForEdit = (booking: Booking) => {
    setEditingBooking(booking);
    // FIX: Ensure all required properties for the form state are set from the booking object
    // The initialBookingFormState (and its type) expects customerServiceCommissionAmount and vatAmount
    setBookingForm({
      fileNumber: booking.fileNumber,
      clientId: booking.clientId,
      employeeId: booking.employeeId,
      bookingDate: booking.bookingDate.split('T')[0], 
      bookingCategory: booking.bookingCategory,
      services: [], // services managed by currentServiceItems
      employeeCommissionPercentage: booking.employeeCommissionPercentage,
      customerServiceCommissionPercentage: booking.customerServiceCommissionPercentage || 0,
      customerServiceCommissionAmount: booking.customerServiceCommissionAmount || 0, 
      status: booking.status,
      notes: booking.notes || '',
      vatAmount: booking.vatAmount || 0, 
    });
    setCurrentServiceItems(booking.services.map(s => ({...s}))); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBooking(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData: Booking = {
      id: editingBooking ? editingBooking.id : generateId(),
      fileNumber: bookingForm.fileNumber,
      clientId: bookingForm.clientId,
      employeeId: bookingForm.employeeId,
      bookingDate: bookingForm.bookingDate,
      bookingCategory: bookingForm.bookingCategory,
      services: currentServiceItems,
      totalCost,
      totalPrice,
      netProfit,
      employeeCommissionPercentage: bookingForm.employeeCommissionPercentage,
      employeeCommissionAmount,
      // FIX: Use customerServiceCommissionPercentage from form and calculated customerServiceCommissionAmount
      customerServiceCommissionPercentage: bookingForm.customerServiceCommissionPercentage || 0,
      customerServiceCommissionAmount,
      status: bookingForm.status,
      notes: bookingForm.notes,
      vatAmount: totalVatAmount, 
      invoiceNumber: editingBooking?.invoiceNumber || null, 
    };

    if (editingBooking) {
      setBookings(bookings.map(b => b.id === editingBooking.id ? bookingData : b));
    } else {
      setBookings(prev => [bookingData, ...prev]);
    }
    closeModal();
  };

  const handleDeleteBooking = useCallback((bookingId: string) => {
    if (window.confirm(t('common.confirm_delete_prompt'))) {
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
    }
  }, [t]);

  const handleGenerateInvoice = (bookingId: string) => {
    const bookingToUpdate = bookings.find(b => b.id === bookingId);
    if (bookingToUpdate && !bookingToUpdate.invoiceNumber) {
        const updatedBooking = { ...bookingToUpdate, invoiceNumber: `INV-${bookingToUpdate.fileNumber}-${Date.now().toString().slice(-4)}`};
        setBookings(currentBookings => currentBookings.map(b => b.id === bookingId ? updatedBooking : b));
    }
    navigate(`/invoice/${bookingId}`);
  };

  const renderRowActions = useCallback((booking: Booking) => (
    <>
      <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); openModalForEdit(booking);}} leftIcon={<IconPencil />} className="me-1">
        {t('common.edit')}
      </Button>
      <Button variant="secondary" size="sm" onClick={(e) => {e.stopPropagation(); handleGenerateInvoice(booking.id);}} leftIcon={<IconInvoice />} className="me-1">
        {t('bookings.generateInvoice')}
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteBooking(booking.id);}} leftIcon={<IconTrash />}>
        {t('common.delete')}
      </Button>
    </>
  ), [t, handleDeleteBooking, navigate]);

  return (
    <div>
      <PageHeader title={t('bookings.pageTitle')} subtitle={t('bookings.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />}>
          {t('bookings.addNew')}
        </Button>
      </PageHeader>

      <Table<Booking> columns={columns} data={bookings} renderRowActions={renderRowActions} />

      {/* Main Booking Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingBooking ? t('bookings.editBooking') : t('bookings.createBooking')} size="2xl"> {/* Increased Modal Size */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="fileNumber" label={t('bookings.fileNumber')} value={bookingForm.fileNumber} onChange={handleInputChange} required />
            <Input name="bookingDate" label={t('bookings.bookingDate')} type="date" value={bookingForm.bookingDate} onChange={handleInputChange} required />
            <Select name="clientId" label={t('bookings.client')} value={bookingForm.clientId} onChange={handleInputChange} options={clientOptions} required placeholder={t('bookings.select_client')} />
            <Select name="employeeId" label={t('bookings.employeeSalesAgent')} value={bookingForm.employeeId} onChange={handleInputChange} options={employeeOptions} required placeholder={t('bookings.select_employee')} />
            <Select name="bookingCategory" label={t('bookings.bookingCategory')} value={bookingForm.bookingCategory} onChange={handleInputChange} options={categoryOptions} required placeholder={t('bookings.select_booking_category')} />
            <Select name="status" label={t('bookings.bookingStatus')} value={bookingForm.status} onChange={handleInputChange} options={bookingStatusOptions} required />
            <Input name="employeeCommissionPercentage" label={t('bookings.employeeCommissionPercentage')} type="number" step="1" min="0" max="100" value={bookingForm.employeeCommissionPercentage} onChange={handleInputChange} required />
            {/* FIX: Add Customer Service Commission Percentage input */}
            <Input name="customerServiceCommissionPercentage" label={t('bookings.customerServiceCommissionPercentage')} type="number" step="1" min="0" max="100" value={bookingForm.customerServiceCommissionPercentage || 0} onChange={handleInputChange} />
          </div>
          
          <div className="mt-6">
            <h4 className="text-md font-semibold text-secondary-700 mb-2">{t('bookings.services')}</h4>
            <Card className="bg-secondary-50 p-4">
              {currentServiceItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-x-2 gap-y-1 mb-2 items-center border-b border-secondary-200 pb-2">
                  <div className="col-span-12 md:col-span-3">
                    <Input label={t('common.name')} value={item.serviceName} disabled wrapperClassName="mb-0"/>
                  </div>
                   <div className="col-span-6 md:col-span-2">
                     <Input label={t('bookings.serviceType')} value={t(SERVICE_TYPE_OPTIONS.find(opt=>opt.value === item.serviceType)?.label as any, {defaultValue:item.serviceType})} disabled wrapperClassName="mb-0"/>
                   </div>
                  <div className="col-span-6 md:col-span-1">
                    <Input label={t('bookings.qty')} type="number" min="1" value={item.quantity} onChange={(e) => handleServiceItemChange(index, 'quantity', e.target.value)} wrapperClassName="mb-0"/>
                  </div>
                  <div className="col-span-6 md:col-span-1">
                    <Input label={t('bookings.cost')} type="number" step="0.01" value={item.cost} onChange={(e) => handleServiceItemChange(index, 'cost', e.target.value)} wrapperClassName="mb-0"/>
                  </div>
                  <div className="col-span-6 md:col-span-1">
                    <Input label={t('bookings.price')} type="number" step="0.01" value={item.price} onChange={(e) => handleServiceItemChange(index, 'price', e.target.value)} wrapperClassName="mb-0"/>
                  </div>
                  <div className="col-span-6 md:col-span-2 flex items-end justify-start md:justify-center pb-0 md:pb-1 mt-1 md:mt-0">
                    {item.serviceType === ServiceType.HOTEL && (
                      <Button type="button" variant="outline" size="sm" onClick={() => openHotelDetailModal(index)}>{t('bookings.editServiceDetails')}</Button>
                    )}
                  </div>
                  <div className="col-span-6 md:col-span-2 flex items-end justify-end pb-0 md:pb-1 mt-1 md:mt-0">
                     <Button type="button" variant="danger" size="sm" onClick={() => removeServiceItem(index)} className="w-full md:w-auto">{t('bookings.remove_service_item')}</Button>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mt-2 items-end">
                <div className="md:col-span-4">
                    <Select 
                      value={selectedServiceToAdd} 
                      onChange={(e) => setSelectedServiceToAdd(e.target.value)} 
                      options={baseServiceOptions}
                      placeholder={t('bookings.select_service_to_add')}
                      label={t('bookings.addServicePrompt')}
                      wrapperClassName="mb-0 w-full"
                    />
                </div>
                <div className="md:col-span-4">
                     <Select 
                        value={selectedServiceTypeToAdd}
                        onChange={(e) => setSelectedServiceTypeToAdd(e.target.value as ServiceType)}
                        options={serviceTypeOptions}
                        label={t('bookings.serviceType')}
                        wrapperClassName="mb-0 w-full"
                     />
                </div>
                <div className="md:col-span-4">
                    <Button type="button" onClick={addServiceItem} variant="secondary" leftIcon={<IconPlus />} disabled={!selectedServiceToAdd} className="w-full">{t('bookings.add_service_item')}</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-primary-50 rounded-lg text-start">
              <div><p className="text-sm text-secondary-600">{t('bookings.totalCost')}</p><p className="font-semibold text-lg text-primary-700">{formatCurrency(totalCost)}</p></div>
              <div><p className="text-sm text-secondary-600">{t('bookings.totalPriceLabel')}</p><p className="font-semibold text-lg text-primary-700">{formatCurrency(totalPrice)}</p></div>
              <div><p className="text-sm text-secondary-600">{t('bookings.vatAmountLabel')}</p><p className="font-semibold text-lg text-primary-700">{formatCurrency(totalVatAmount)}</p></div>
              <div><p className="text-sm text-secondary-600">{t('bookings.netProfitLabel')}</p><p className="font-semibold text-lg text-primary-700">{formatCurrency(netProfit)}</p></div>
              <div><p className="text-sm text-secondary-600">{t('bookings.empCommissionLabel')}</p><p className="font-semibold text-lg text-primary-700">{formatCurrency(employeeCommissionAmount)}</p></div>
              {/* FIX: Display Customer Service Commission Amount */}
              <div><p className="text-sm text-secondary-600">{t('bookings.csCommissionLabel')}</p><p className="font-semibold text-lg text-primary-700">{formatCurrency(customerServiceCommissionAmount)}</p></div>
          </div>
          
          <Input name="notes" label={t('common.notes')} value={bookingForm.notes || ''} onChange={handleInputChange} wrapperClassName="mt-4" isTextArea={true} rows={3} />

          <div className="mt-8 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingBooking ? t('common.save_changes') : t('bookings.createBooking')}</Button>
          </div>
        </form>
      </Modal>

      {/* Hotel Service Details Modal */}
      {isHotelDetailModalOpen && editingHotelServiceItemIndex !== null && currentServiceItems[editingHotelServiceItemIndex] && (
        <Modal 
            isOpen={isHotelDetailModalOpen} 
            onClose={() => { setIsHotelDetailModalOpen(false); setEditingHotelServiceItemIndex(null); }} 
            title={t('hotel.detailsTitle') + ` - ${currentServiceItems[editingHotelServiceItemIndex]?.serviceName || ''}`} 
            size="xl"
        >
          <HotelServiceForm 
            initialDetails={currentServiceItems[editingHotelServiceItemIndex]?.hotelDetails}
            onSubmit={handleHotelDetailsSubmit}
            onCancel={() => { setIsHotelDetailModalOpen(false); setEditingHotelServiceItemIndex(null); }}
          />
        </Modal>
      )}

    </div>
  );
};

export default BookingsPage;
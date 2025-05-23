


import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// comment fix: Corrected import paths
import PageHeader from '../../../components/common/PageHeader';
// comment fix: Corrected import paths
import Button from '../../../components/common/Button';
// comment fix: Corrected import paths
import Input from '../../../components/common/Input';
// comment fix: Corrected import paths
import Select from '../../../components/common/Select';
// comment fix: Corrected import paths
import Card from '../../../components/common/Card';
// comment fix: Corrected import paths
import HotelServiceForm from '../../../components/HotelServiceForm';
import { 
  Booking, BookingServiceItem, BookingStatus, Client, Employee, 
  HotelServiceDetails, ServiceType, BookingCategory 
// comment fix: Corrected import paths
} from '../../../types';
import { 
  mockBookings, mockClients, mockEmployees, generateId, mockServices 
// comment fix: Corrected import paths
} from '../../../data/mockData';
// comment fix: Corrected import paths
import { useLanguage } from '../../../contexts/LanguageContext';
// comment fix: Corrected import paths
import { BOOKING_CATEGORY_OPTIONS, UAE_VAT_RATE } from '../../../constants';

const IconSave = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" /><path fillRule="evenodd" d="M2 2.5a2.5 2.5 0 012.5-2.5h11A2.5 2.5 0 0118 2.5v15a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 17.5v-15zm11.5.906a.75.75 0 00-1.06 0L8.594 7.25H6.75a.75.75 0 000 1.5h2.373a.75.75 0 00.529-.22L13.594 4a.75.75 0 00-.031-1.06z" clipRule="evenodd" /></svg>;

type ManageHotelBookingFormState = Omit<Booking, 'id' | 'services' | 'totalCost' | 'totalPrice' | 'vatAmount' | 'netProfit' | 'employeeCommissionAmount' | 'customerServiceCommissionAmount'| 'invoiceNumber'> & {
  hotelServiceCost: number;
  hotelServicePrice: number;
  customerServiceCommissionPercentage: number; // Added this
};

const initialHotelServiceDetails: HotelServiceDetails = {
  voucherNumber: '', country: '', city: '', hotelName: '', region: 'DOMESTIC', pnr: '', originCountry: '', gds: 'Other',
  issuingStaff: '', bookingStaff: '', issueDate: new Date().toISOString().split('T')[0], supplierConfNo: '', hotelConfNo: '',
  roomType: '', checkInDate: new Date().toISOString().split('T')[0], checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default to next day
  branch: 'Main', ratePerNight: 0, mealsPlan: 'BB', noOfAdults: 1, noOfChildren: 0, noOfRooms: 1, noOfNights: 1,
  guests: '', bookingDetails: '', additionalReference: '', couponRemark: '', 
  customerEmpNo: '', // This was indicated as line 56 by the error, but it's a field in an object.
  termsAndConditions: false, pickUp: false, dropOff: false,
};

const ManageHotelBookingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId?: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const [isEditing, setIsEditing] = useState(!!bookingId);
  
  // Ensure mockBookings is defined and is an array before accessing its length
  const initialFileNumber = `TF-${new Date().getFullYear()}-${String((mockBookings ? mockBookings.length : 0) + 101).padStart(3, '0')}`;


  const [formState, setFormState] = useState<ManageHotelBookingFormState>({
    fileNumber: initialFileNumber,
    clientId: '',
    employeeId: '',
    bookingDate: new Date().toISOString().split('T')[0],
    bookingCategory: BookingCategory.DOMESTIC,
    status: BookingStatus.PENDING,
    employeeCommissionPercentage: 10,
    customerServiceCommissionPercentage: 0, // Initialize new field
    notes: '',
    hotelServiceCost: 0,
    hotelServicePrice: 0,
  });
  const [hotelDetails, setHotelDetails] = useState<HotelServiceDetails>(initialHotelServiceDetails);

  const [clients] = useState<Client[]>(mockClients);
  const [employees] = useState<Employee[]>(mockEmployees);
  
  const clientOptions = clients.map((c) => ({ value: c.id, label: c.name }));
  const employeeOptions = employees.map((e) => ({ value: e.id, label: e.name }));
  const bookingStatusOptions = Object.values(BookingStatus).map((status) => ({ value: status, label: t(`bookings.${status.toLowerCase()}` as any) || status }));
  const categoryOptions = BOOKING_CATEGORY_OPTIONS.map(opt => ({ ...opt, label: t(opt.label as any, { defaultValue: opt.value }) }));


  useEffect(() => {
    if (bookingId) {
      const bookingToEdit = mockBookings.find(b => b.id === bookingId);
      if (bookingToEdit && bookingToEdit.services.length > 0 && bookingToEdit.services[0].serviceType === ServiceType.HOTEL) {
        const hotelServiceItem = bookingToEdit.services[0];
        setFormState({
          fileNumber: bookingToEdit.fileNumber,
          clientId: bookingToEdit.clientId,
          employeeId: bookingToEdit.employeeId,
          bookingDate: bookingToEdit.bookingDate.split('T')[0],
          bookingCategory: bookingToEdit.bookingCategory,
          status: bookingToEdit.status,
          employeeCommissionPercentage: bookingToEdit.employeeCommissionPercentage,
          customerServiceCommissionPercentage: bookingToEdit.customerServiceCommissionPercentage || 0,
          notes: bookingToEdit.notes || '',
          hotelServiceCost: hotelServiceItem.cost,
          hotelServicePrice: hotelServiceItem.price,
        });
        setHotelDetails(hotelServiceItem.hotelDetails || initialHotelServiceDetails);
        setIsEditing(true);
      } else {
        console.error("Hotel booking not found or invalid for editing.");
        navigate('/bookings/hotels');
      }
    } else {
       // Ensure a fresh file number if not editing
      const newFileNumber = `TF-${new Date().getFullYear()}-${String((mockBookings ? mockBookings.length : 0) + 101).padStart(3, '0')}`;
      setFormState({
        fileNumber: newFileNumber,
        clientId: '', employeeId: '', bookingDate: new Date().toISOString().split('T')[0],
        bookingCategory: BookingCategory.DOMESTIC, status: BookingStatus.PENDING,
        employeeCommissionPercentage: 10, customerServiceCommissionPercentage: 0, 
        notes: '', hotelServiceCost: 0, hotelServicePrice: 0,
      });
      setHotelDetails(initialHotelServiceDetails);
      setIsEditing(false);
    }
  }, [bookingId, navigate]);

  const handleFormStateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const val = (name === 'employeeCommissionPercentage' || name === 'customerServiceCommissionPercentage' || name === 'hotelServiceCost' || name === 'hotelServicePrice') ? parseFloat(value) : value;
    setFormState(prev => ({ ...prev, [name]: val as any }));
  };

  const handleHotelDetailsChange = (updatedDetails: HotelServiceDetails) => {
    setHotelDetails(updatedDetails);
  };

  const { totalCost, totalPrice, vatAmount, netProfit, employeeCommissionAmount, customerServiceCommissionAmount } = useMemo(() => {
    const cost = formState.hotelServiceCost;
    const price = formState.hotelServicePrice;
    let vat = 0;
    let profitAfterVAT = 0;

    const isDomesticRule = formState.bookingCategory === BookingCategory.DOMESTIC;

    if (isDomesticRule) {
      const netRevenue = price / (1 + UAE_VAT_RATE);
      vat = price - netRevenue;
      profitAfterVAT = netRevenue - cost;
    } else { 
      const grossProfit = price - cost;
      vat = grossProfit > 0 ? grossProfit * UAE_VAT_RATE : 0;
      profitAfterVAT = grossProfit - vat;
    }
    
    const finalNetProfitAfterVAT = Math.max(0, profitAfterVAT);
    const empCommission = finalNetProfitAfterVAT * (formState.employeeCommissionPercentage / 100);
    const csCommission = finalNetProfitAfterVAT * (formState.customerServiceCommissionPercentage / 100);

    return {
      totalCost: cost,
      totalPrice: price,
      vatAmount: vat,
      netProfit: finalNetProfitAfterVAT,
      employeeCommissionAmount: empCommission,
      customerServiceCommissionAmount: csCommission,
    };
  }, [formState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hotelServiceName = hotelDetails.hotelName || t('services.type.Hotel');
    const defaultHotelServiceTemplate = mockServices.find(s => s.name.toLowerCase().includes("room")) || mockServices[0];

    const hotelServiceItem: BookingServiceItem = {
      id: isEditing && bookingId && mockBookings.find(b=>b.id===bookingId)?.services[0]?.id || generateId(), 
      serviceId: defaultHotelServiceTemplate.id, 
      serviceName: hotelServiceName,
      serviceType: ServiceType.HOTEL,
      cost: formState.hotelServiceCost,
      price: formState.hotelServicePrice,
      quantity: 1,
      hotelDetails: hotelDetails,
    };
    
    const newBookingData: Booking = {
      id: isEditing && bookingId ? bookingId : generateId(),
      fileNumber: formState.fileNumber,
      clientId: formState.clientId,
      employeeId: formState.employeeId,
      bookingDate: formState.bookingDate,
      bookingCategory: formState.bookingCategory,
      services: [hotelServiceItem],
      totalCost: totalCost,
      totalPrice: totalPrice, 
      vatAmount: vatAmount,
      netProfit: netProfit,
      employeeCommissionPercentage: formState.employeeCommissionPercentage,
      employeeCommissionAmount: employeeCommissionAmount,
      customerServiceCommissionPercentage: formState.customerServiceCommissionPercentage,
      customerServiceCommissionAmount: customerServiceCommissionAmount,
      status: formState.status,
      notes: formState.notes,
      invoiceNumber: isEditing && bookingId ? mockBookings.find(b => b.id === bookingId)?.invoiceNumber || null : null,
    };

    if (isEditing && bookingId) {
      const index = mockBookings.findIndex(b => b.id === bookingId);
      if (index !== -1) {
        mockBookings[index] = newBookingData;
      }
    } else {
      mockBookings.unshift(newBookingData);
    }
    navigate('/bookings/hotels');
  };

  const formatCurrencyDisplay = (value: number) => value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('AED', t('common.amount_aed').split(' ')[1]);

  return (
    <div>
      <PageHeader 
        title={isEditing ? t('bookings.editBooking') : t('bookings.addNewHotelBooking')} 
        subtitle={t('bookings.hotelBookingsPageSubtitle')}
      />
      <form onSubmit={handleSubmit} className="space-y-6 pb-8">
        <Card title={t('bookings.fileNumber') + " & " + t('bookings.client')}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                <Input name="fileNumber" label={t('bookings.fileNumber')} value={formState.fileNumber} onChange={handleFormStateChange} required />
                <Input name="bookingDate" label={t('bookings.bookingDate')} type="date" value={formState.bookingDate} onChange={handleFormStateChange} required />
                <Select name="clientId" label={t('bookings.client')} value={formState.clientId} onChange={handleFormStateChange} options={clientOptions} required placeholder={t('bookings.select_client')} />
                <Select name="employeeId" label={t('bookings.employeeSalesAgent')} value={formState.employeeId} onChange={handleFormStateChange} options={employeeOptions} required placeholder={t('bookings.select_employee')} />
                <Select name="bookingCategory" label={t('bookings.bookingCategory')} value={formState.bookingCategory} onChange={handleFormStateChange} options={categoryOptions} required />
                <Select name="status" label={t('bookings.bookingStatus')} value={formState.status} onChange={handleFormStateChange} options={bookingStatusOptions} required />
            </div>
        </Card>

        <HotelServiceForm initialDetails={hotelDetails} onSubmit={handleHotelDetailsChange} onCancel={() => { /* No cancel needed here, parent form handles navigation */ }} />
        
        <Card title={t('common.financials')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                <Input name="hotelServiceCost" label={t('bookings.cost') + " (" + t('services.type.Hotel') + ")"} type="number" step="0.01" value={formState.hotelServiceCost} onChange={handleFormStateChange} required />
                <Input name="hotelServicePrice" label={t('bookings.price') + " (" + t('services.type.Hotel') + ")"} type="number" step="0.01" value={formState.hotelServicePrice} onChange={handleFormStateChange} required />
            </div>
        </Card>

        <Card title={t('common.commissions') + " & " + t('common.notes')}>
            <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="employeeCommissionPercentage" label={t('bookings.employeeCommissionPercentage')} type="number" step="1" min="0" max="100" value={formState.employeeCommissionPercentage} onChange={handleFormStateChange} required />
                <Input name="customerServiceCommissionPercentage" label={t('bookings.customerServiceCommissionPercentage')} type="number" step="1" min="0" max="100" value={formState.customerServiceCommissionPercentage} onChange={handleFormStateChange} />
            </div>
            <div className="p-2">
                 <Input name="notes" label={t('common.notes')} value={formState.notes} onChange={handleFormStateChange} isTextArea rows={3} />
            </div>
        </Card>

        <div className="mt-6 p-4 bg-primary-50 rounded-lg text-start">
            <h3 className="text-lg font-semibold text-primary-700 mb-2">{t('common.summary')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                <p><span className="font-medium">{t('bookings.totalCost')}:</span> {formatCurrencyDisplay(totalCost)}</p>
                <p><span className="font-medium">{t('bookings.totalPriceLabel')}:</span> {formatCurrencyDisplay(totalPrice)}</p>
                <p><span className="font-medium">{t('bookings.vatAmountLabel')}:</span> {formatCurrencyDisplay(vatAmount)}</p>
                <p className="font-bold text-primary-600"><span className="font-medium">{t('bookings.netProfitLabel')}:</span> {formatCurrencyDisplay(netProfit)}</p>
                <p><span className="font-medium">{t('bookings.empCommissionLabel')}:</span> {formatCurrencyDisplay(employeeCommissionAmount)}</p>
                <p><span className="font-medium">{t('bookings.csCommissionLabel')}:</span> {formatCurrencyDisplay(customerServiceCommissionAmount)}</p>
            </div>
        </div>

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/bookings/hotels')}>{t('common.cancel')}</Button>
          <Button type="submit" variant="primary" leftIcon={<IconSave />}>{isEditing ? t('common.save_changes') : t('common.save') + " " + t('services.type.Hotel') + " " + t('common.bookings')}</Button>
        </div>
      </form>
    </div>
  );
};
// Fix: Add default export
export default ManageHotelBookingPage;
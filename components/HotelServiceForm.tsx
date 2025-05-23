import React, { useState, useEffect } from 'react';
import { HotelServiceDetails } from '../types';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';
import Card from './common/Card';
import { useLanguage } from '../contexts/LanguageContext';
import { GDS_OPTIONS, REGION_OPTIONS, BRANCH_OPTIONS, MEALS_PLAN_OPTIONS } from '../constants';


interface HotelServiceFormProps {
  initialDetails?: HotelServiceDetails;
  onSubmit: (details: HotelServiceDetails) => void;
  onCancel: () => void;
}

const defaultHotelDetails: HotelServiceDetails = {
  voucherNumber: '',
  country: '',
  city: '',
  hotelName: '',
  region: 'DOMESTIC',
  pnr: '',
  originCountry: '',
  gds: 'Other',
  issuingStaff: '',
  bookingStaff: '',
  issueDate: new Date().toISOString().split('T')[0],
  supplierConfNo: '',
  hotelConfNo: '',
  roomType: '',
  checkInDate: new Date().toISOString().split('T')[0],
  checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default to next day
  branch: 'Main',
  ratePerNight: 0,
  mealsPlan: 'BB',
  noOfAdults: 1,
  noOfChildren: 0,
  noOfRooms: 1,
  noOfNights: 1,
  guests: '',
  bookingDetails: '',
  additionalReference: '',
  couponRemark: '',
  customerEmpNo: '',
  termsAndConditions: false,
  pickUp: false,
  dropOff: false,
};

const HotelServiceForm: React.FC<HotelServiceFormProps> = ({ initialDetails, onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const [details, setDetails] = useState<HotelServiceDetails>(initialDetails || defaultHotelDetails);

  useEffect(() => {
    setDetails(initialDetails || defaultHotelDetails);
  }, [initialDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setDetails(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number' || name === 'ratePerNight' || name === 'noOfAdults' || name === 'noOfChildren' || name === 'noOfRooms' || name === 'noOfNights') {
        setDetails(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
    else {
        setDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };
  
  const regionOptions = REGION_OPTIONS.map(opt => ({...opt, label: t(opt.label.startsWith('hotel.') ? opt.label as any : `hotel.${opt.label.toLowerCase()}` as any, {defaultValue: opt.label})}));
  const gdsOptions = GDS_OPTIONS.map(opt => ({...opt, label: t(opt.label.startsWith('hotel.') ? opt.label as any : `hotel.gds_${opt.value.toLowerCase()}` as any, {defaultValue: opt.label})}));
  const branchOptions = BRANCH_OPTIONS.map(opt => ({...opt, label: t(opt.label.startsWith('hotel.') ? opt.label as any : `hotel.branch_${opt.value.toLowerCase()}` as any, {defaultValue: opt.label})}));
  const mealsPlanOptions = MEALS_PLAN_OPTIONS.map(opt => ({...opt, label: t(opt.label.startsWith('hotel.') ? opt.label as any : `hotel.meals_${opt.value.toLowerCase()}` as any, {defaultValue: opt.label})}));


  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-start">
      <Card title={t('hotel.detailsTitle')}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          <Input name="voucherNumber" label={t('hotel.voucherNumber')} value={details.voucherNumber} onChange={handleInputChange} />
          <Input name="country" label={t('hotel.country')} value={details.country} onChange={handleInputChange} />
          <Input name="city" label={t('hotel.city')} value={details.city} onChange={handleInputChange} />
          <Input name="hotelName" label={t('hotel.hotelName')} value={details.hotelName} onChange={handleInputChange} wrapperClassName="lg:col-span-2" />
          <Select name="region" label={t('hotel.region')} value={details.region} onChange={handleInputChange} options={regionOptions} />
          
          <Input name="pnr" label={t('hotel.pnr')} value={details.pnr} onChange={handleInputChange} />
          <Input name="originCountry" label={t('hotel.originCountry')} value={details.originCountry} onChange={handleInputChange} />
          <Select name="gds" label={t('hotel.gds')} value={details.gds} onChange={handleInputChange} options={gdsOptions} />
          
          <Input name="issuingStaff" label={t('hotel.issuingStaff')} value={details.issuingStaff} onChange={handleInputChange} />
          <Input name="bookingStaff" label={t('hotel.bookingStaff')} value={details.bookingStaff} onChange={handleInputChange} />
          <Input name="issueDate" label={t('hotel.issueDate')} type="date" value={details.issueDate} onChange={handleInputChange} />

          <Input name="supplierConfNo" label={t('hotel.supplierConfNo')} value={details.supplierConfNo} onChange={handleInputChange} />
          <Input name="hotelConfNo" label={t('hotel.hotelConfNo')} value={details.hotelConfNo} onChange={handleInputChange} />
          <Input name="roomType" label={t('hotel.roomType')} value={details.roomType} onChange={handleInputChange} />

          <Input name="checkInDate" label={t('hotel.checkInDate')} type="date" value={details.checkInDate} onChange={handleInputChange} />
          <Input name="checkOutDate" label={t('hotel.checkOutDate')} type="date" value={details.checkOutDate} onChange={handleInputChange} />
          <Select name="branch" label={t('hotel.branch')} value={details.branch} onChange={handleInputChange} options={branchOptions} />
          
          <Input name="ratePerNight" label={t('hotel.ratePerNight')} type="number" step="0.01" value={details.ratePerNight || 0} onChange={handleInputChange} />
          <Select name="mealsPlan" label={t('hotel.mealsPlan')} value={details.mealsPlan} onChange={handleInputChange} options={mealsPlanOptions} />
          <Input name="noOfAdults" label={t('hotel.noOfAdults')} type="number" min="0" value={details.noOfAdults || 0} onChange={handleInputChange} />
          
          <Input name="noOfChildren" label={t('hotel.noOfChildren')} type="number" min="0" value={details.noOfChildren || 0} onChange={handleInputChange} />
          <Input name="noOfRooms" label={t('hotel.noOfRooms')} type="number" min="0" value={details.noOfRooms || 0} onChange={handleInputChange} />
          <Input name="noOfNights" label={t('hotel.noOfNights')} type="number" min="0" value={details.noOfNights || 0} onChange={handleInputChange} />

          <Input name="guests" label={t('hotel.guests')} value={details.guests} onChange={handleInputChange} wrapperClassName="lg:col-span-3"/>
          <Input name="bookingDetails" label={t('hotel.bookingDetails')} value={details.bookingDetails} onChange={handleInputChange} isTextArea={true} rows={2} wrapperClassName="lg:col-span-3" />
          <Input name="additionalReference" label={t('hotel.additionalReference')} value={details.additionalReference} onChange={handleInputChange} isTextArea={true} rows={2} wrapperClassName="lg:col-span-3" />
          <Input name="couponRemark" label={t('hotel.couponRemark')} value={details.couponRemark} onChange={handleInputChange} isTextArea={true} rows={2} wrapperClassName="lg:col-span-2" />
          <Input name="customerEmpNo" label={t('hotel.customerEmpNo')} value={details.customerEmpNo} onChange={handleInputChange} />

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <label className="flex items-center space-x-2 rtl:space-x-reverse p-2 border rounded-md hover:bg-secondary-50">
              <input type="checkbox" name="termsAndConditions" checked={!!details.termsAndConditions} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"/>
              <span>{t('hotel.termsAndConditions')}</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse p-2 border rounded-md hover:bg-secondary-50">
              <input type="checkbox" name="pickUp" checked={!!details.pickUp} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"/>
              <span>{t('hotel.pickUp')}</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse p-2 border rounded-md hover:bg-secondary-50">
              <input type="checkbox" name="dropOff" checked={!!details.dropOff} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"/>
              <span>{t('hotel.dropOff')}</span>
            </label>
          </div>
        </div>
      </Card>
      {/* Submit and Cancel buttons are handled by the parent ManageHotelBookingPage */}
      {/* <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
        <Button type="button" variant="secondary" onClick={onCancel}>{t('common.cancel')}</Button>
        <Button type="submit" variant="primary">{t('hotel.saveHotelDetails')}</Button>
      </div> */}
    </form>
  );
};

export default HotelServiceForm;

import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { TourismService, Supplier } from '../types';
import { mockServices, mockSuppliers, generateId } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;

const initialServiceFormState: Omit<TourismService, 'id'> = {
  name: '',
  description: '',
  defaultCost: 0,
  defaultPrice: 0,
  supplierId: '',
};

const ServicesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const formatCurrency = (value: number) => value.toLocaleString(locale, { minimumFractionDigits:2, maximumFractionDigits:2 });

  const [services, setServices] = useState<TourismService[]>(mockServices);
  const [suppliers] = useState<Supplier[]>(mockSuppliers); // Suppliers list for dropdown
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<TourismService | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<TourismService, 'id'>>(initialServiceFormState);

  const supplierOptions = suppliers.map(s => ({ value: s.id, label: s.name }));

  const columns = React.useMemo(() => [
    { Header: 'common.name', accessor: 'name' as keyof TourismService },
    { Header: 'common.description', accessor: 'description' as keyof TourismService, Cell: (value: string) => value ? value.substring(0,40) + (value.length > 40 ? '...' : '') : '-' },
    { Header: 'services.defaultCostAed', accessor: 'defaultCost' as keyof TourismService, Cell: (value: number) => formatCurrency(value) },
    { Header: 'services.defaultPriceAed', accessor: 'defaultPrice' as keyof TourismService, Cell: (value: number) => formatCurrency(value) },
    { Header: 'common.suppliers', accessor: (row: TourismService) => suppliers.find(s => s.id === row.supplierId)?.name || t('common.na') },
  ], [suppliers, t, formatCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const val = name === 'defaultCost' || name === 'defaultPrice' ? parseFloat(value) : value;
    setServiceForm(prev => ({ ...prev, [name]: val }));
  };

  const openModalForCreate = () => {
    setEditingService(null);
    setServiceForm(initialServiceFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (service: TourismService) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description || '',
      defaultCost: service.defaultCost,
      defaultPrice: service.defaultPrice,
      supplierId: service.supplierId || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...editingService, ...serviceForm } : s));
    } else {
      setServices([...services, { id: generateId(), ...serviceForm }]);
    }
    closeModal();
  };

  const handleDeleteService = useCallback((serviceId: string) => {
    if (window.confirm(t('services.confirmDelete'))) {
      setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
    }
  }, [t]);

  const renderRowActions = useCallback((service: TourismService) => (
    <>
      <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); openModalForEdit(service);}} leftIcon={<IconPencil />}>
        {t('common.edit')}
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteService(service.id);}} leftIcon={<IconTrash />}>
        {t('common.delete')}
      </Button>
    </>
  ), [t, handleDeleteService, openModalForEdit]);

  return (
    <div>
      <PageHeader title={t('services.pageTitle')} subtitle={t('services.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />}>
          {t('services.addNew')}
        </Button>
      </PageHeader>

      <Table<TourismService> columns={columns} data={services} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingService ? t('services.editService') : t('services.addService')}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label={t('services.serviceName')} value={serviceForm.name} onChange={handleInputChange} required />
          <Input name="description" label={t('common.description')} value={serviceForm.description || ''} onChange={handleInputChange} />
          <div className="grid grid-cols-2 gap-4">
            <Input name="defaultCost" label={t('services.defaultCostAed')} type="number" step="0.01" value={serviceForm.defaultCost} onChange={handleInputChange} required />
            <Input name="defaultPrice" label={t('services.defaultPriceAed')} type="number" step="0.01" value={serviceForm.defaultPrice} onChange={handleInputChange} required />
          </div>
          <Select
            name="supplierId"
            label={t('services.supplierOptional')}
            value={serviceForm.supplierId}
            onChange={handleInputChange}
            options={[{ value: '', label: t('common.none') }, ...supplierOptions]}
            placeholder={t('services.select_supplier')}
          />
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingService ? t('common.save_changes') : t('services.addService')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServicesPage;

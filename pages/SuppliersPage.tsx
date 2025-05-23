
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { Supplier } from '../types';
import { mockSuppliers, generateId } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;

const initialSupplierFormState: Omit<Supplier, 'id'> = {
  name: '',
  serviceType: '',
  contactEmail: '',
  phone: '',
  vatNumber: '',
};

const SuppliersPage: React.FC = () => {
  const { t } = useLanguage();
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [supplierForm, setSupplierForm] = useState<Omit<Supplier, 'id'>>(initialSupplierFormState);

  const columns = React.useMemo(() => [
    { Header: 'common.name', accessor: 'name' as keyof Supplier },
    { Header: 'suppliers.serviceType', accessor: 'serviceType' as keyof Supplier },
    { Header: 'suppliers.contactEmail', accessor: 'contactEmail' as keyof Supplier },
    { Header: 'common.phone', accessor: 'phone' as keyof Supplier },
    { Header: 'common.vat_number', accessor: 'vatNumber' as keyof Supplier },
  ], [t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplierForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingSupplier(null);
    setSupplierForm(initialSupplierFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      serviceType: supplier.serviceType,
      contactEmail: supplier.contactEmail || '',
      phone: supplier.phone || '',
      vatNumber: supplier.vatNumber || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? { ...editingSupplier, ...supplierForm } : s));
    } else {
      setSuppliers([...suppliers, { id: generateId(), ...supplierForm }]);
    }
    closeModal();
  };
  
  const handleDeleteSupplier = useCallback((supplierId: string) => {
    if (window.confirm(t('suppliers.confirmDelete'))) {
      setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== supplierId));
    }
  }, [t]);

  const renderRowActions = useCallback((supplier: Supplier) => (
    <>
      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); openModalForEdit(supplier); }} leftIcon={<IconPencil />}>
        {t('common.edit')}
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteSupplier(supplier.id);}} leftIcon={<IconTrash />}>
        {t('common.delete')}
      </Button>
    </>
  ), [t, handleDeleteSupplier, openModalForEdit]);

  return (
    <div>
      <PageHeader title={t('suppliers.pageTitle')} subtitle={t('suppliers.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />}>
          {t('suppliers.addNew')}
        </Button>
      </PageHeader>

      <Table<Supplier> 
        columns={columns} 
        data={suppliers} 
        renderRowActions={renderRowActions}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSupplier ? t('suppliers.editSupplier') : t('suppliers.addSupplier')}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label={t('suppliers.supplierName')} value={supplierForm.name} onChange={handleInputChange} required />
          <Input name="serviceType" label={t('suppliers.serviceType')} value={supplierForm.serviceType} onChange={handleInputChange} required />
          <Input name="contactEmail" label={t('suppliers.contactEmail')} type="email" value={supplierForm.contactEmail} onChange={handleInputChange} />
          <Input name="phone" label={t('common.phone')} value={supplierForm.phone} onChange={handleInputChange} />
          <Input name="vatNumber" label={t('common.vat_number')} value={supplierForm.vatNumber} onChange={handleInputChange} />
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingSupplier ? t('common.save_changes') : t('suppliers.addSupplier')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SuppliersPage;

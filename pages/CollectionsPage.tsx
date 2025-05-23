
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { FinancialTransaction, TransactionType, Client, Booking } from '../types';
import { mockFinancialTransactions, mockClients, mockBookings, generateId } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;

const initialCollectionFormState: Omit<FinancialTransaction, 'id' | 'type' | 'partyType' | 'partyName'> = {
  date: new Date().toISOString().split('T')[0],
  partyId: '',
  amount: 0,
  description: '',
  relatedBookingId: '',
  paymentMethod: 'Bank Transfer',
  referenceNumber: '',
};

const paymentMethodKeys = ['bank_transfer', 'cash', 'cheque', 'credit_card', 'online_payment'];

interface SelectOption {
  value: string;
  label: string;
}

const CollectionsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const [collections, setCollections] = useState<FinancialTransaction[]>(mockFinancialTransactions.filter(tx => tx.type === TransactionType.COLLECTION));
  const [clients] = useState<Client[]>(mockClients);
  const [bookings] = useState<Booking[]>(mockBookings);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<FinancialTransaction | null>(null);
  const [collectionForm, setCollectionForm] = useState(initialCollectionFormState);
  
  const formatCurrency = (value: number) => value.toLocaleString(locale, { minimumFractionDigits:2, maximumFractionDigits:2 });
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);

  const clientOptions: SelectOption[] = clients.map((c): SelectOption => ({ value: c.id, label: c.name }));
  const bookingOptions: SelectOption[] = bookings.map((b): SelectOption => ({ value: b.id, label: `${b.fileNumber} - ${clients.find(c => c.id === b.clientId)?.name || t('common.unknown_client')}`}));
  const paymentMethodOptions: SelectOption[] = paymentMethodKeys.map(key => ({value: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), label: t(`payments.method.${key}` as any)}));


  const columns = React.useMemo(() => [
    { Header: 'common.date', accessor: 'date' as keyof FinancialTransaction, Cell: (value: string) => formatDate(value) },
    { Header: 'common.clients', accessor: 'partyName' as keyof FinancialTransaction },
    { Header: 'common.amount_aed', accessor: 'amount' as keyof FinancialTransaction, Cell: (value: number) => formatCurrency(value) },
    { Header: 'common.description', accessor: 'description' as keyof FinancialTransaction },
    { Header: 'payments.paymentMethod', accessor: 'paymentMethod' as keyof FinancialTransaction, Cell: (value: string) => t(`payments.method.${value.toLowerCase().replace(/ /g, '_')}` as any, {defaultValue: value})},
    { Header: 'payments.referenceNumberShort', accessor: 'referenceNumber' as keyof FinancialTransaction },
  ], [t, formatDate, formatCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const val = name === 'amount' ? parseFloat(value) : value;
    setCollectionForm(prev => ({ ...prev, [name]: val }));
  };

  const openModalForCreate = () => {
    setEditingCollection(null);
    setCollectionForm(initialCollectionFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (collection: FinancialTransaction) => {
    setEditingCollection(collection);
    setCollectionForm({
      date: collection.date.split('T')[0],
      partyId: collection.partyId,
      amount: collection.amount,
      description: collection.description,
      relatedBookingId: collection.relatedBookingId || '',
      paymentMethod: collection.paymentMethod || 'Bank Transfer',
      referenceNumber: collection.referenceNumber || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCollection(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientName = clients.find(c => c.id === collectionForm.partyId)?.name || t('common.unknown_client');
    const collectionData: FinancialTransaction = {
      id: editingCollection ? editingCollection.id : generateId(),
      type: TransactionType.COLLECTION,
      partyType: 'Client',
      partyName: clientName,
      ...collectionForm,
    };

    if (editingCollection) {
      setCollections(collections.map(c => c.id === editingCollection.id ? collectionData : c));
    } else {
      setCollections(prev => [collectionData, ...prev]);
    }
    closeModal();
  };

  const renderRowActions = useCallback((collection: FinancialTransaction) => (
    <Button variant="outline" size="sm" onClick={(e)=>{e.stopPropagation(); openModalForEdit(collection)}} leftIcon={<IconPencil />}>
      {t('common.edit')}
    </Button>
  ), [t, openModalForEdit]);

  return (
    <div>
      <PageHeader title={t('collections.pageTitle')} subtitle={t('collections.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />}>
          {t('collections.addNew')}
        </Button>
      </PageHeader>

      <Table<FinancialTransaction> columns={columns} data={collections} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingCollection ? t('collections.editCollection') : t('collections.recordCollection')} size="lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="date" label={t('collections.collectionDate')} type="date" value={collectionForm.date} onChange={handleInputChange} required />
            <Select name="partyId" label={t('common.clients')} value={collectionForm.partyId} onChange={handleInputChange} options={clientOptions} required placeholder={t('collections.select_client')} />
            <Input name="amount" label={t('common.amount_aed')} type="number" step="0.01" min="0" value={collectionForm.amount} onChange={handleInputChange} required />
            <Select name="paymentMethod" label={t('payments.paymentMethod')} value={collectionForm.paymentMethod} onChange={handleInputChange} options={paymentMethodOptions} required />
            <Input name="referenceNumber" label={t('payments.referenceNumber')} value={collectionForm.referenceNumber || ''} onChange={handleInputChange} wrapperClassName="md:col-span-2"/>
            <Select name="relatedBookingId" label={t('payments.relatedBookingOptional')} value={collectionForm.relatedBookingId} onChange={handleInputChange} options={[{value: '', label: t('common.none')}, ...bookingOptions]} placeholder={t('payments.select_booking')} wrapperClassName="md:col-span-2"/>
            <Input name="description" label={t('common.description')} value={collectionForm.description} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)} required wrapperClassName="md:col-span-2" />
          </div>
          
          <div className="mt-8 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingCollection ? t('common.save_changes') : t('collections.recordCollection')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CollectionsPage;

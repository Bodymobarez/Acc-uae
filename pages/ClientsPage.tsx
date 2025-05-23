
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { Client } from '../types';
import { mockClients, generateId } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;


const initialClientFormState: Omit<Client, 'id'> = {
  name: '',
  email: '',
  phone: '',
  address: '',
  vatNumber: '',
};

const ClientsPage: React.FC = () => {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientForm, setClientForm] = useState<Omit<Client, 'id'>>(initialClientFormState);

  const columns = React.useMemo(() => [
    { Header: 'common.name', accessor: 'name' as keyof Client },
    { Header: 'common.email', accessor: 'email' as keyof Client },
    { Header: 'common.phone', accessor: 'phone' as keyof Client },
    { Header: 'common.vat_number', accessor: 'vatNumber' as keyof Client },
    { Header: 'common.address', accessor: 'address' as keyof Client, Cell: (value: string) => value ? value.substring(0,30) + (value.length > 30 ? '...' : '') : '-' },
  ], []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingClient(null);
    setClientForm(initialClientFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (client: Client) => {
    setEditingClient(client);
    setClientForm({ 
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      vatNumber: client.vatNumber || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...editingClient, ...clientForm } : c));
    } else {
      setClients([...clients, { id: generateId(), ...clientForm }]);
    }
    closeModal();
  };

  const handleDeleteClient = useCallback((clientId: string) => {
    if (window.confirm(t('common.confirm_delete_prompt'))) {
      setClients(prevClients => prevClients.filter(client => client.id !== clientId));
    }
  }, [t]);

  const renderRowActions = useCallback((client: Client) => (
    <>
      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); openModalForEdit(client);}} leftIcon={<IconPencil />}>
        {t('common.edit')}
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteClient(client.id);}} leftIcon={<IconTrash />}>
        {t('common.delete')}
      </Button>
    </>
  ), [t, handleDeleteClient]);


  return (
    <div>
      <PageHeader title={t('clients.pageTitle')} subtitle={t('clients.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />}>
          {t('clients.addNew')}
        </Button>
      </PageHeader>

      <Table<Client> 
        columns={columns} 
        data={clients} 
        renderRowActions={renderRowActions}
        onRowClick={(client) => console.log('Client clicked:', client)} 
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingClient ? t('clients.editClient') : t('clients.addClient')}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label={t('clients.clientName')} value={clientForm.name} onChange={handleInputChange} required />
          <Input name="email" label={t('common.email')} type="email" value={clientForm.email} onChange={handleInputChange} />
          <Input name="phone" label={t('common.phone')} value={clientForm.phone} onChange={handleInputChange} />
          <Input name="vatNumber" label={t('common.vat_number')} value={clientForm.vatNumber} onChange={handleInputChange} />
          <Input name="address" label={t('common.address')} value={clientForm.address} onChange={handleInputChange} />
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingClient ? t('common.save_changes') : t('clients.addClient')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClientsPage;
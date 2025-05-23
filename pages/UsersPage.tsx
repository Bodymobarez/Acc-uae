
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { User } from '../types';
import { mockUsers, generateId } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
// IconTrash could be added if delete is implemented

const userRoles: User['role'][] = ['Admin', 'Accountant', 'Sales Agent', 'Manager'];


const initialUserFormState: Omit<User, 'id'> = {
  username: '',
  fullName: '',
  email: '',
  role: 'Sales Agent',
  isActive: true,
};

const UsersPage: React.FC = () => {
  const { t } = useLanguage(); // Added useLanguage for potential translations
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState<Omit<User, 'id'>>(initialUserFormState);
  
  // Role options now use translation keys if you add them (e.g. "users.roleAdmin") or direct strings
  const roleOptions = userRoles.map(role => ({ value: role, label: t(`users.role${role.replace(/\s+/g, '')}` as any, {defaultValue: role}) }));


  const columns = React.useMemo(() => [
    { Header: 'common.username', accessor: 'username' as keyof User },
    { Header: 'common.full_name', accessor: 'fullName' as keyof User },
    { Header: 'common.email', accessor: 'email' as keyof User },
    { Header: 'common.role', accessor: 'role' as keyof User, Cell: (value: User['role']) => t(`users.role${value.replace(/\s+/g, '')}` as any, {defaultValue: value})},
    { Header: 'common.status', accessor: 'isActive' as keyof User, Cell: (value: boolean) => 
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {value ? t('common.active') : t('common.inactive')}
        </span>
    },
  ], [t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    let value: string | boolean;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
        value = target.checked;
    } else {
        value = target.value;
    }
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingUser(null);
    setUserForm(initialUserFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (user: User) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password handling is omitted for this frontend example.
    // In a real app, never store/handle passwords directly on the client.
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...userForm } : u));
    } else {
      setUsers([...users, { id: generateId(), ...userForm }]);
    }
    closeModal();
  };

  const renderRowActions = useCallback((user: User) => (
    <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); openModalForEdit(user);}} leftIcon={<IconPencil />}>
      {t('common.edit')}
    </Button>
    // Delete user functionality can be added here with proper confirmation and checks
  ), [t, openModalForEdit]);

  return (
    <div>
      <PageHeader title={t('users.pageTitle')} subtitle={t('users.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />}>
          {t('users.addNew')}
        </Button>
      </PageHeader>

      <Table<User> columns={columns} data={users} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? t('users.editUser') : t('users.addUser')}>
        <form onSubmit={handleSubmit}>
          <Input name="username" label={t('common.username')} value={userForm.username} onChange={handleInputChange} required />
          <Input name="fullName" label={t('common.full_name')} value={userForm.fullName} onChange={handleInputChange} required />
          <Input name="email" label={t('common.email')} type="email" value={userForm.email} onChange={handleInputChange} required />
          <Select name="role" label={t('common.role')} value={userForm.role} onChange={handleInputChange} options={roleOptions} required />
          
          {/* Password field would be here in a real app - for creation only, or a separate "reset password" flow */}
          {/* <Input name="password" label="Password" type="password" ... /> */}

          <div className="mt-4">
            <label className="flex items-center">
                <input 
                    type="checkbox" 
                    name="isActive"
                    checked={userForm.isActive}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"
                />
                <span className="ms-2 text-sm text-secondary-700">{t('users.activeUser')}</span>
            </label>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingUser ? t('common.save_changes') : t('users.addUser')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersPage;
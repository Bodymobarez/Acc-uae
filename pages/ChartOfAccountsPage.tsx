
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { Account, AccountType } from '../types';
import { mockAccounts, generateId } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;

const initialAccountFormState: Omit<Account, 'id' | 'balance'> = {
  code: '',
  name: '',
  type: AccountType.ASSET,
  isControlAccount: false,
  subsidiaryLedger: '',
};

const ChartOfAccountsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const accountTypeOptions = Object.values(AccountType).map(type => ({ value: type, label: type })); // AccountType enum values are fine for now

  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [accountForm, setAccountForm] = useState<Omit<Account, 'id' | 'balance'>>(initialAccountFormState);

  const formatCurrency = (value: number) => value.toLocaleString(locale, { minimumFractionDigits:2, maximumFractionDigits:2 });


  const columns = React.useMemo(() => [
    { Header: 'chartOfAccounts.accountCode', accessor: 'code' as keyof Account, width: '10%' },
    { Header: 'chartOfAccounts.accountName', accessor: 'name' as keyof Account, width: '40%' }, // Account names from mockData are not translated yet
    { Header: 'chartOfAccounts.accountType', accessor: 'type' as keyof Account, width: '15%' },
    { Header: 'chartOfAccounts.controlAccount', accessor: 'isControlAccount' as keyof Account, width: '15%', Cell: (value: boolean) => value ? t('common.active') : t('common.inactive') }, // "Yes/No" might be better for "Is Control Account"
    { Header: 'chartOfAccounts.balanceAed', accessor: 'balance' as keyof Account, width: '20%', Cell: (value: number) => formatCurrency(value) },
  ], [t, formatCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;

    let value: string | boolean;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
        value = target.checked;
    } else {
        value = target.value;
    }
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingAccount(null);
    setAccountForm(initialAccountFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (account: Account) => {
    setEditingAccount(account);
    setAccountForm({
      code: account.code,
      name: account.name,
      type: account.type,
      isControlAccount: account.isControlAccount || false,
      subsidiaryLedger: account.subsidiaryLedger || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAccount) {
      setAccounts(accounts.map(acc => acc.id === editingAccount.id ? { ...editingAccount, ...accountForm } : acc));
    } else {
      setAccounts([...accounts, { id: generateId(), ...accountForm, balance: 0 }]);
    }
    closeModal();
  };
  
  const renderRowActions = useCallback((account: Account) => (
    <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); openModalForEdit(account);}} leftIcon={<IconPencil />}>
      {t('common.edit')}
    </Button>
  ), [t, openModalForEdit]);


  return (
    <div>
      <PageHeader title={t('chartOfAccounts.pageTitle')} subtitle={t('chartOfAccounts.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />}>
          {t('chartOfAccounts.addNew')}
        </Button>
      </PageHeader>

      <Table<Account> columns={columns} data={accounts} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingAccount ? t('chartOfAccounts.editAccount') : t('chartOfAccounts.addAccount')}>
        <form onSubmit={handleSubmit}>
          <Input name="code" label={t('chartOfAccounts.accountCode')} value={accountForm.code} onChange={handleInputChange} required />
          <Input name="name" label={t('chartOfAccounts.accountName')} value={accountForm.name} onChange={handleInputChange} required />
          <Select name="type" label={t('chartOfAccounts.accountType')} value={accountForm.type} onChange={handleInputChange} options={accountTypeOptions} required />
          <div className="mt-4">
            <label className="flex items-center">
                <input 
                    type="checkbox" 
                    name="isControlAccount"
                    checked={accountForm.isControlAccount}
                    onChange={handleInputChange}
                    className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"
                />
                <span className="ms-2 text-sm text-secondary-700">{t('chartOfAccounts.isControlAccount')}</span>
            </label>
          </div>
          {accountForm.isControlAccount && (
             <Input name="subsidiaryLedger" label={t('chartOfAccounts.subsidiaryLedgerName')} value={accountForm.subsidiaryLedger || ''} onChange={handleInputChange} wrapperClassName="mt-2"/>
          )}
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingAccount ? t('common.save_changes') : t('chartOfAccounts.addAccount')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ChartOfAccountsPage;
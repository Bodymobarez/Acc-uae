
import React, { useState, useCallback, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { PenaltyType } from '../../types';
import { mockPenaltyTypes, generateId } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;

const initialPenaltyTypeFormState: Omit<PenaltyType, 'id'> = {
  name: '',
  description: '',
  deductionAmount: undefined,
  deductionDays: undefined,
};

const PenaltyTypesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const formatCurrency = (value?: number) => value !== undefined ? value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits:2, maximumFractionDigits:2 }).replace('AED', t('common.amount_aed').split(' ')[1]) : '-';

  const [penaltyTypes, setPenaltyTypes] = useState<PenaltyType[]>(mockPenaltyTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPenaltyType, setEditingPenaltyType] = useState<PenaltyType | null>(null);
  const [penaltyTypeForm, setPenaltyTypeForm] = useState<Omit<PenaltyType, 'id'>>(initialPenaltyTypeFormState);

  const columns = useMemo(() => [
    { Header: 'penaltyTypes.penaltyName', accessor: 'name' as keyof PenaltyType },
    { Header: 'common.description', accessor: 'description' as keyof PenaltyType, Cell: (value?:string) => value || '-' },
    { Header: 'penaltyTypes.deductionAmountAed', accessor: 'deductionAmount' as keyof PenaltyType, Cell: (value?: number) => formatCurrency(value) },
    { Header: 'penaltyTypes.deductionDays', accessor: 'deductionDays' as keyof PenaltyType, Cell: (value?: number) => value !== undefined ? value : '-' },
  ], [t, formatCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPenaltyTypeForm(prev => ({ 
      ...prev, 
      [name]: (name === 'deductionAmount' || name === 'deductionDays') ? (value ? parseFloat(value) : undefined) : value 
    }));
  };

  const openModalForCreate = () => {
    setEditingPenaltyType(null);
    setPenaltyTypeForm(initialPenaltyTypeFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (penaltyType: PenaltyType) => {
    setEditingPenaltyType(penaltyType);
    setPenaltyTypeForm({ 
      name: penaltyType.name, 
      description: penaltyType.description || '',
      deductionAmount: penaltyType.deductionAmount,
      deductionDays: penaltyType.deductionDays
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPenaltyType(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPenaltyType) {
      setPenaltyTypes(penaltyTypes.map(pt => pt.id === editingPenaltyType.id ? { ...editingPenaltyType, ...penaltyTypeForm } : pt));
    } else {
      setPenaltyTypes([...penaltyTypes, { id: generateId(), ...penaltyTypeForm }]);
    }
    closeModal();
  };

  const handleDeletePenaltyType = useCallback((id: string) => {
    if (window.confirm(t('penaltyTypes.confirmDelete'))) {
      setPenaltyTypes(prev => prev.filter(pt => pt.id !== id));
    }
  }, [t]);

  const renderRowActions = useCallback((penaltyType: PenaltyType) => (
    <>
      <Button variant="outline" size="sm" onClick={() => openModalForEdit(penaltyType)} leftIcon={<IconPencil />} className="me-1"/>
      <Button variant="danger" size="sm" onClick={() => handleDeletePenaltyType(penaltyType.id)} leftIcon={<IconTrash />}/>
    </>
  ), [t, handleDeletePenaltyType]);

  return (
    <div>
      <PageHeader title={t('penaltyTypes.pageTitle')} subtitle={t('penaltyTypes.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />} size="lg">
          {t('penaltyTypes.addNew')}
        </Button>
      </PageHeader>

      <Table<PenaltyType> columns={columns} data={penaltyTypes} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingPenaltyType ? t('penaltyTypes.editPenaltyType') : t('penaltyTypes.addPenaltyType')}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label={t('penaltyTypes.penaltyName')} value={penaltyTypeForm.name} onChange={handleInputChange} required />
          <Input name="description" label={t('common.description')} value={penaltyTypeForm.description || ''} onChange={handleInputChange} isTextArea rows={2}/>
          <Input name="deductionAmount" label={t('penaltyTypes.deductionAmountAed')} type="number" step="0.01" min="0" value={penaltyTypeForm.deductionAmount || ''} onChange={handleInputChange} />
          <Input name="deductionDays" label={t('penaltyTypes.deductionDays')} type="number" step="0.1" min="0" value={penaltyTypeForm.deductionDays || ''} onChange={handleInputChange} />
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingPenaltyType ? t('common.save_changes') : t('common.save')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PenaltyTypesPage;

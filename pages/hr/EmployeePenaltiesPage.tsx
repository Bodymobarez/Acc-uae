
import React, { useState, useCallback, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { EmployeePenalty, Employee, PenaltyType } from '../../types';
import { mockEmployeePenalties, mockEmployees, mockPenaltyTypes, generateId } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;

const initialEmployeePenaltyFormState: Omit<EmployeePenalty, 'id'> = {
  employeeId: '',
  penaltyTypeId: '',
  date: new Date().toISOString().split('T')[0],
  reason: '',
  amountDeducted: undefined,
  daysDeducted: undefined,
  notes: '',
};

const EmployeePenaltiesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const formatCurrency = (value?: number) => value !== undefined ? value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits:2, maximumFractionDigits:2 }).replace('AED', t('common.amount_aed').split(' ')[1]) : '-';
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);

  const [employeePenalties, setEmployeePenalties] = useState<EmployeePenalty[]>(mockEmployeePenalties);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [penaltyTypes] = useState<PenaltyType[]>(mockPenaltyTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPenalty, setEditingPenalty] = useState<EmployeePenalty | null>(null);
  const [penaltyForm, setPenaltyForm] = useState<Omit<EmployeePenalty, 'id'>>(initialEmployeePenaltyFormState);

  const employeeOptions = employees.map(emp => ({ value: emp.id, label: emp.name }));
  const penaltyTypeOptions = penaltyTypes.map(pt => ({ value: pt.id, label: pt.name }));

  const columns = useMemo(() => [
    { Header: 'common.employee', accessor: (row: EmployeePenalty) => employees.find(e => e.id === row.employeeId)?.name || t('common.na') },
    { Header: 'employeePenalties.penaltyType', accessor: (row: EmployeePenalty) => penaltyTypes.find(pt => pt.id === row.penaltyTypeId)?.name || t('common.na') },
    { Header: 'employeePenalties.penaltyDate', accessor: 'date' as keyof EmployeePenalty, Cell: (value: string) => formatDate(value) },
    { Header: 'common.reason', accessor: 'reason' as keyof EmployeePenalty, Cell: (value:string) => value.substring(0,30) + (value.length > 30 ? '...' : '') },
    { Header: 'employeePenalties.amountDeducted', accessor: 'amountDeducted' as keyof EmployeePenalty, Cell: (value?: number) => formatCurrency(value) },
    { Header: 'employeePenalties.daysDeducted', accessor: 'daysDeducted' as keyof EmployeePenalty, Cell: (value?: number) => value !== undefined ? value : '-' },
  ], [t, employees, penaltyTypes, formatDate, formatCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPenaltyForm(prev => ({ 
      ...prev, 
      [name]: (name === 'amountDeducted' || name === 'daysDeducted') ? (value ? parseFloat(value) : undefined) : value 
    }));
  };

  const openModalForCreate = () => {
    setEditingPenalty(null);
    setPenaltyForm(initialEmployeePenaltyFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (penalty: EmployeePenalty) => {
    setEditingPenalty(penalty);
    setPenaltyForm({
      employeeId: penalty.employeeId,
      penaltyTypeId: penalty.penaltyTypeId,
      date: penalty.date,
      reason: penalty.reason,
      amountDeducted: penalty.amountDeducted,
      daysDeducted: penalty.daysDeducted,
      notes: penalty.notes || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPenalty(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPenalty) {
      setEmployeePenalties(employeePenalties.map(p => p.id === editingPenalty.id ? { ...editingPenalty, ...penaltyForm } : p));
    } else {
      setEmployeePenalties([...employeePenalties, { id: generateId(), ...penaltyForm }]);
    }
    closeModal();
  };

  const handleDeletePenalty = useCallback((id: string) => {
    if (window.confirm(t('employeePenalties.confirmDelete'))) {
      setEmployeePenalties(prev => prev.filter(p => p.id !== id));
    }
  }, [t]);

  const renderRowActions = useCallback((penalty: EmployeePenalty) => (
    <>
      <Button variant="outline" size="sm" onClick={() => openModalForEdit(penalty)} leftIcon={<IconPencil />} className="me-1"/>
      <Button variant="danger" size="sm" onClick={() => handleDeletePenalty(penalty.id)} leftIcon={<IconTrash />}/>
    </>
  ), [t, handleDeletePenalty]);

  return (
    <div>
      <PageHeader title={t('employeePenalties.pageTitle')} subtitle={t('employeePenalties.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />} size="lg">
          {t('employeePenalties.addNew')}
        </Button>
      </PageHeader>

      <Table<EmployeePenalty> columns={columns} data={employeePenalties} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingPenalty ? t('employeePenalties.editPenalty') : t('employeePenalties.addPenalty')} size="lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select name="employeeId" label={t('common.employee')} value={penaltyForm.employeeId} onChange={handleInputChange} options={employeeOptions} placeholder={t('common.select_employee_placeholder')} required />
            <Select name="penaltyTypeId" label={t('employeePenalties.penaltyType')} value={penaltyForm.penaltyTypeId} onChange={handleInputChange} options={penaltyTypeOptions} placeholder={t('employeePenalties.select_penalty_type')} required />
            <Input name="date" label={t('employeePenalties.penaltyDate')} type="date" value={penaltyForm.date} onChange={handleInputChange} required />
            <Input name="amountDeducted" label={t('employeePenalties.amountDeducted')} type="number" step="0.01" min="0" value={penaltyForm.amountDeducted || ''} onChange={handleInputChange} />
            <Input name="daysDeducted" label={t('employeePenalties.daysDeducted')} type="number" step="0.1" min="0" value={penaltyForm.daysDeducted || ''} onChange={handleInputChange} />
          </div>
          <Input name="reason" label={t('common.reason')} value={penaltyForm.reason} onChange={handleInputChange} isTextArea rows={3} wrapperClassName="mt-4" required/>
          <Input name="notes" label={t('common.notes')} value={penaltyForm.notes || ''} onChange={handleInputChange} isTextArea rows={2} wrapperClassName="mt-4"/>
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingPenalty ? t('common.save_changes') : t('common.save')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeePenaltiesPage;

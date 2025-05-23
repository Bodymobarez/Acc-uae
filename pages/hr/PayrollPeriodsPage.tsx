
import React, { useState, useCallback, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { PayrollPeriod, PayrollPeriodStatus, Employee, Payslip, PayslipStatus, PayslipItemType } from '../../types';
import { mockPayrollPeriods, mockEmployees, generateId, mockPayslips } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconGenerate = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>;


const initialPeriodFormState: Omit<PayrollPeriod, 'id'> = {
  name: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0], // End of current month
  status: PayrollPeriodStatus.OPEN,
};

const PayrollPeriodsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>(mockPayrollPeriods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<PayrollPeriod | null>(null);
  const [periodForm, setPeriodForm] = useState<Omit<PayrollPeriod, 'id'>>(initialPeriodFormState);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale, {year: 'numeric', month: 'long', day: 'numeric'});
  const statusOptions = Object.values(PayrollPeriodStatus).map(status => ({ value: status, label: t(`payrollPeriods.status.${status}` as any, {defaultValue: status})}));

  const columns = useMemo(() => [
    { Header: 'payrollPeriods.periodName', accessor: 'name' as keyof PayrollPeriod },
    { Header: 'common.startDate', accessor: 'startDate' as keyof PayrollPeriod, Cell: (value: string) => formatDate(value) },
    { Header: 'common.endDate', accessor: 'endDate' as keyof PayrollPeriod, Cell: (value: string) => formatDate(value) },
    { Header: 'payrollPeriods.status', accessor: 'status' as keyof PayrollPeriod, Cell: (value: PayrollPeriodStatus) => t(`payrollPeriods.status.${value}` as any, {defaultValue: value}) },
  ], [t, formatDate]);

  // FIX: Changed handleInputChange to accept ChangeEvent from HTMLInputElement, HTMLSelectElement, or HTMLTextAreaElement
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPeriodForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingPeriod(null);
    const currentYear = new Date().getFullYear();
    const currentMonthName = new Date().toLocaleString(locale, { month: 'long' });
    const defaultPeriodName = `${currentMonthName} ${currentYear} Payroll`;
    setPeriodForm({...initialPeriodFormState, name: defaultPeriodName });
    setIsModalOpen(true);
  };

  const openModalForEdit = (period: PayrollPeriod) => {
    setEditingPeriod(period);
    setPeriodForm({ name: period.name, startDate: period.startDate, endDate: period.endDate, status: period.status });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPeriod(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPeriod) {
      setPayrollPeriods(payrollPeriods.map(p => p.id === editingPeriod.id ? { ...editingPeriod, ...periodForm } : p));
    } else {
      setPayrollPeriods([...payrollPeriods, { id: generateId(), ...periodForm }]);
    }
    closeModal();
  };

  const handleGeneratePayslips = (periodId: string) => {
    const period = payrollPeriods.find(p => p.id === periodId);
    if (!period) {
      alert(t('payrollPeriods.payslipsGenerateFail'));
      return;
    }
    if(mockEmployees.length === 0){
        alert(t('payrollPeriods.noEmployees'));
        return;
    }

    const newPayslips: Payslip[] = mockEmployees.map(emp => {
      const basicSalary = emp.basicSalary || 0;
      return {
        id: generateId(),
        payrollPeriodId: period.id,
        employeeId: emp.id,
        basicSalaryAtGeneration: basicSalary,
        additions: [],
        deductions: [],
        grossSalary: basicSalary, // Initially gross = basic
        // FIX: Initialize totalAdditions to 0
        totalAdditions: 0,
        totalDeductions: 0,
        netSalary: basicSalary, // Initially net = gross
        status: PayslipStatus.DRAFT,
      };
    });

    // In a real app, this would likely be an API call.
    // For now, we'll update the global mockPayslips array.
    // A better approach for local state would be to lift payslips state up or use context.
    mockPayslips.push(...newPayslips.filter(np => !mockPayslips.some(op => op.employeeId === np.employeeId && op.payrollPeriodId === np.payrollPeriodId)));
    
    alert(t('payrollPeriods.payslipsGeneratedSuccess', { count: newPayslips.length }));
    // Optionally, update period status to Processing
    setPayrollPeriods(prev => prev.map(p => p.id === periodId ? {...p, status: PayrollPeriodStatus.PROCESSING} : p));
  };
  
  const renderRowActions = useCallback((period: PayrollPeriod) => (
    <div className="space-x-1 rtl:space-x-reverse">
      <Button variant="outline" size="sm" onClick={() => openModalForEdit(period)} leftIcon={<IconPencil />}/>
      {(period.status === PayrollPeriodStatus.OPEN || period.status === PayrollPeriodStatus.PROCESSING) && (
         <Button variant="success" size="sm" onClick={() => handleGeneratePayslips(period.id)} leftIcon={<IconGenerate />}>
            {t('payrollPeriods.generatePayslips')}
        </Button>
      )}
    </div>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [t, payrollPeriods]); // Added payrollPeriods to deps

  return (
    <div>
      <PageHeader title={t('hr.payrollPeriods')} subtitle={t('payrollPeriods.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />} size="lg">
          {t('payrollPeriods.addNew')}
        </Button>
      </PageHeader>

      <Table<PayrollPeriod> columns={columns} data={payrollPeriods} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingPeriod ? t('payrollPeriods.editPeriod') : t('payrollPeriods.addPeriod')}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label={t('payrollPeriods.periodName')} value={periodForm.name} onChange={handleInputChange} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FIX: Corrected i18n keys for labels */}
            <Input name="startDate" label={t('common.startDate')} type="date" value={periodForm.startDate} onChange={handleInputChange} required />
            <Input name="endDate" label={t('common.endDate')} type="date" value={periodForm.endDate} onChange={handleInputChange} required />
          </div>
          {/* Ensure this Select uses the correctly typed handleInputChange if it was an issue, though it's usually fine */}
          <Select name="status" label={t('payrollPeriods.status')} value={periodForm.status} onChange={handleInputChange} options={statusOptions} required />
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingPeriod ? t('common.save_changes') : t('common.save')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PayrollPeriodsPage;

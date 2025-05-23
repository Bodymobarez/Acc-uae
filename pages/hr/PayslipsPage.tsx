
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';
import { Payslip, PayslipStatus, Employee, PayrollPeriod, PayslipItem, PayslipItemType } from '../../types';
import { mockPayslips, mockEmployees, mockPayrollPeriods, generateId } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /><path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893 2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;

// FIX: Adjust PayslipFormState to also Omit totalAdditions as it's calculated
type PayslipFormState = Omit<Payslip, 'id' | 'grossSalary' | 'totalAdditions' | 'totalDeductions' | 'netSalary'>;

const initialPayslipItem: Omit<PayslipItem, 'id'> = { description: '', amount: 0, type: PayslipItemType.ADDITION };

const PayslipsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const [payslips, setPayslips] = useState<Payslip[]>(mockPayslips); // Assume mockPayslips is populated elsewhere
  const [employees] = useState<Employee[]>(mockEmployees);
  const [payrollPeriods] = useState<PayrollPeriod[]>(mockPayrollPeriods);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayslip, setEditingPayslip] = useState<Payslip | null>(null);
  const [payslipForm, setPayslipForm] = useState<PayslipFormState | null>(null);

  const [newItem, setNewItem] = useState<Omit<PayslipItem, 'id'>>(initialPayslipItem);

  // Filters
  const [filterPeriodId, setFilterPeriodId] = useState<string>('');
  const [filterEmployeeId, setFilterEmployeeId] = useState<string>('');

  const formatCurrency = (value: number) => value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits:2, maximumFractionDigits:2 }).replace('AED', t('common.amount_aed').split(' ')[1]);
  
  const employeeOptions = [{value: '', label: t('payslips.allEmployees')}, ...employees.map(emp => ({ value: emp.id, label: emp.name }))];
  const periodOptions = [{value: '', label: t('payslips.allPeriods')}, ...payrollPeriods.map(p => ({ value: p.id, label: p.name }))];
  const statusOptions = Object.values(PayslipStatus).map(status => ({ value: status, label: t(`payslips.status.${status}` as any, {defaultValue: status})}));
  const itemTypeOptions = Object.values(PayslipItemType).map(type => ({ value: type, label: t(`payslips.itemType.${type}` as any, {defaultValue: type})}));


  const filteredPayslips = useMemo(() => {
    return payslips.filter(p => 
        (filterPeriodId ? p.payrollPeriodId === filterPeriodId : true) &&
        (filterEmployeeId ? p.employeeId === filterEmployeeId : true)
    );
  }, [payslips, filterPeriodId, filterEmployeeId]);


  const columns = useMemo(() => [
    { Header: 'common.employee', accessor: (row: Payslip) => employees.find(e => e.id === row.employeeId)?.name || t('common.na') },
    { Header: 'payrollPeriods.periodName', accessor: (row: Payslip) => payrollPeriods.find(p => p.id === row.payrollPeriodId)?.name || t('common.na') },
    { Header: 'hr.basicSalaryAed', accessor: 'basicSalaryAtGeneration' as keyof Payslip, Cell: (value: number) => formatCurrency(value) },
    { Header: 'payslips.grossSalary', accessor: 'grossSalary' as keyof Payslip, Cell: (value: number) => formatCurrency(value) },
    { Header: 'payslips.totalDeductions', accessor: 'totalDeductions' as keyof Payslip, Cell: (value: number) => formatCurrency(value) },
    { Header: 'payslips.netSalary', accessor: 'netSalary' as keyof Payslip, Cell: (value: number) => formatCurrency(value) },
    { Header: 'payslips.status', accessor: 'status' as keyof Payslip, Cell: (value: PayslipStatus) => t(`payslips.status.${value}` as any, {defaultValue: value}) },
  ], [t, employees, payrollPeriods, formatCurrency]);

  const calculateSalaries = (basic: number, additions: PayslipItem[], deductions: PayslipItem[]) => {
    const totalAdditions = additions.reduce((sum, item) => sum + item.amount, 0);
    const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
    const grossSalary = basic + totalAdditions;
    const netSalary = grossSalary - totalDeductions;
    return { grossSalary, totalAdditions, totalDeductions, netSalary };
  };

  useEffect(() => {
    if (payslipForm) {
      const { grossSalary, totalAdditions, totalDeductions, netSalary } = calculateSalaries(
        payslipForm.basicSalaryAtGeneration,
        payslipForm.additions,
        payslipForm.deductions
      );
      // This effect is for display, actual saving happens on submit
    }
  }, [payslipForm]);


  const openModalForEdit = (payslip: Payslip) => {
    setEditingPayslip(payslip);
    setPayslipForm({ ...payslip }); // Shallow copy is fine for form state, items are managed separately
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPayslip(null);
    setPayslipForm(null);
    setNewItem(initialPayslipItem);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!payslipForm) return;
    const { name, value } = e.target;
    setPayslipForm(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleAddItem = () => {
    if (!payslipForm || !newItem.description || newItem.amount <= 0) return;
    const itemWithId = { ...newItem, id: generateId() };
    if (newItem.type === PayslipItemType.ADDITION) {
      setPayslipForm(prev => prev ? { ...prev, additions: [...prev.additions, itemWithId] } : null);
    } else {
      setPayslipForm(prev => prev ? { ...prev, deductions: [...prev.deductions, itemWithId] } : null);
    }
    setNewItem(initialPayslipItem); // Reset new item form
  };

  const handleRemoveItem = (itemId: string, type: PayslipItemType) => {
    if (!payslipForm) return;
    if (type === PayslipItemType.ADDITION) {
      setPayslipForm(prev => prev ? { ...prev, additions: prev.additions.filter(item => item.id !== itemId) } : null);
    } else {
      setPayslipForm(prev => prev ? { ...prev, deductions: prev.deductions.filter(item => item.id !== itemId) } : null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payslipForm || !editingPayslip) return;

    const { grossSalary, totalAdditions, totalDeductions, netSalary } = calculateSalaries(
      payslipForm.basicSalaryAtGeneration,
      payslipForm.additions,
      payslipForm.deductions
    );

    const updatedPayslip: Payslip = {
      ...payslipForm,
      id: editingPayslip.id, // ensure id is from editingPayslip
      grossSalary,
      // FIX: Include totalAdditions in the updated Payslip object
      totalAdditions,
      totalDeductions,
      netSalary,
    };
    
    setPayslips(payslips.map(p => p.id === editingPayslip.id ? updatedPayslip : p));
    // Also update in mockPayslips for persistence in this demo
    const mockIndex = mockPayslips.findIndex(p => p.id === editingPayslip.id);
    if (mockIndex !== -1) mockPayslips[mockIndex] = updatedPayslip;

    closeModal();
  };
  
  const currentSalaries = payslipForm ? calculateSalaries(payslipForm.basicSalaryAtGeneration, payslipForm.additions, payslipForm.deductions) : null;


  const renderRowActions = useCallback((payslip: Payslip) => (
    <Button variant="outline" size="sm" onClick={() => openModalForEdit(payslip)} leftIcon={<IconEye />}>
      {t(payslip.status === PayslipStatus.DRAFT || payslip.status === PayslipStatus.CALCULATED ? 'common.edit' : 'common.view')}
    </Button>
  ), [t]);

  return (
    <div>
      <PageHeader title={t('hr.payslips')} subtitle={t('payslips.pageSubtitle')}>
        {/* Add New Payslip might be complex, usually generated from periods */}
      </PageHeader>
      <Card className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label={t('payslips.filterByPeriod')} value={filterPeriodId} onChange={e => setFilterPeriodId(e.target.value)} options={periodOptions} />
            <Select label={t('payslips.filterByEmployee')} value={filterEmployeeId} onChange={e => setFilterEmployeeId(e.target.value)} options={employeeOptions} />
          </div>
      </Card>

      <Table<Payslip> columns={columns} data={filteredPayslips} renderRowActions={renderRowActions} emptyStateMessage={t('payslips.noPayslipsGenerated')} />

      {payslipForm && editingPayslip && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={t('payslips.payslipFor', {employeeName: employees.find(e=>e.id === editingPayslip.employeeId)?.name || '', periodName: payrollPeriods.find(p=>p.id === editingPayslip.payrollPeriodId)?.name || ''})} size="2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-secondary-50 rounded">
              <div><span className="font-medium">{t('hr.basicSalaryAed')}:</span> {formatCurrency(payslipForm.basicSalaryAtGeneration)}</div>
              <div><span className="font-medium">{t('payslips.grossSalary')}:</span> {formatCurrency(currentSalaries?.grossSalary || 0)}</div>
              <div><span className="font-medium">{t('payslips.totalAdditions')}:</span> {formatCurrency(currentSalaries?.totalAdditions || 0)}</div>
              <div><span className="font-medium">{t('payslips.totalDeductions')}:</span> {formatCurrency(currentSalaries?.totalDeductions || 0)}</div>
              <div className="text-lg font-bold"><span className="font-medium">{t('payslips.netSalary')}:</span> {formatCurrency(currentSalaries?.netSalary || 0)}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title={t('payslips.additions')}>
                    {payslipForm.additions.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b py-1">
                           <span>{item.description}</span>
                           <div className="flex items-center">
                             <span className="me-2">{formatCurrency(item.amount)}</span>
                             {(payslipForm.status === PayslipStatus.DRAFT || payslipForm.status === PayslipStatus.CALCULATED) && 
                                <Button type="button" variant="danger" size="sm" onClick={()=>handleRemoveItem(item.id, PayslipItemType.ADDITION)}><IconTrash/></Button>}
                           </div>
                        </div>
                    ))}
                    {(payslipForm.status === PayslipStatus.DRAFT || payslipForm.status === PayslipStatus.CALCULATED) && 
                    <div className="mt-2 flex gap-2 items-end">
                        <Input wrapperClassName="flex-grow mb-0" label={t('payslips.itemDescription')} value={newItem.type === PayslipItemType.ADDITION ? newItem.description : ''} onChange={e => setNewItem({...newItem, description: e.target.value, type: PayslipItemType.ADDITION})} />
                        <Input wrapperClassName="w-28 mb-0" label={t('payslips.itemAmount')} type="number" value={newItem.type === PayslipItemType.ADDITION ? newItem.amount : 0} onChange={e => setNewItem({...newItem, amount: parseFloat(e.target.value) || 0, type: PayslipItemType.ADDITION})} />
                        <Button type="button" onClick={handleAddItem} size="sm"><IconPlus/></Button>
                    </div>}
                </Card>
                <Card title={t('payslips.deductions')}>
                    {payslipForm.deductions.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b py-1">
                           <span>{item.description}</span>
                            <div className="flex items-center">
                                <span className="me-2">{formatCurrency(item.amount)}</span>
                                {(payslipForm.status === PayslipStatus.DRAFT || payslipForm.status === PayslipStatus.CALCULATED) && 
                                    <Button type="button" variant="danger" size="sm" onClick={()=>handleRemoveItem(item.id, PayslipItemType.DEDUCTION)}><IconTrash/></Button>}
                            </div>
                        </div>
                    ))}
                     {(payslipForm.status === PayslipStatus.DRAFT || payslipForm.status === PayslipStatus.CALCULATED) && 
                     <div className="mt-2 flex gap-2 items-end">
                        <Input wrapperClassName="flex-grow mb-0" label={t('payslips.itemDescription')} value={newItem.type === PayslipItemType.DEDUCTION ? newItem.description : ''} onChange={e => setNewItem({...newItem, description: e.target.value, type: PayslipItemType.DEDUCTION})} />
                        <Input wrapperClassName="w-28 mb-0" label={t('payslips.itemAmount')} type="number" value={newItem.type === PayslipItemType.DEDUCTION ? newItem.amount : 0} onChange={e => setNewItem({...newItem, amount: parseFloat(e.target.value) || 0, type: PayslipItemType.DEDUCTION})} />
                        <Button type="button" onClick={handleAddItem} size="sm"><IconPlus/></Button>
                    </div>}
                </Card>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select name="status" label={t('payslips.status')} value={payslipForm.status} onChange={handleFormInputChange} options={statusOptions} required />
                {payslipForm.status === PayslipStatus.PAID && (
                    <Input name="paymentDate" label={t('payslips.paymentDate')} type="date" value={payslipForm.paymentDate || ''} onChange={handleFormInputChange} />
                )}
            </div>
             <Input name="notes" label={t('common.notes')} value={payslipForm.notes || ''} onChange={handleFormInputChange} isTextArea rows={2} wrapperClassName="mt-4"/>


            <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
              <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
              {(payslipForm.status === PayslipStatus.DRAFT || payslipForm.status === PayslipStatus.CALCULATED || payslipForm.status === PayslipStatus.CONFIRMED) &&
                <Button type="submit" variant="primary">{t('common.save_changes')}</Button>
              }
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default PayslipsPage;

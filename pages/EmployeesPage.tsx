
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select'; 
import { Employee, Department, JobTitle } from '../types';
import { mockEmployees, generateId, mockDepartments, mockJobTitles } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;


type EmployeeFormState = Omit<Employee, 'id'>;

const initialEmployeeFormState: EmployeeFormState = {
  name: '',
  email: '',
  departmentId: '',
  jobTitleId: '',
  hireDate: '',
  basicSalary: 0,
};

const EmployeesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const formatDate = (dateString?: string) => dateString ? new Date(dateString).toLocaleDateString(locale) : '-';
  const formatCurrency = (value?: number) => value !== undefined ? value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('AED', t('common.amount_aed').split(' ')[1]) : '-';


  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [departments] = useState<Department[]>(mockDepartments);
  const [jobTitles] = useState<JobTitle[]>(mockJobTitles);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormState>(initialEmployeeFormState);

  const departmentOptions = departments.map(dep => ({ value: dep.id, label: dep.name }));
  const jobTitleOptions = jobTitles.map(jt => ({ value: jt.id, label: jt.name }));


  const columns = React.useMemo(() => [
    { Header: 'common.name', accessor: 'name' as keyof Employee },
    { Header: 'common.email', accessor: 'email' as keyof Employee },
    { Header: 'hr.department', accessor: (row: Employee) => departments.find(d => d.id === row.departmentId)?.name || t('common.na') },
    { Header: 'hr.jobTitle', accessor: (row: Employee) => jobTitles.find(jt => jt.id === row.jobTitleId)?.name || t('common.na') },
    { Header: 'hr.hireDate', accessor: 'hireDate' as keyof Employee, Cell: (value?: string) => formatDate(value) },
    { Header: 'hr.basicSalaryAed', accessor: 'basicSalary' as keyof Employee, Cell: (value?: number) => formatCurrency(value) },
  ], [t, departments, jobTitles, formatDate, formatCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const val = name === 'basicSalary' ? parseFloat(value) || 0 : value;
    setEmployeeForm(prev => ({ ...prev, [name]: val }));
  };

  const openModalForCreate = () => {
    setEditingEmployee(null);
    setEmployeeForm(initialEmployeeFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setEmployeeForm({
      name: employee.name,
      email: employee.email,
      departmentId: employee.departmentId,
      jobTitleId: employee.jobTitleId,
      hireDate: employee.hireDate || '',
      basicSalary: employee.basicSalary || 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...editingEmployee, ...employeeForm } : emp));
    } else {
      setEmployees([...employees, { id: generateId(), ...employeeForm }]);
    }
    closeModal();
  };

  const handleDeleteEmployee = useCallback((employeeId: string) => {
     if (window.confirm(t('employees.confirmDelete'))) {
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeId));
      }
  }, [t]);

  const renderRowActions = useCallback((employee: Employee) => (
    <>
      <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); openModalForEdit(employee);}} leftIcon={<IconPencil />} className="me-1">
        {t('common.edit')}
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteEmployee(employee.id);}} leftIcon={<IconTrash />}>
        {t('common.delete')}
      </Button>
    </>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [t, handleDeleteEmployee]); 

  return (
    <div>
      <PageHeader title={t('employees.pageTitle')} subtitle={t('employees.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />} size="lg">
          {t('employees.addNew')}
        </Button>
      </PageHeader>

      <Table<Employee> columns={columns} data={employees} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingEmployee ? t('employees.editEmployee') : t('employees.addEmployee')} size="lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" label={t('common.full_name')} value={employeeForm.name} onChange={handleInputChange} required />
            <Input name="email" label={t('common.email')} type="email" value={employeeForm.email} onChange={handleInputChange} required />
            <Select 
              name="departmentId" 
              label={t('hr.department')} 
              value={employeeForm.departmentId} 
              onChange={handleInputChange} 
              options={departmentOptions} 
              placeholder={t('employees.select_department')}
              required 
            />
            <Select 
              name="jobTitleId" 
              label={t('hr.jobTitle')} 
              value={employeeForm.jobTitleId} 
              onChange={handleInputChange} 
              options={jobTitleOptions} 
              placeholder={t('employees.select_job_title')}
              required 
            />
            <Input name="hireDate" label={t('hr.hireDate')} type="date" value={employeeForm.hireDate || ''} onChange={handleInputChange} />
            <Input name="basicSalary" label={t('hr.basicSalaryAed')} type="number" step="100" min="0" value={employeeForm.basicSalary || 0} onChange={handleInputChange} />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingEmployee ? t('common.save_changes') : t('employees.addEmployee')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeesPage;

import React, { useState, useCallback } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { Department } from '../../types';
import { mockDepartments, generateId } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" /></svg>;

const initialDepartmentFormState: Omit<Department, 'id'> = {
  name: '',
};

const DepartmentsPage: React.FC = () => {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [departmentForm, setDepartmentForm] = useState<Omit<Department, 'id'>>(initialDepartmentFormState);

  const columns = React.useMemo(() => [
    { Header: 'common.id_prefix', accessor: 'id' as keyof Department, Cell: (value: string) => value.substring(0,6) },
    { Header: 'departments.departmentName', accessor: 'name' as keyof Department },
  ], []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartmentForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingDepartment(null);
    setDepartmentForm(initialDepartmentFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (department: Department) => {
    setEditingDepartment(department);
    setDepartmentForm({ name: department.name });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDepartment) {
      setDepartments(departments.map(dep => dep.id === editingDepartment.id ? { ...editingDepartment, ...departmentForm } : dep));
    } else {
      setDepartments([...departments, { id: generateId(), ...departmentForm }]);
    }
    closeModal();
  };

  const handleDeleteDepartment = useCallback((departmentId: string) => {
     if (window.confirm(t('departments.confirmDelete'))) {
        setDepartments(prevDepartments => prevDepartments.filter(dep => dep.id !== departmentId));
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]); 

  const renderRowActions = useCallback((department: Department) => (
    <>
      <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); openModalForEdit(department);}} leftIcon={<IconPencil />} className="me-1">
        {t('common.edit')}
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteDepartment(department.id);}} leftIcon={<IconTrash />}>
        {t('common.delete')}
      </Button>
    </>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [t, handleDeleteDepartment]); 

  return (
    <div>
      <PageHeader title={t('departments.pageTitle')} subtitle={t('departments.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />} size="lg">
          {t('departments.addNew')}
        </Button>
      </PageHeader>

      <Table<Department> columns={columns} data={departments} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingDepartment ? t('departments.editDepartment') : t('departments.addDepartment')}>
        <form onSubmit={handleSubmit}>
          <Input name="name" label={t('departments.departmentName')} value={departmentForm.name} onChange={handleInputChange} required />
          
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingDepartment ? t('common.save_changes') : t('departments.addDepartment')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DepartmentsPage;
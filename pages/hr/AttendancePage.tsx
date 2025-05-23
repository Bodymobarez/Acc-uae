
import React, { useState, useCallback, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { AttendanceRecord, Employee, AttendanceStatus } from '../../types';
import { mockAttendanceRecords, mockEmployees, generateId } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;

const initialAttendanceFormState: Omit<AttendanceRecord, 'id'> = {
  employeeId: '',
  date: new Date().toISOString().split('T')[0],
  checkInTime: '',
  checkOutTime: '',
  status: AttendanceStatus.PRESENT,
  notes: '',
};

const AttendancePage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [attendanceForm, setAttendanceForm] = useState<Omit<AttendanceRecord, 'id'>>(initialAttendanceFormState);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);
  const formatTime = (timeString?: string) => timeString || '-';

  const employeeOptions = employees.map(emp => ({ value: emp.id, label: emp.name }));
  const statusOptions = Object.values(AttendanceStatus).map(status => ({ value: status, label: t(`hr.status.${status}` as any, {defaultValue: status})}));

  const columns = useMemo(() => [
    { Header: 'common.employee', accessor: (row: AttendanceRecord) => employees.find(e => e.id === row.employeeId)?.name || t('common.na') },
    { Header: 'common.date', accessor: 'date' as keyof AttendanceRecord, Cell: (value: string) => formatDate(value) },
    { Header: 'hr.checkInTime', accessor: 'checkInTime' as keyof AttendanceRecord, Cell: (value?: string) => formatTime(value) },
    { Header: 'hr.checkOutTime', accessor: 'checkOutTime' as keyof AttendanceRecord, Cell: (value?: string) => formatTime(value) },
    { Header: 'hr.attendanceStatus', accessor: 'status' as keyof AttendanceRecord, Cell: (value: AttendanceStatus) => t(`hr.status.${value}` as any, {defaultValue: value}) },
    { Header: 'common.notes', accessor: 'notes' as keyof AttendanceRecord, Cell: (value?: string) => value || '-' },
  ], [t, employees, formatDate, formatTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAttendanceForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingRecord(null);
    setAttendanceForm(initialAttendanceFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (record: AttendanceRecord) => {
    setEditingRecord(record);
    setAttendanceForm({
      employeeId: record.employeeId,
      date: record.date,
      checkInTime: record.checkInTime || '',
      checkOutTime: record.checkOutTime || '',
      status: record.status,
      notes: record.notes || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      setAttendanceRecords(attendanceRecords.map(rec => rec.id === editingRecord.id ? { ...editingRecord, ...attendanceForm } : rec));
    } else {
      setAttendanceRecords([...attendanceRecords, { id: generateId(), ...attendanceForm }]);
    }
    closeModal();
  };
  
  // Delete functionality can be added similarly if needed

  const renderRowActions = useCallback((record: AttendanceRecord) => (
    <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); openModalForEdit(record);}} leftIcon={<IconPencil />}>
      {t('common.edit')}
    </Button>
  ), [t]);

  return (
    <div>
      <PageHeader title={t('attendance.pageTitle')} subtitle={t('attendance.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />} size="lg">
          {t('attendance.addNew')}
        </Button>
      </PageHeader>

      <Table<AttendanceRecord> columns={columns} data={attendanceRecords} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingRecord ? t('attendance.editRecord') : t('attendance.addRecord')} size="lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select name="employeeId" label={t('common.employee')} value={attendanceForm.employeeId} onChange={handleInputChange} options={employeeOptions} placeholder={t('common.select_employee_placeholder')} required />
            <Input name="date" label={t('common.date')} type="date" value={attendanceForm.date} onChange={handleInputChange} required />
            <Input name="checkInTime" label={t('hr.checkInTime')} type="time" value={attendanceForm.checkInTime} onChange={handleInputChange} />
            <Input name="checkOutTime" label={t('hr.checkOutTime')} type="time" value={attendanceForm.checkOutTime} onChange={handleInputChange} />
            <Select name="status" label={t('hr.attendanceStatus')} value={attendanceForm.status} onChange={handleInputChange} options={statusOptions} placeholder={t('attendance.select_status')} required />
            <Input name="notes" label={t('common.notes')} value={attendanceForm.notes} onChange={handleInputChange} isTextArea rows={2} wrapperClassName="md:col-span-2"/>
          </div>
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingRecord ? t('common.save_changes') : t('common.save')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AttendancePage;

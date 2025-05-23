
import React, { useState, useCallback, useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { LeaveRequest, Employee, LeaveType, LeaveRequestStatus } from '../../types';
import { mockLeaveRequests, mockEmployees, mockLeaveTypes, generateId } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>;

const initialLeaveRequestFormState: Omit<LeaveRequest, 'id' | 'requestedDate'> = {
  employeeId: '',
  leaveTypeId: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  reason: '',
  status: LeaveRequestStatus.PENDING,
};

const LeaveRequestStatusColors: Record<LeaveRequestStatus, string> = {
  [LeaveRequestStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [LeaveRequestStatus.APPROVED]: "bg-green-100 text-green-800",
  [LeaveRequestStatus.REJECTED]: "bg-red-100 text-red-800",
};

const LeaveRequestsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [leaveTypes] = useState<LeaveType[]>(mockLeaveTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null);
  const [leaveRequestForm, setLeaveRequestForm] = useState<Omit<LeaveRequest, 'id' | 'requestedDate'>>(initialLeaveRequestFormState);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);

  const employeeOptions = employees.map(emp => ({ value: emp.id, label: emp.name }));
  const leaveTypeOptions = leaveTypes.map(lt => ({ value: lt.id, label: lt.name }));
  const statusOptions = Object.values(LeaveRequestStatus).map(status => ({ value: status, label: t(`leaveRequests.status.${status}` as any, {defaultValue: status})}));

  const columns = useMemo(() => [
    { Header: 'common.employee', accessor: (row: LeaveRequest) => employees.find(e => e.id === row.employeeId)?.name || t('common.na') },
    { Header: 'leaveRequests.leaveType', accessor: (row: LeaveRequest) => leaveTypes.find(lt => lt.id === row.leaveTypeId)?.name || t('common.na') },
    { Header: 'leaveRequests.startDate', accessor: 'startDate' as keyof LeaveRequest, Cell: (value: string) => formatDate(value) },
    { Header: 'leaveRequests.endDate', accessor: 'endDate' as keyof LeaveRequest, Cell: (value: string) => formatDate(value) },
    { Header: 'common.status', accessor: 'status' as keyof LeaveRequest, Cell: (value: LeaveRequestStatus) => 
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${LeaveRequestStatusColors[value]}`}>
            {t(`leaveRequests.status.${value}` as any, {defaultValue: value})}
        </span>
    },
    { Header: 'leaveRequests.requestDate', accessor: 'requestedDate' as keyof LeaveRequest, Cell: (value: string) => formatDate(value) },
  ], [t, employees, leaveTypes, formatDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeaveRequestForm(prev => ({ ...prev, [name]: value }));
  };

  const openModalForCreate = () => {
    setEditingRequest(null);
    setLeaveRequestForm(initialLeaveRequestFormState);
    setIsModalOpen(true);
  };

  const openModalForEdit = (request: LeaveRequest) => {
    setEditingRequest(request);
    setLeaveRequestForm({
      employeeId: request.employeeId,
      leaveTypeId: request.leaveTypeId,
      startDate: request.startDate,
      endDate: request.endDate,
      reason: request.reason || '',
      status: request.status,
      // Not editing approval fields here
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRequest(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRequest) {
      setLeaveRequests(leaveRequests.map(req => req.id === editingRequest.id ? { ...editingRequest, ...leaveRequestForm } : req));
    } else {
      const newRequest: LeaveRequest = { 
        id: generateId(), 
        ...leaveRequestForm,
        requestedDate: new Date().toISOString().split('T')[0],
      };
      setLeaveRequests([...leaveRequests, newRequest]);
    }
    closeModal();
  };

  const handleApproveReject = (id: string, newStatus: LeaveRequestStatus.APPROVED | LeaveRequestStatus.REJECTED) => {
    setLeaveRequests(prev => prev.map(req => 
        req.id === id ? {
            ...req, 
            status: newStatus, 
            approvedBy: 'E001', // Logged in user ID (placeholder)
            approvedDate: new Date().toISOString().split('T')[0]
        } : req
    ));
  };

  const renderRowActions = useCallback((request: LeaveRequest) => (
    <div className="space-x-1 rtl:space-x-reverse">
      <Button variant="outline" size="sm" onClick={() => openModalForEdit(request)} leftIcon={<IconPencil />}/>
      {request.status === LeaveRequestStatus.PENDING && (
        <>
          <Button variant="success" size="sm" onClick={() => handleApproveReject(request.id, LeaveRequestStatus.APPROVED)}>{t('leaveRequests.approve')}</Button>
          <Button variant="danger" size="sm" onClick={() => handleApproveReject(request.id, LeaveRequestStatus.REJECTED)}>{t('leaveRequests.reject')}</Button>
        </>
      )}
    </div>
  ), [t]);

  return (
    <div>
      <PageHeader title={t('leaveRequests.pageTitle')} subtitle={t('leaveRequests.pageSubtitle')}>
        <Button onClick={openModalForCreate} leftIcon={<IconPlus />} size="lg">
          {t('leaveRequests.addNew')}
        </Button>
      </PageHeader>

      <Table<LeaveRequest> columns={columns} data={leaveRequests} renderRowActions={renderRowActions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingRequest ? t('leaveRequests.editLeaveRequest') : t('leaveRequests.addLeaveRequest')} size="lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select name="employeeId" label={t('common.employee')} value={leaveRequestForm.employeeId} onChange={handleInputChange} options={employeeOptions} placeholder={t('common.select_employee_placeholder')} required />
            <Select name="leaveTypeId" label={t('leaveRequests.leaveType')} value={leaveRequestForm.leaveTypeId} onChange={handleInputChange} options={leaveTypeOptions} placeholder={t('leaveRequests.select_leave_type')} required />
            <Input name="startDate" label={t('leaveRequests.startDate')} type="date" value={leaveRequestForm.startDate} onChange={handleInputChange} required />
            <Input name="endDate" label={t('leaveRequests.endDate')} type="date" value={leaveRequestForm.endDate} onChange={handleInputChange} required />
            <Input name="reason" label={t('common.reason')} value={leaveRequestForm.reason} onChange={handleInputChange} isTextArea rows={2} wrapperClassName="md:col-span-2"/>
            {editingRequest && ( // Only show status for editing by admin, not initial request
                 <Select name="status" label={t('common.status')} value={leaveRequestForm.status} onChange={handleInputChange} options={statusOptions} required />
            )}
          </div>
          <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="secondary" onClick={closeModal}>{t('common.cancel')}</Button>
            <Button type="submit" variant="primary">{editingRequest ? t('common.save_changes') : t('common.submit')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LeaveRequestsPage;

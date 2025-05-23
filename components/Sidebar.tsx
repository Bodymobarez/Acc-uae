
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
// import { ServiceType } from '../types'; // Not used directly in this version of sidebar

// SVG Icons
const IconDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3m-16.5 0h16.5m-16.5 0V3.75c0 .621.504 1.125 1.125 1.125H19.125c.621 0 1.125-.504 1.125-1.125V3M3.75 21h16.5M12 6.75h.008v.008H12V6.75z" /></svg>;
const IconClients = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
// const IconSuppliers = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.988-1.186a48.548 48.548 0 10-11.026 0c-.566.138-.988.618-.988 1.186v.958m14.014-4.193l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25l2.25 2.25" /></svg>;
const IconServices = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconBookings = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" /></svg>;
const IconEmployees = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>;
const IconChart = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
const IconTransactions = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18M16.5 3L21 7.5m0 0L16.5 12M21 7.5H3" /></svg>;
const IconReports = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const IconHR = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconDepartment = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12h6m-6 5.25h6M5.25 6h.008v.008H5.25V6zm0 5.25h.008v.008H5.25v-.008zm0 5.25h.008v.008H5.25v-.008zm13.5 0h.008v.008h-.008v-.008zm0-5.25h.008v.008h-.008v-.008zm0-5.25h.008v.008h-.008V6z" /></svg>;
const IconJobTitle = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632zM15 13.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconHotel = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 7.5h10.5m-10.5 3h10.5m-10.5 3h10.5m-10.5 3h10.5M6.75 4.5h10.5v3H6.75v-3z" /></svg>;
const IconFlight = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12H18M3.27 20.876L5.999 12M21.73 3.126L18.001 12m-14.732 0h13.465c.732 0 1.397.246 1.944.685a2.249 2.249 0 01.315 3.309l-2.299 2.299a2.249 2.249 0 01-3.308.315 2.503 2.503 0 00-1.945-.685H6.001M6.001 12L3.27 20.876m0 0L.538 12m2.731 8.876L5.999 12" /></svg>;
const IconTransfer = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; 
const IconCar = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.988-1.186a48.548 48.548 0 10-11.026 0c-.566.138-.988.618-.988 1.186v.958m14.014-4.193l-2.25-2.25m0 0l-2.25 2.25m2.25-2.25l2.25 2.25" /></svg>;
const IconVisa = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.27.13 3.34.388m0 0a5.992 5.992 0 012.006 2.006M15.34 13.138a5.992 5.992 0 002.006 2.006m0 0a2.248 2.248 0 01-2.248 2.248H8.892a2.248 2.248 0 01-2.248-2.248m4.496-4.496a2.248 2.248 0 012.248-2.248V3.375c0-.933-.757-1.688-1.688-1.688H9.262c-.932 0-1.688.755-1.688 1.688v3.765c0 .932.756 1.687 1.688 1.687h1.058a2.248 2.248 0 012.248 2.248zm6.552 2.248a2.248 2.248 0 00-2.248-2.248M5.108 17.384a5.992 5.992 0 012.006-2.006m0 0a2.248 2.248 0 01-2.248-2.248V8.375c0-.933.757-1.688 1.688-1.688h2.734" /></svg>;
const IconTrain = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.05 3.996A7.468 7.468 0 0112 3.75a7.468 7.468 0 011.95.246M10.05 3.996C8.243 3.202 6.085 3 3.75 3v13.5c2.335 0 4.493.202 6.3.996m0-13.5V21m0-17.004c1.808.794 3.966.996 6.3.996V3.75c-2.335 0-4.493-.202-6.3-.996M13.95 3.996C15.757 3.202 17.915 3 20.25 3v13.5c-2.335 0-4.493.202-6.3.996M13.95 21V3.996m0 17.004A7.468 7.468 0 0012 20.25a7.468 7.468 0 00-1.95.246M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 8.25h16.5M3.75 15.75h16.5" /></svg>;
const IconCalendarDays = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>;
const IconClipboardList = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0cA3.375 3.375 0 017.5 6.108V8.25m8.9-2.418C15.636 3.723 14.364 3.5 12.75 3.5a48.447 48.447 0 00-6.248.31C5.398 3.995 4.5 5.056 4.5 6.25v13.5A2.25 2.25 0 006.75 22.5h10.5a2.25 2.25 0 002.25-2.25v-4.132c0-.865-.342-1.675-.94-2.278l-1.423-1.423A3.375 3.375 0 0014.25 11.25H13.5M9 12h3.75M9 15h3.75M9 18h3.75M3 3h.008v.008H3V3z" /></svg>;
const IconExclamationTriangle = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
const IconCurrencyDollar = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface NavItem {
  path: string;
  nameKey: string; 
  icon: React.ReactElement;
  subItems?: NavItem[];
  isParentOnly?: boolean; 
}


const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { t, language } = useLanguage();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});

  const navigationItems: NavItem[] = [
    { path: '/dashboard', nameKey: 'common.dashboard', icon: <IconDashboard /> },
    { 
      path: '#crm', nameKey: 'sidebar.crm', icon: <IconClients />, 
      subItems: [
        { path: '/clients', nameKey: 'common.clients', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
        { path: '/suppliers', nameKey: 'common.suppliers', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
      ]
    },
    { path: '/services', nameKey: 'common.services', icon: <IconServices /> },
    { 
      path: '#bookingsParent', 
      nameKey: 'common.bookings', 
      icon: <IconBookings />,
      isParentOnly: true,
      subItems: [
        { path: '/bookings/all', nameKey: 'bookings.allBookings', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
        { path: '/bookings/hotels', nameKey: 'services.type.Hotel', icon: <IconHotel /> },
        { path: '/bookings/flights', nameKey: 'services.type.Flight', icon: <IconFlight /> },
        { path: '/bookings/transfers', nameKey: 'services.type.Transfer', icon: <IconTransfer /> },
        { path: '/bookings/car-rentals', nameKey: 'services.type.CarRental', icon: <IconCar /> },
        { path: '/bookings/visa', nameKey: 'services.type.Visa', icon: <IconVisa /> },
        { path: '/bookings/train-tickets', nameKey: 'services.type.TrainTicket', icon: <IconTrain /> },
      ]
    },
    { 
      path: '#hr_management', nameKey: 'sidebar.hr_management', icon: <IconHR />,
      isParentOnly: true,
      subItems: [
        { path: '/employees', nameKey: 'common.employees', icon: <IconEmployees /> },
        { path: '/hr/departments', nameKey: 'hr.departments', icon: <IconDepartment /> },
        { path: '/hr/job-titles', nameKey: 'hr.jobTitles', icon: <IconJobTitle /> },
        { path: '/hr/attendance', nameKey: 'hr.attendance', icon: <IconCalendarDays /> },
        { path: '#leave_management', nameKey: 'hr.leave_management', icon: <IconClipboardList />, isParentOnly: true, 
          subItems: [
            { path: '/hr/leave-requests', nameKey: 'hr.leaveRequests', icon: <div className="w-1 h-1 bg-current rounded-full"></div>},
            { path: '/hr/leave-types', nameKey: 'hr.leaveTypes', icon: <div className="w-1 h-1 bg-current rounded-full"></div>},
          ]
        },
        { path: '#penalties_management', nameKey: 'hr.penalties', icon: <IconExclamationTriangle />, isParentOnly: true, 
          subItems: [
            { path: '/hr/employee-penalties', nameKey: 'hr.employeePenalties', icon: <div className="w-1 h-1 bg-current rounded-full"></div>},
            { path: '/hr/penalty-types', nameKey: 'hr.penaltyTypes', icon: <div className="w-1 h-1 bg-current rounded-full"></div>},
          ]
        },
        { path: '#payroll_management', nameKey: 'hr.payroll', icon: <IconCurrencyDollar />, isParentOnly: true, 
          subItems: [
            { path: '/hr/payroll-periods', nameKey: 'hr.payrollPeriods', icon: <div className="w-1 h-1 bg-current rounded-full"></div>},
            { path: '/hr/payslips', nameKey: 'hr.payslips', icon: <div className="w-1 h-1 bg-current rounded-full"></div>},
          ]
        },
      ]
    },
    { 
      path: '#accounting', nameKey: 'sidebar.accounting', icon: <IconChart />,
      subItems: [
        { path: '/chart-of-accounts', nameKey: 'common.chartOfAccounts', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
        { path: '/journal-entries', nameKey: 'common.journalEntries', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
        { path: '/ledger', nameKey: 'common.generalLedger', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
        { path: '/trial-balance', nameKey: 'common.trialBalance', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
      ]
    },
     { 
      path: '#transactions', nameKey: 'sidebar.transactions', icon: <IconTransactions />,
      subItems: [
        { path: '/payments', nameKey: 'common.payments', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
        { path: '/collections', nameKey: 'common.collections', icon: <div className="w-1 h-1 bg-current rounded-full"></div> },
      ]
    },
    { path: '/reports', nameKey: 'common.reports', icon: <IconReports /> },
    { path: '/users', nameKey: 'common.users', icon: <IconUsers /> },
  ];


  const toggleSubmenu = (itemNameKey: string) => {
    setOpenSubmenus(prev => ({...prev, [itemNameKey]: !prev[itemNameKey]}));
  };
  
  React.useEffect(() => {
    const currentPath = location.pathname;
    const newOpenSubmenus = { ...openSubmenus };
    let parentNeedsOpening = false;

    function checkAndOpen(items: NavItem[], parentKey?: string) {
        for (const item of items) {
            if (item.subItems) {
                if (item.subItems.some(sub => currentPath.startsWith(sub.path) || (sub.subItems && sub.subItems.some(s => currentPath.startsWith(s.path))))) {
                    newOpenSubmenus[item.nameKey] = true;
                    if (parentKey) parentNeedsOpening = true; // Mark that a deeper parent might need opening
                    checkAndOpen(item.subItems, item.nameKey); // Recurse
                }
            }
        }
    }
    checkAndOpen(navigationItems);
    if (parentNeedsOpening || Object.keys(newOpenSubmenus).some(k=> newOpenSubmenus[k])) {
        setOpenSubmenus(newOpenSubmenus);
    }

    if (window.innerWidth < 768) { 
        setSidebarOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, setSidebarOpen]); // Removed navigationItems from deps as it's stable

  const renderNavItem = (item: NavItem, isSubItem: boolean = false, level: number = 0) => {
    const translatedName = t(item.nameKey as any); 
    const isActive = location.pathname === item.path || 
                     (item.path !== '/' && location.pathname.startsWith(item.path) && item.path.length > 1 && !item.subItems) || 
                     (item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.path) || (sub.subItems && sub.subItems.some(s => location.pathname.startsWith(s.path)))));
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubmenuOpen = openSubmenus[item.nameKey] || (item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.path) || (sub.subItems && sub.subItems.some(s => location.pathname.startsWith(s.path)))));

    const paddingClass = level === 0 ? 'px-4' : `ps-${4 + level * 4} rtl:pe-${4 + level * 4} rtl:ps-4`;


    if (hasSubItems) {
      return (
        <li key={item.nameKey}>
          <button
            onClick={() => toggleSubmenu(item.nameKey)}
            className={`w-full flex items-center justify-between ${paddingClass} py-2.5 text-sm rounded-lg transition-colors duration-150 ease-in-out
              ${isActive && !item.isParentOnly ? 'bg-primary-500 text-white font-medium shadow-md' : 'text-secondary-700 hover:bg-accent-50 hover:text-accent-600'}
              ${isActive && item.isParentOnly ? 'font-medium text-accent-600' : ''}
              `}
            aria-expanded={isSubmenuOpen}
          >
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className={isActive && item.isParentOnly ? 'text-accent-600' : ''}>{item.icon}</span>
              <span>{translatedName}</span>
            </div>
            <svg className={`w-4 h-4 transform transition-transform duration-150 sidebar-chevron ${isSubmenuOpen ? (language === 'ar' ? '-rotate-90' : 'rotate-90') : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          {isSubmenuOpen && (
            <ul className="mt-1 space-y-1">
              {item.subItems?.map(subItem => renderNavItem(subItem, true, level + 1))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={item.path}>
        <Link
          to={item.path}
          className={`flex items-center space-x-3 rtl:space-x-reverse ${paddingClass} py-2.5 text-sm rounded-lg transition-colors duration-150 ease-in-out
            ${isActive ? 'bg-primary-500 text-white font-medium shadow-md' : 'text-secondary-700 hover:bg-accent-50 hover:text-accent-600'}`}
        >
          {item.icon}
          <span>{translatedName}</span>
        </Link>
      </li>
    );
  };

  const appNameFull = t('common.appName');
  const appNameParts = appNameFull.split(' ');
  const appNameFirstPart = appNameParts[0];
  const appNameRest = appNameParts.slice(1).join(' ');

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-40 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-center h-20 border-b border-secondary-200 px-4">
          <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 text-center">
            {appNameFirstPart} <span className="text-secondary-600">{appNameRest}</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <ul>
            {navigationItems.map(item => renderNavItem(item, false, 0))}
          </ul>
        </nav>
        <div className="p-4 border-t border-secondary-200">
            <p className="text-xs text-secondary-500 text-center">{t('sidebar.footer_note', { year: new Date().getFullYear() })}</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

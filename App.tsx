
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import SuppliersPage from './pages/SuppliersPage';
import ServicesPage from './pages/ServicesPage';
import EmployeesPage from './pages/EmployeesPage';
// Import new and modified booking pages
import AllBookingsPage from './pages/bookings/AllBookingsPage';
import HotelBookingsPage from './pages/bookings/HotelBookingsPage';
import ManageHotelBookingPage from './pages/bookings/ManageHotelBookingPage'; 
import FlightBookingsPage from './pages/bookings/FlightBookingsPage';
import TransferBookingsPage from './pages/bookings/TransferBookingsPage';
import CarRentalBookingsPage from './pages/bookings/CarRentalBookingsPage';
import VisaBookingsPage from './pages/bookings/VisaBookingsPage';
import TrainTicketBookingsPage from './pages/bookings/TrainTicketBookingsPage';

import ChartOfAccountsPage from './pages/ChartOfAccountsPage';
import UsersPage from './pages/UsersPage';
import JournalEntriesPage from './pages/JournalEntriesPage';
import ReportsPage from './pages/ReportsPage';
import PaymentsPage from './pages/PaymentsPage';
import CollectionsPage from './pages/CollectionsPage';
import LedgerPage from './pages/LedgerPage';
import TrialBalancePage from './pages/TrialBalancePage';
import InvoicePage from './pages/InvoicePage';
import { useLanguage } from './contexts/LanguageContext';
import { ServiceType } from './types';

// HR Module Pages
import DepartmentsPage from './pages/hr/DepartmentsPage'; 
import JobTitlesPage from './pages/hr/JobTitlesPage';   
import AttendancePage from './pages/hr/AttendancePage';
import LeaveTypesPage from './pages/hr/LeaveTypesPage';
import LeaveRequestsPage from './pages/hr/LeaveRequestsPage';
import PenaltyTypesPage from './pages/hr/PenaltyTypesPage';
import EmployeePenaltiesPage from './pages/hr/EmployeePenaltiesPage';
import PayrollPeriodsPage from './pages/hr/PayrollPeriodsPage';
import PayslipsPage from './pages/hr/PayslipsPage';


const App: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('common.appTitle');
  }, [t]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/services" element={<ServicesPage />} /> 
        
        {/* HR Routes */}
        <Route path="/employees" element={<EmployeesPage />} /> 
        <Route path="/hr/departments" element={<DepartmentsPage />} />
        <Route path="/hr/job-titles" element={<JobTitlesPage />} />
        <Route path="/hr/attendance" element={<AttendancePage />} />
        <Route path="/hr/leave-types" element={<LeaveTypesPage />} />
        <Route path="/hr/leave-requests" element={<LeaveRequestsPage />} />
        <Route path="/hr/penalty-types" element={<PenaltyTypesPage />} />
        <Route path="/hr/employee-penalties" element={<EmployeePenaltiesPage />} />
        <Route path="/hr/payroll-periods" element={<PayrollPeriodsPage />} />
        <Route path="/hr/payslips" element={<PayslipsPage />} />
        
        <Route path="/bookings" element={<Navigate to="/bookings/all" replace />} /> 
        <Route path="/bookings/all" element={<AllBookingsPage />} />
        <Route path="/bookings/hotels" element={<HotelBookingsPage serviceTypeFocus={ServiceType.HOTEL} />} />
        <Route path="/bookings/hotels/manage/new" element={<ManageHotelBookingPage />} />
        <Route path="/bookings/hotels/manage/edit/:bookingId" element={<ManageHotelBookingPage />} />
        <Route path="/bookings/flights" element={<FlightBookingsPage serviceTypeFocus={ServiceType.FLIGHT} />} />
        <Route path="/bookings/transfers" element={<TransferBookingsPage serviceTypeFocus={ServiceType.TRANSFER} />} />
        <Route path="/bookings/car-rentals" element={<CarRentalBookingsPage serviceTypeFocus={ServiceType.CAR_RENTAL} />} />
        <Route path="/bookings/visa" element={<VisaBookingsPage serviceTypeFocus={ServiceType.VISA} />} />
        <Route path="/bookings/train-tickets" element={<TrainTicketBookingsPage serviceTypeFocus={ServiceType.TRAIN_TICKET} />} />
        
        <Route path="/chart-of-accounts" element={<ChartOfAccountsPage />} />
        <Route path="/journal-entries" element={<JournalEntriesPage />} />
        <Route path="/ledger" element={<LedgerPage />} />
        <Route path="/trial-balance" element={<TrialBalancePage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/invoice/:bookingId" element={<InvoicePage />} />
      </Routes>
    </Layout>
  );
};

export default App;

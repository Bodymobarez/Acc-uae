
import { Client, Supplier, TourismService, Employee, User, Account, Booking, BookingStatus, FinancialTransaction, JournalEntry, AccountType, TransactionType, ServiceType, BookingCategory, BookingServiceItem, HotelServiceDetails, Department, JobTitle, LeaveType, PenaltyType, AttendanceRecord, AttendanceStatus, LeaveRequest, LeaveRequestStatus, EmployeePenalty, PayrollPeriod, PayrollPeriodStatus, Payslip, PayslipStatus } from '../types';
import { DEFAULT_ACCOUNTS, UAE_VAT_RATE } from '../constants';

let idCounter = Date.now();
export const generateId = () => `id-${idCounter++}-${Math.random().toString(36).substr(2, 5)}`;


// HR Module Data
export const mockDepartments: Department[] = [
  { id: 'DEP001', name: 'Sales & Marketing' },
  { id: 'DEP002', name: 'Operations & Customer Service' },
  { id: 'DEP003', name: 'Accounting & Finance' },
  { id: 'DEP004', name: 'Human Resources' },
  { id: 'DEP005', name: 'Management' },
];

export const mockJobTitles: JobTitle[] = [
  { id: 'JT001', name: 'Sales Manager', departmentId: 'DEP001' },
  { id: 'JT002', name: 'Sales Agent', departmentId: 'DEP001' },
  { id: 'JT003', name: 'Customer Service Representative', departmentId: 'DEP002' },
  { id: 'JT004', name: 'Operations Manager', departmentId: 'DEP002' },
  { id: 'JT005', name: 'Accountant', departmentId: 'DEP003' },
  { id: 'JT006', name: 'Finance Manager', departmentId: 'DEP003' },
  { id: 'JT007', name: 'HR Manager', departmentId: 'DEP004' },
  { id: 'JT008', name: 'General Manager', departmentId: 'DEP005' },
  { id: 'JT009', name: 'Marketing Specialist', departmentId: 'DEP001' },
];

export const mockClients: Client[] = [
  { id: 'C001', name: 'Global Adventures Inc.', email: 'contact@globaladventures.com', phone: '+971 50 123 4567', vatNumber: 'TRN1001234567' },
  { id: 'C002', name: 'Desert Dreams LLC', email: 'info@desertdreams.ae', phone: '+971 55 987 6543', address: 'Sheikh Zayed Road, Dubai' },
  { id: 'C003', name: 'Coastal Escapes Ltd.', email: 'bookings@coastalescapes.com', phone: '+971 52 333 4444' },
];

export const mockSuppliers: Supplier[] = [
  { id: 'S001', name: 'Luxury Hotels Group', serviceType: 'Accommodation', contactEmail: 'sales@luxuryhotels.com', phone: '+971 4 555 0001', vatNumber: 'TRN2009876543' },
  { id: 'S002', name: 'City Tour Operators', serviceType: 'Tours & Activities', contactEmail: 'ops@citytours.ae' },
  { id: 'S003', name: 'FlyHigh Airlines', serviceType: 'Flights', contactEmail: 'corporate@flyhigh.com', phone: '+971 4 111 2222' },
];

export const mockServices: TourismService[] = [
  { id: 'TS001', name: 'Deluxe City View Room', description: '1 night stay in a deluxe room with city view.', defaultCost: 500, defaultPrice: 750, supplierId: 'S001' },
  { id: 'TS002', name: 'Desert Safari Adventure', description: 'Evening desert safari with BBQ dinner.', defaultCost: 150, defaultPrice: 250, supplierId: 'S002' },
  { id: 'TS003', name: 'DXB-LHR Economy Flight', description: 'One-way economy flight Dubai to London.', defaultCost: 1200, defaultPrice: 1500, supplierId: 'S003' },
  { id: 'TS004', name: 'Airport Transfer - Sedan', description: 'Private sedan airport transfer.', defaultCost: 80, defaultPrice: 120 },
  { id: 'TS005', name: 'Visa Processing - Tourist', description: 'Standard tourist visa processing.', defaultCost: 200, defaultPrice: 350 },
];

export const mockEmployees: Employee[] = [
  { id: 'E001', name: 'Aisha Al Mansouri', email: 'aisha.m@example.com', departmentId: 'DEP001', jobTitleId: 'JT001', hireDate: '2020-01-15', basicSalary: 15000 },
  { id: 'E002', name: 'Omar Hassan', email: 'omar.h@example.com', departmentId: 'DEP001', jobTitleId: 'JT002', hireDate: '2021-06-01', basicSalary: 8000 },
  { id: 'E003', name: 'Fatima Khan', email: 'fatima.k@example.com', departmentId: 'DEP003', jobTitleId: 'JT005', hireDate: '2019-03-10', basicSalary: 12000 },
  { id: 'E004', name: 'Yusuf Ahmed', email: 'yusuf.a@example.com', departmentId: 'DEP002', jobTitleId: 'JT003', hireDate: '2022-02-20', basicSalary: 7500, customerServiceEmployeeId: 'E004' },
];

// HR Module - Phase 2: Mock Data
export const mockLeaveTypes: LeaveType[] = [
  { id: generateId(), name: 'Annual Leave', defaultDaysAllowed: 22 },
  { id: generateId(), name: 'Sick Leave', defaultDaysAllowed: 10 },
  { id: generateId(), name: 'Unpaid Leave' },
  { id: generateId(), name: 'Maternity Leave', defaultDaysAllowed: 45 },
];

export const mockPenaltyTypes: PenaltyType[] = [
  { id: generateId(), name: 'Late Arrival (15-30 mins)', description: 'Deduction for arriving late by 15 to 30 minutes.', deductionAmount: 50 },
  { id: generateId(), name: 'Unexcused Absence (Half Day)', description: 'Deduction for half day unexcused absence.', deductionDays: 0.5 },
  { id: generateId(), name: 'Unexcused Absence (Full Day)', description: 'Deduction for full day unexcused absence.', deductionDays: 1 },
  { id: generateId(), name: 'Damage to Company Property', description: 'Penalty for causing damage.', deductionAmount: 200 },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: generateId(), employeeId: 'E001', date: '2024-07-28', checkInTime: '08:55', checkOutTime: '18:05', status: AttendanceStatus.PRESENT },
  { id: generateId(), employeeId: 'E002', date: '2024-07-28', checkInTime: '09:15', checkOutTime: '17:50', status: AttendanceStatus.LATE },
  { id: generateId(), employeeId: 'E003', date: '2024-07-28', status: AttendanceStatus.ON_LEAVE, notes: 'Annual Leave' },
  { id: generateId(), employeeId: 'E004', date: '2024-07-28', checkInTime: '09:00', checkOutTime: '18:00', status: AttendanceStatus.PRESENT },
  { id: generateId(), employeeId: 'E001', date: '2024-07-29', checkInTime: '09:00', checkOutTime: '18:00', status: AttendanceStatus.PRESENT },
  { id: generateId(), employeeId: 'E002', date: '2024-07-29', status: AttendanceStatus.ABSENT, notes: 'Reported sick' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: generateId(), employeeId: 'E003', leaveTypeId: mockLeaveTypes[0].id, // Annual
    startDate: '2024-07-28', endDate: '2024-07-28', reason: 'Personal day',
    status: LeaveRequestStatus.APPROVED, requestedDate: '2024-07-20', approvedBy: 'E001', approvedDate: '2024-07-21'
  },
  {
    id: generateId(), employeeId: 'E002', leaveTypeId: mockLeaveTypes[1].id, // Sick
    startDate: '2024-08-05', endDate: '2024-08-07', reason: 'Flu symptoms',
    status: LeaveRequestStatus.PENDING, requestedDate: '2024-07-30'
  },
];

export const mockEmployeePenalties: EmployeePenalty[] = [
  {
    id: generateId(), employeeId: 'E002', penaltyTypeId: mockPenaltyTypes[0].id, // Late Arrival
    date: '2024-07-28', reason: 'Arrived at 9:15 AM without prior notice.', amountDeducted: 50
  },
];


export const mockUsers: User[] = [
  { id: 'U001', username: 'admin', fullName: 'Administrator', email: 'admin@example.com', role: 'Admin', isActive: true },
  { id: 'U002', username: 'aisha_m', fullName: 'Aisha Al Mansouri', email: 'aisha.m@example.com', role: 'Manager', isActive: true },
  { id: 'U003', username: 'omar_h', fullName: 'Omar Hassan', email: 'omar.h@example.com', role: 'Sales Agent', isActive: true },
  { id: 'U004', username: 'fatima_k', fullName: 'Fatima Khan', email: 'fatima.k@example.com', role: 'Accountant', isActive: false },
];

export const mockAccounts: Account[] = [...DEFAULT_ACCOUNTS];

const calculateMockBookingTotals = (
    services: BookingServiceItem[], 
    employeeCommissionPercentage: number,
    customerServiceCommissionPercentage: number,
    category: BookingCategory
) => {
  let totalCost = 0;
  let totalPriceToClient = 0;
  let totalVat = 0;
  let netProfitAfterVAT = 0;

  services.forEach(item => {
    const itemTotalCost = item.cost * item.quantity;
    const itemRevenueFromPrice = item.price * item.quantity; 
    
    totalCost += itemTotalCost;
    totalPriceToClient += itemRevenueFromPrice;

    let itemVAT = 0;
    let itemNetRevenueForProfitCalc = itemRevenueFromPrice;

    const isDomesticVATRule = category === BookingCategory.DOMESTIC || item.serviceType === ServiceType.VISA;

    if (isDomesticVATRule) {
      itemNetRevenueForProfitCalc = itemRevenueFromPrice / (1 + UAE_VAT_RATE);
      itemVAT = itemRevenueFromPrice - itemNetRevenueForProfitCalc;
    } else { 
      const itemGrossProfit = itemRevenueFromPrice - itemTotalCost;
      itemVAT = itemGrossProfit > 0 ? itemGrossProfit * UAE_VAT_RATE : 0;
    }
    
    totalVat += itemVAT;
    if (isDomesticVATRule) {
        netProfitAfterVAT += itemNetRevenueForProfitCalc - itemTotalCost;
    } else {
        netProfitAfterVAT += (itemRevenueFromPrice - itemTotalCost) - itemVAT;
    }
  });
  
  const finalNetProfitAfterVAT = Math.max(0, netProfitAfterVAT);

  const employeeCommissionAmount = finalNetProfitAfterVAT * (employeeCommissionPercentage / 100);
  const customerServiceCommissionAmount = finalNetProfitAfterVAT * (customerServiceCommissionPercentage / 100);

  return {
    totalCost,
    totalPrice: totalPriceToClient,
    vatAmount: totalVat,
    netProfit: finalNetProfitAfterVAT,
    employeeCommissionAmount,
    customerServiceCommissionAmount,
  };
};

const booking1HotelDetails: HotelServiceDetails = {
    voucherNumber: 'HV2024001', country: 'UAE', city: 'Dubai', hotelName: 'Burj Al Arab Jumeirah', region: 'DOMESTIC',
    pnr: 'HOTELPNR123', originCountry: 'UAE', gds: 'HotelBeds', issuingStaff: 'System', bookingStaff: 'Aisha M.',
    issueDate: '2024-07-10', supplierConfNo: 'SUPCONF001', hotelConfNo: 'HOTCONF001X', roomType: 'Deluxe Suite',
    checkInDate: '2024-08-01', checkOutDate: '2024-08-03', branch: 'Main', ratePerNight: 3500, mealsPlan: 'BB',
    noOfAdults: 2, noOfChildren: 0, noOfRooms: 1, noOfNights: 2, guests: 'Mr. & Mrs. Smith',
    bookingDetails: 'Honeymoon package requested. High floor.', additionalReference: 'REF001', couponRemark: 'WELCOME10', customerEmpNo: 'CUSTEMP01',
    termsAndConditions: true, pickUp: true, dropOff: false
};

const booking1Services: BookingServiceItem[] = [
  { 
    id: generateId(), serviceId: 'TS001', serviceName: 'Burj Al Arab - 2 Nights Deluxe Suite', serviceType: ServiceType.HOTEL,
    cost: 6000, price: 7000, quantity: 1,
    hotelDetails: booking1HotelDetails
  },
  { 
    id: generateId(), serviceId: 'TS002', serviceName: 'Desert Safari Adventure for Two', serviceType: ServiceType.GENERIC,
    cost: 300, price: 500, quantity: 1
  },
];
const booking1Category = BookingCategory.DOMESTIC;
const booking1Totals = calculateMockBookingTotals(booking1Services, 10, 2, booking1Category);


const booking2Services: BookingServiceItem[] = [
  { 
    id: generateId(), serviceId: 'TS003', serviceName: 'DXB-LHR Economy Flight', serviceType: ServiceType.FLIGHT,
    cost: 1200, price: 1500, quantity: 1 
  },
  { 
    id: generateId(), serviceId: 'TS004', serviceName: 'Airport Transfer - Sedan (LHR)', serviceType: ServiceType.TRANSFER,
    cost: 80, price: 120, quantity: 1 
  },
];
const booking2Category = BookingCategory.INTERNATIONAL;
const booking2Totals = calculateMockBookingTotals(booking2Services, 8, 0, booking2Category);

const booking3VisaService: BookingServiceItem[] = [
    {
        id: generateId(), serviceId: 'TS005', serviceName: 'UAE Tourist Visa', serviceType: ServiceType.VISA,
        cost: 200, price: 350, quantity: 1,
    }
];
const booking3Category = BookingCategory.DOMESTIC; 
const booking3Totals = calculateMockBookingTotals(booking3VisaService, 5, 1, booking3Category);


export let mockBookings: Booking[] = [
  {
    id: 'B001',
    fileNumber: 'TF-2024-001',
    clientId: 'C001',
    employeeId: 'E002', 
    customerServiceEmployeeId: 'E004', 
    bookingDate: new Date(2024, 6, 15).toISOString(),
    bookingCategory: booking1Category,
    services: booking1Services,
    totalCost: booking1Totals.totalCost,
    totalPrice: booking1Totals.totalPrice,
    vatAmount: booking1Totals.vatAmount,
    netProfit: booking1Totals.netProfit,
    employeeCommissionPercentage: 10,
    employeeCommissionAmount: booking1Totals.employeeCommissionAmount,
    customerServiceCommissionPercentage: 2,
    customerServiceCommissionAmount: booking1Totals.customerServiceCommissionAmount,
    status: BookingStatus.CONFIRMED,
    notes: 'VIP client, ensure smooth arrangements.',
    invoiceNumber: 'INV-TF-2024-001-01'
  },
  {
    id: 'B002',
    fileNumber: 'TF-2024-002',
    clientId: 'C002',
    employeeId: 'E001', 
    customerServiceEmployeeId: undefined,
    bookingDate: new Date(2024, 7, 1).toISOString(),
    bookingCategory: booking2Category,
    services: booking2Services,
    totalCost: booking2Totals.totalCost,
    totalPrice: booking2Totals.totalPrice,
    vatAmount: booking2Totals.vatAmount,
    netProfit: booking2Totals.netProfit,
    employeeCommissionPercentage: 8,
    employeeCommissionAmount: booking2Totals.employeeCommissionAmount,
    customerServiceCommissionPercentage: 0,
    customerServiceCommissionAmount: booking2Totals.customerServiceCommissionAmount,
    status: BookingStatus.PENDING,
    invoiceNumber: null,
  },
  {
    id: 'B003',
    fileNumber: 'TF-2024-003',
    clientId: 'C003',
    employeeId: 'E002', 
    customerServiceEmployeeId: 'E004',
    bookingDate: new Date(2024, 7, 5).toISOString(),
    bookingCategory: booking3Category,
    services: booking3VisaService,
    totalCost: booking3Totals.totalCost,
    totalPrice: booking3Totals.totalPrice,
    vatAmount: booking3Totals.vatAmount,
    netProfit: booking3Totals.netProfit,
    employeeCommissionPercentage: 5,
    employeeCommissionAmount: booking3Totals.employeeCommissionAmount,
    customerServiceCommissionPercentage: 1,
    customerServiceCommissionAmount: booking3Totals.customerServiceCommissionAmount,
    status: BookingStatus.CONFIRMED,
    invoiceNumber: 'INV-TF-2024-003-01'
  }
];

export const mockJournalEntries: JournalEntry[] = [
    {
        id: 'JE001',
        date: new Date(2024, 6, 15).toISOString(),
        description: 'Revenue and COGS for Booking TF-2024-001',
        referenceId: 'B001',
        isAutoGenerated: true,
        details: [
            { accountId: 'A003', accountName: 'Accounts Receivable', debit: mockBookings[0].totalPrice + (mockBookings[0].bookingCategory === BookingCategory.INTERNATIONAL ? mockBookings[0].vatAmount : 0) , credit: 0 }, 
            { accountId: 'R002', accountName: 'Service Revenue - Hotels', debit: 0, credit: (mockBookings[0].totalPrice + (mockBookings[0].bookingCategory === BookingCategory.INTERNATIONAL ? mockBookings[0].vatAmount : 0)) - mockBookings[0].vatAmount }, 
            { accountId: 'X002', accountName: 'Cost of Hotels', debit: mockBookings[0].totalCost, credit: 0 },
            { accountId: 'L001', accountName: 'Accounts Payable', debit: 0, credit: mockBookings[0].totalCost }, 
            { accountId: 'L002', accountName: 'VAT Payable', debit:0, credit: mockBookings[0].vatAmount || 0}
        ]
    },
    {
        id: 'JE002',
        date: new Date(2024, 6, 20).toISOString(),
        description: 'Office Rent Payment - July 2024',
        details: [
            { accountId: 'X102', accountName: 'Rent Expense', debit: 5000, credit: 0 },
            { accountId: 'A002', accountName: 'Bank Accounts', debit: 0, credit: 5000 },
        ]
    }
];

export const mockFinancialTransactions: FinancialTransaction[] = [
  { 
    id: 'FT001', 
    date: new Date(2024, 6, 25).toISOString(), 
    type: TransactionType.COLLECTION, 
    partyId: 'C001', 
    partyType: 'Client', 
    partyName: 'Global Adventures Inc.', 
    amount: mockBookings.find(b=>b.id==='B001')?.totalPrice || 0, 
    description: 'Payment for Booking TF-2024-001', 
    relatedBookingId: 'B001',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'TRN-CLIENT-001'
  },
  { 
    id: 'FT002', 
    date: new Date(2024, 6, 28).toISOString(), 
    type: TransactionType.PAYMENT, 
    partyId: 'S001', 
    partyType: 'Supplier',
    partyName: 'Luxury Hotels Group', 
    amount: mockBookings.find(b=>b.id==='B001')?.totalCost || 0, 
    description: 'Payment for hotel services Booking TF-2024-001', 
    relatedBookingId: 'B001',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'TRN-SUPPLIER-001'
  },
];

// HR Module - Phase 3: Payroll Mock Data
export const mockPayrollPeriods: PayrollPeriod[] = [
  { id: generateId(), name: 'July 2024 Payroll', startDate: '2024-07-01', endDate: '2024-07-31', status: PayrollPeriodStatus.OPEN },
  { id: generateId(), name: 'August 2024 Payroll', startDate: '2024-08-01', endDate: '2024-08-31', status: PayrollPeriodStatus.OPEN },
];

export let mockPayslips: Payslip[] = [];

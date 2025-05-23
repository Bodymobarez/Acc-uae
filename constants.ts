import { AccountType, ServiceType, BookingCategory } from './types';

// APP_NAME is removed, will be handled by i18n: t('common.appName')

export const DEFAULT_ACCOUNTS = [
  // Assets
  { id: 'A001', code: '1010', name: 'Cash on Hand', type: AccountType.ASSET, balance: 0 },
  { id: 'A002', code: '1020', name: 'Bank Accounts', type: AccountType.ASSET, balance: 0 },
  { id: 'A003', code: '1100', name: 'Accounts Receivable', type: AccountType.ASSET, balance: 0, isControlAccount: true, subsidiaryLedger: 'Clients' },
  { id: 'A004', code: '1200', name: 'Prepaid Expenses', type: AccountType.ASSET, balance: 0 },
  // Liabilities
  { id: 'L001', code: '2010', name: 'Accounts Payable', type: AccountType.LIABILITY, balance: 0, isControlAccount: true, subsidiaryLedger: 'Suppliers' },
  { id: 'L002', code: '2100', name: 'VAT Payable', type: AccountType.LIABILITY, balance: 0 },
  { id: 'L003', code: '2200', name: 'Accrued Expenses', type: AccountType.LIABILITY, balance: 0 },
  // Equity
  { id: 'E001', code: '3010', name: 'Owner\'s Capital', type: AccountType.EQUITY, balance: 0 },
  { id: 'E002', code: '3020', name: 'Retained Earnings', type: AccountType.EQUITY, balance: 0 },
  // Revenue
  { id: 'R001', code: '4010', name: 'Service Revenue - Tours', type: AccountType.REVENUE, balance: 0 },
  { id: 'R002', code: '4020', name: 'Service Revenue - Hotels', type: AccountType.REVENUE, balance: 0 },
  { id: 'R003', code: '4030', name: 'Service Revenue - Flights', type: AccountType.REVENUE, balance: 0 },
  { id: 'R004', code: '4040', name: 'Commission Income', type: AccountType.REVENUE, balance: 0 },
  // Expenses (Cost of Goods Sold / Cost of Services)
  { id: 'X001', code: '5010', name: 'Cost of Tours', type: AccountType.EXPENSE, balance: 0 },
  { id: 'X002', code: '5020', name: 'Cost of Hotels', type: AccountType.EXPENSE, balance: 0 },
  { id: 'X003', code: '5030', name: 'Cost of Flights', type: AccountType.EXPENSE, balance: 0 },
  // Operating Expenses
  { id: 'X101', code: '6010', name: 'Salaries Expense', type: AccountType.EXPENSE, balance: 0 },
  { id: 'X102', code: '6020', name: 'Rent Expense', type: AccountType.EXPENSE, balance: 0 },
  { id: 'X103', code: '6030', name: 'Utilities Expense', type: AccountType.EXPENSE, balance: 0 },
  { id: 'X104', code: '6040', name: 'Marketing Expense', type: AccountType.EXPENSE, balance: 0 },
  { id: 'X105', code: '6050', name: 'Employee Commissions Expense', type: AccountType.EXPENSE, balance: 0 },
];

export const UAE_VAT_RATE = 0.05; // 5%

export const GDS_OPTIONS = [
    { value: 'Amadeus', label: 'Amadeus' },
    { value: 'Sabre', label: 'Sabre' },
    { value: 'Galileo', label: 'Galileo' },
    { value: 'Worldspan', label: 'Worldspan' },
    { value: 'Other', label: 'Other' }, // Key: hotel.gds_other
];

export const REGION_OPTIONS = [
    { value: 'DOMESTIC', label: 'Domestic' }, // Key for translation: 'hotel.region_domestic'
    { value: 'INTERNATIONAL', label: 'International' }, // Key for translation: 'hotel.region_international'
];

export const BRANCH_OPTIONS = [
    { value: 'Main', label: 'Main' }, // Key for translation: 'hotel.branch_main'
    { value: 'Other', label: 'Other Branch' }, // Key for translation: 'hotel.branch_other'
];

export const MEALS_PLAN_OPTIONS = [
    { value: 'BB', label: 'Bed & Breakfast (BB)' }, // Key: 'hotel.meals_bb'
    { value: 'HB', label: 'Half Board (HB)' }, // Key: 'hotel.meals_hb'
    { value: 'FB', label: 'Full Board (FB)' }, // Key: 'hotel.meals_fb'
    { value: 'AI', label: 'All Inclusive (AI)' }, // Key: 'hotel.meals_ai'
    { value: 'RO', label: 'Room Only (RO)' }, // Key: 'hotel.meals_ro'
    { value: 'None', label: 'None' }, // Key: 'common.none'
];

export const SERVICE_TYPE_OPTIONS = Object.values(ServiceType).map(st => ({
    value: st,
    // Translation key like "services.type.Hotel", "services.type.Flight"
    label: `services.type.${st}` 
}));

export const BOOKING_CATEGORY_OPTIONS = [
    { value: BookingCategory.DOMESTIC, label: 'bookings.categoryDomestic' },
    { value: BookingCategory.INTERNATIONAL, label: 'bookings.categoryInternational' },
];
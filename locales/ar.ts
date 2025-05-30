// locales/ar.ts
const ar = {
  // Common
  "common.appName": "برنامج محاسبة السياحة برو",
  "common.appTitle": "برنامج محاسبة السياحة",
  "common.dashboard": "لوحة التحكم",
  "common.clients": "العملاء",
  "common.suppliers": "الموردون",
  "common.services": "نماذج الخدمات",
  "common.bookings": "الحجوزات",
  "common.employees": "الموظفون",
  "common.chartOfAccounts": "دليل الحسابات",
  "common.journalEntries": "قيود اليومية",
  "common.generalLedger": "دفتر الأستاذ العام",
  "common.trialBalance": "ميزان المراجعة",
  "common.payments": "المدفوعات",
  "common.collections": "المتحصلات",
  "common.reports": "التقارير",
  "common.users": "المستخدمون",
  "common.add_new": "إضافة جديد",
  "common.edit": "تعديل",
  "common.delete": "حذف",
  "common.save": "حفظ",
  "common.save_changes": "حفظ التغييرات",
  "common.cancel": "إلغاء",
  "common.view": "عرض",
  "common.actions": "الإجراءات",
  "common.search": "بحث...",
  "common.loading": "جاري التحميل...",
  "common.no_data_available": "لا توجد بيانات متاحة.",
  "common.confirm_delete_prompt": "هل أنت متأكد أنك تريد حذف هذا العنصر؟",
  "common.total_revenue": "إجمالي الإيرادات",
  "common.net_profit": "صافي الربح (بعد الضريبة)",
  "common.active_bookings": "الحجوزات النشطة",
  "common.total_clients": "إجمالي العملاء",
  "common.recent_transactions": "المعاملات الأخيرة",
  "common.monthly_sales_overview": "نظرة عامة على المبيعات الشهرية",
  "common.booking_status": "حالة الحجز",
  "common.date": "التاريخ",
  "common.type": "النوع",
  "common.party": "الطرف",
  "common.amount_aed": "المبلغ (درهم)",
  "common.description": "الوصف",
  "common.status": "الحالة",
  "common.name": "الاسم",
  "common.email": "البريد الإلكتروني",
  "common.phone": "الهاتف",
  "common.vat_number": "الرقم الضريبي",
  "common.address": "العنوان",
  "common.role": "الدور",
  "common.username": "اسم المستخدم",
  "common.full_name": "الاسم الكامل",
  "common.active": "نشط",
  "common.inactive": "غير نشط",
  "common.select_option_placeholder": "اختر خيارًا",
  "common.notes": "ملاحظات",
  "common.debit": "مدين",
  "common.credit": "دائن",
  "common.logout": "تسجيل الخروج",
  "common.profile": "الملف الشخصي",
  "common.settings": "الإعدادات",
  "common.admin_user": "مسؤول النظام",
  "common.na": "غير متاح",
  "common.none": "لا شيء",
  "common.unknown_client": "عميل غير معروف",
  "common.unknown_supplier": "مورد غير معروف",
  "common.unknown_account": "حساب غير معروف",
  "common.id_prefix": "معرف: ",
  "common.submit": "إرسال",
  "common.optional": "اختياري",
  "common.vatAmount": "مبلغ الضريبة",
  "common.financials": "البيانات المالية",
  "common.summary": "الملخص",
  "common.commissions": "العمولات",
  "common.reason": "السبب",
  "common.employee": "الموظف",
  "common.select_employee_placeholder": "اختر الموظف",
  "common.startDate": "تاريخ البدء",
  "common.endDate": "تاريخ الانتهاء",

  // Sidebar specific
  "sidebar.crm": "إدارة علاقات العملاء",
  "sidebar.accounting": "المحاسبة",
  "sidebar.transactions": "المعاملات",
  "sidebar.hr_management": "إدارة الموارد البشرية",
  "sidebar.footer_note": "© {{year}} تطبيق السياحة",

  // HR Module Specific
  "hr.departments": "الأقسام",
  "hr.jobTitles": "المسميات الوظيفية",
  "hr.department": "القسم",
  "hr.jobTitle": "المسمى الوظيفي",
  "hr.hireDate": "تاريخ التعيين",
  "hr.basicSalaryAed": "الراتب الأساسي (درهم)",
  "departments.pageTitle": "إدارة الأقسام",
  "departments.pageSubtitle": "تحديد وإدارة أقسام الشركة.",
  "departments.addNew": "إضافة قسم جديد",
  "departments.editDepartment": "تعديل القسم",
  "departments.addDepartment": "إضافة قسم",
  "departments.departmentName": "اسم القسم",
  "departments.confirmDelete": "هل أنت متأكد أنك تريد حذف هذا القسم؟ سيتعين إعادة تعيين الموظفين المعينين لهذا القسم.",
  "jobTitles.pageTitle": "إدارة المسميات الوظيفية",
  "jobTitles.pageSubtitle": "تحديد وإدارة المسميات الوظيفية داخل شركتك.",
  "jobTitles.addNew": "إضافة مسمى وظيفي جديد",
  "jobTitles.editJobTitle": "تعديل المسمى الوظيفي",
  "jobTitles.addJobTitle": "إضافة مسمى وظيفي",
  "jobTitles.jobTitleName": "اسم المسمى الوظيفي",
  "jobTitles.selectDepartment": "تعيين إلى قسم (اختياري)",
  "jobTitles.confirmDelete": "هل أنت متأكد أنك تريد حذف هذا المسمى الوظيفي؟ سيتعين إعادة تعيين الموظفين الذين لديهم هذا المسمى الوظيفي.",
  "hr.attendance": "الحضور",
  "hr.attendance_management": "إدارة الحضور",
  "hr.attendance_records": "سجلات الحضور",
  "hr.checkInTime": "وقت الحضور",
  "hr.checkOutTime": "وقت الانصراف",
  "hr.attendanceStatus": "حالة الحضور",
  "hr.status.Present": "حاضر",
  "hr.status.Absent": "غائب",
  "hr.status.Late": "متأخر",
  "hr.status.OnLeave": "في إجازة",
  "attendance.pageTitle": "سجلات الحضور",
  "attendance.pageSubtitle": "عرض وإدارة حضور الموظفين.",
  "attendance.addNew": "إضافة سجل حضور",
  "attendance.editRecord": "تعديل سجل الحضور",
  "attendance.addRecord": "إضافة سجل حضور",
  "attendance.select_status": "اختر الحالة",

  "hr.leave_management": "إدارة الإجازات",
  "hr.leaveTypes": "أنواع الإجازات",
  "hr.leaveRequests": "طلبات الإجازات",
  "leaveTypes.pageTitle": "إدارة أنواع الإجازات",
  "leaveTypes.pageSubtitle": "تحديد سياسات الإجازات للشركة.",
  "leaveTypes.addNew": "إضافة نوع إجازة جديد",
  "leaveTypes.editLeaveType": "تعديل نوع الإجازة",
  "leaveTypes.addLeaveType": "إضافة نوع إجازة",
  "leaveTypes.leaveTypeName": "اسم نوع الإجازة",
  "leaveTypes.defaultDaysAllowed": "الأيام المسموح بها افتراضيًا (اختياري)",
  "leaveTypes.confirmDelete": "هل أنت متأكد أنك تريد حذف نوع الإجازة هذا؟",

  "leaveRequests.pageTitle": "إدارة طلبات الإجازات",
  "leaveRequests.pageSubtitle": "مراجعة وإدارة طلبات إجازات الموظفين.",
  "leaveRequests.addNew": "تقديم طلب إجازة جديد",
  "leaveRequests.editLeaveRequest": "تعديل طلب الإجازة",
  "leaveRequests.addLeaveRequest": "تقديم طلب إجازة",
  "leaveRequests.leaveType": "نوع الإجازة",
  "leaveRequests.select_leave_type": "اختر نوع الإجازة",
  "leaveRequests.startDate": "تاريخ البدء",
  "leaveRequests.endDate": "تاريخ الانتهاء",
  "leaveRequests.requestDate": "تاريخ الطلب",
  "leaveRequests.approvedBy": "تمت الموافقة بواسطة",
  "leaveRequests.approvalDate": "تاريخ الموافقة",
  "leaveRequests.status.Pending": "قيد الانتظار",
  "leaveRequests.status.Approved": "تمت الموافقة",
  "leaveRequests.status.Rejected": "مرفوض",
  "leaveRequests.confirmDelete": "هل أنت متأكد أنك تريد حذف طلب الإجازة هذا؟",
  "leaveRequests.approve": "موافقة",
  "leaveRequests.reject": "رفض",

  "hr.penalties": "الجزاءات",
  "hr.penaltyTypes": "أنواع الجزاءات",
  "hr.employeePenalties": "جزاءات الموظفين",
  "penaltyTypes.pageTitle": "إدارة أنواع الجزاءات",
  "penaltyTypes.pageSubtitle": "تحديد قواعد الجزاءات للشركة.",
  "penaltyTypes.addNew": "إضافة نوع جزاء جديد",
  "penaltyTypes.editPenaltyType": "تعديل نوع الجزاء",
  "penaltyTypes.addPenaltyType": "إضافة نوع جزاء",
  "penaltyTypes.penaltyName": "اسم الجزاء",
  "penaltyTypes.deductionAmountAed": "مبلغ الخصم (درهم)",
  "penaltyTypes.deductionDays": "خصم (أيام)",
  "penaltyTypes.confirmDelete": "هل أنت متأكد أنك تريد حذف نوع الجزاء هذا؟",

  "employeePenalties.pageTitle": "إدارة جزاءات الموظفين",
  "employeePenalties.pageSubtitle": "تسجيل وتتبع الجزاءات الصادرة للموظفين.",
  "employeePenalties.addNew": "تسجيل جزاء جديد",
  "employeePenalties.editPenalty": "تعديل جزاء الموظف",
  "employeePenalties.addPenalty": "تسجيل جزاء الموظف",
  "employeePenalties.penaltyType": "نوع الجزاء",
  "employeePenalties.select_penalty_type": "اختر نوع الجزاء",
  "employeePenalties.penaltyDate": "تاريخ الجزاء",
  "employeePenalties.amountDeducted": "المبلغ المخصوم (درهم)",
  "employeePenalties.daysDeducted": "الأيام المخصومة",
  "employeePenalties.confirmDelete": "هل أنت متأكد أنك تريد حذف سجل جزاء الموظف هذا؟",

  "hr.payroll": "الرواتب",
  "hr.payrollPeriods": "فترات الرواتب",
  "hr.payslips": "كشوف المرتبات",
  "payrollPeriods.pageTitle": "إدارة فترات الرواتب",
  "payrollPeriods.pageSubtitle": "تحديد وإدارة فترات معالجة الرواتب.",
  "payrollPeriods.addNew": "إضافة فترة جديدة",
  "payrollPeriods.editPeriod": "تعديل الفترة",
  "payrollPeriods.addPeriod": "إضافة فترة",
  "payrollPeriods.periodName": "اسم الفترة (مثال: يوليو 2024)",
  "payrollPeriods.status": "الحالة",
  "payrollPeriods.status.Open": "مفتوحة",
  "payrollPeriods.status.Processing": "قيد المعالجة",
  "payrollPeriods.status.Closed": "مغلقة",
  "payrollPeriods.generatePayslips": "إنشاء كشوف المرتبات",
  "payrollPeriods.confirmDelete": "هل أنت متأكد أنك تريد حذف فترة الرواتب هذه؟ قد تتأثر كشوف المرتبات المرتبطة.",
  "payrollPeriods.payslipsGeneratedSuccess": "تم إنشاء كشوف المرتبات بنجاح لـ {{count}} موظف.",
  "payrollPeriods.payslipsGenerateFail": "فشل في إنشاء كشوف المرتبات لهذه الفترة.",
  "payrollPeriods.noEmployees": "لم يتم العثور على موظفين لإنشاء كشوف المرتبات.",

  "payslips.pageTitle": "كشوف مرتبات الموظفين",
  "payslips.pageSubtitle": "عرض وإدارة كشوف مرتبات الموظفين للفترات المعالجة.",
  "payslips.viewPayslip": "عرض كشف الراتب",
  "payslips.editPayslip": "تعديل تفاصيل كشف الراتب",
  "payslips.payslipFor": "كشف راتب لـ {{employeeName}} - {{periodName}}",
  "payslips.grossSalary": "إجمالي الراتب",
  "payslips.totalAdditions": "إجمالي الإضافات",
  "payslips.totalDeductions": "إجمالي الخصومات",
  "payslips.netSalary": "صافي الراتب",
  "payslips.status": "الحالة",
  "payslips.paymentDate": "تاريخ الدفع",
  "payslips.additions": "الإضافات",
  "payslips.deductions": "الخصومات",
  "payslips.itemDescription": "الوصف",
  "payslips.itemAmount": "المبلغ (درهم)",
  "payslips.itemType": "النوع",
  "payslips.itemType.Addition": "إضافة",
  "payslips.itemType.Deduction": "خصم",
  "payslips.addItem": "إضافة بند",
  "payslips.confirmPayment": "تأكيد الدفع",
  "payslips.markAsPaid": "وضع علامة كمدفوع",
  "payslips.status.Draft": "مسودة",
  "payslips.status.Calculated": "محسوب",
  "payslips.status.Confirmed": "مؤكد",
  "payslips.status.Paid": "مدفوع",
  "payslips.noPayslipsGenerated": "لم يتم إنشاء أي كشوف مرتبات لأي فترة حتى الآن.",
  "payslips.filterByPeriod": "تصفية حسب الفترة:",
  "payslips.filterByEmployee": "تصفية حسب الموظف:",
  "payslips.allPeriods": "جميع الفترات",
  "payslips.allEmployees": "جميع الموظفين",

  // Page specific
  "dashboard.welcome": "مرحباً بعودتك! إليك نظرة عامة على عملك.",
  "clients.pageTitle": "إدارة العملاء",
  "clients.pageSubtitle": "إدارة سجلات عملائك.",
  "clients.addNew": "إضافة عميل جديد",
  "clients.editClient": "تعديل العميل",
  "clients.addClient": "إضافة عميل",
  "clients.clientName": "اسم العميل",
  "suppliers.pageTitle": "إدارة الموردين",
  "suppliers.pageSubtitle": "إدارة سجلات مورديك.",
  "suppliers.addNew": "إضافة مورد جديد",
  "suppliers.editSupplier": "تعديل المورد",
  "suppliers.addSupplier": "إضافة مورد",
  "suppliers.supplierName": "اسم المورد",
  "suppliers.serviceType": "نوع الخدمة",
  "suppliers.contactEmail": "بريد الاتصال الإلكتروني",
  "suppliers.confirmDelete": "هل أنت متأكد أنك تريد حذف هذا المورد؟",
  "services.pageTitle": "نماذج الخدمات",
  "services.pageSubtitle": "إدارة نماذج الخدمات السياحية المتاحة.",
  "services.addNew": "إضافة نموذج جديد",
  "services.editService": "تعديل النموذج",
  "services.addService": "إضافة نموذج",
  "services.serviceName": "اسم النموذج",
  "services.defaultCostAed": "التكلفة الافتراضية (درهم)",
  "services.defaultPriceAed": "السعر الافتراضي (درهم)",
  "services.supplierOptional": "المورد (اختياري)",
  "services.select_supplier": "اختر موردًا",
  "services.confirmDelete": "هل أنت متأكد أنك تريد حذف نموذج الخدمة هذا؟",
  "services.type.Generic": "عام",
  "services.type.Hotel": "فندق",
  "services.type.Flight": "طيران",
  "services.type.Transfer": "انتقالات",
  "services.type.CarRental": "تأجير سيارات",
  "services.type.Visa": "تأشيرة",
  "services.type.TrainTicket": "تذاكر قطار",

  "employees.pageTitle": "إدارة الموظفين",
  "employees.pageSubtitle": "إدارة سجلات موظفيك وأقسامهم ومسمياتهم الوظيفية.",
  "employees.addNew": "إضافة موظف جديد",
  "employees.editEmployee": "تعديل الموظف",
  "employees.addEmployee": "إضافة موظف",
  "employees.rolePosition": "الدور / المنصب",
  "employees.confirmDelete": "هل أنت متأكد أنك تريد حذف هذا الموظف؟",
  "employees.select_department": "اختر القسم",
  "employees.select_job_title": "اختر المسمى الوظيفي",

  "bookings.pageTitle": "الحجوزات / الملفات السياحية",
  "bookings.pageSubtitle": "إدارة جميع الحجوزات والملفات السياحية.",
  "bookings.allBookings": "جميع الحجوزات",
  "bookings.allBookingsPageTitle": "نظرة عامة على جميع الحجوزات",
  "bookings.allBookingsPageSubtitle": "عرض وإدارة جميع الملفات السياحية.",
  "bookings.hotelBookingsPageTitle": "حجوزات الفنادق",
  "bookings.hotelBookingsPageSubtitle": "إدارة حجوزات وملفات الفنادق.",
  "bookings.flightBookingsPageTitle": "حجوزات الطيران",
  "bookings.flightBookingsPageSubtitle": "إدارة حجوزات الطيران.",
  "bookings.transferBookingsPageTitle": "حجوزات الانتقالات",
  "bookings.transferBookingsPageSubtitle": "إدارة حجوزات الانتقالات.",
  "bookings.carRentalBookingsPageTitle": "حجوزات تأجير السيارات",
  "bookings.carRentalBookingsPageSubtitle": "إدارة حجوزات تأجير السيارات.",
  "bookings.visaBookingsPageTitle": "طلبات التأشيرات",
  "bookings.visaBookingsPageSubtitle": "إدارة طلبات التأشيرات.",
  "bookings.trainTicketBookingsPageTitle": "حجوزات تذاكر القطار",
  "bookings.trainTicketBookingsPageSubtitle": "إدارة حجوزات تذاكر القطار.",
  "bookings.addNewHotelBooking": "حجز فندقي جديد",
  "bookings.addNewFlightBooking": "حجز طيران جديد",
  "bookings.addNewTransferBooking": "حجز انتقالات جديد",
  "bookings.addNewCarRentalBooking": "تأجير سيارة جديد",
  "bookings.addNewVisa": "طلب تأشيرة جديد",
  "bookings.addNewTrainTicket": "تذكرة قطار جديدة",
  "bookings.addNew": "إنشاء ملف حجز جديد",
  "bookings.editBooking": "تعديل ملف الحجز",
  "bookings.createBooking": "إنشاء ملف الحجز",
  "bookings.fileNumber": "رقم الملف",
  "bookings.bookingDate": "تاريخ الحجز",
  "bookings.client": "العميل",
  "bookings.select_client": "اختر العميل",
  "bookings.employeeSalesAgent": "الموظف (مندوب المبيعات)",
  "bookings.customerServiceEmployee": "موظف خدمة العملاء",
  "bookings.select_employee": "اختر الموظف",
  "bookings.bookingStatus": "حالة الحجز",
  "bookings.bookingCategory": "فئة الحجز",
  "bookings.categoryDomestic": "محلي",
  "bookings.categoryInternational": "دولي",
  "bookings.select_booking_category": "اختر فئة الحجز",
  "bookings.employeeCommissionPercentage": "نسبة عمولة الموظف %",
  "bookings.customerServiceCommissionPercentage": "نسبة عمولة خ.العملاء %",
  "bookings.totalPrice": "السعر الإجمالي (للعميل)",
  "bookings.netProfit": "صافي الربح (بعد الضريبة)",
  "bookings.commission": "العمولة",
  "bookings.services": "الخدمات في الملف",
  "bookings.add_service_item": "إضافة بند خدمة",
  "bookings.remove_service_item": "إزالة",
  "bookings.select_service_to_add": "اختر نموذج خدمة للإضافة",
  "bookings.addServicePrompt": "إضافة خدمة للملف",
  "bookings.serviceType": "نوع الخدمة",
  "bookings.selectServiceType": "اختر نوع الخدمة",
  "bookings.editServiceDetails": "تعديل التفاصيل",
  "bookings.totalCost": "إجمالي التكلفة",
  "bookings.totalPriceLabel": "إجمالي السعر (للعميل)",
  "bookings.netProfitLabel": "صافي الربح (بعد الضريبة)",
  "bookings.empCommissionLabel": "عمولة الموظف",
  "bookings.csCommissionLabel": "عمولة خ.ع",
  "bookings.vatAmountLabel": "مبلغ الضريبة",
  "bookings.qty": "الكمية",
  "bookings.cost": "التكلفة",
  "bookings.price": "السعر (للعميل)",
  "bookings.pending": "قيد الانتظار",
  "bookings.confirmed": "مؤكد",
  "bookings.cancelled": "ملغى",
  "bookings.completed": "مكتمل",
  "bookings.generateInvoice": "إنشاء فاتورة",

  "chartOfAccounts.pageTitle": "دليل الحسابات",
  "chartOfAccounts.pageSubtitle": "إدارة الحسابات المالية لشركتك.",
  "chartOfAccounts.addNew": "إضافة حساب جديد",
  "chartOfAccounts.editAccount": "تعديل الحساب",
  "chartOfAccounts.addAccount": "إضافة حساب",
  "chartOfAccounts.accountCode": "رمز الحساب",
  "chartOfAccounts.accountName": "اسم الحساب",
  "chartOfAccounts.accountType": "نوع الحساب",
  "chartOfAccounts.controlAccount": "حساب مراقبة",
  "chartOfAccounts.balanceAed": "الرصيد (درهم)",
  "chartOfAccounts.isControlAccount": "هل هو حساب مراقبة؟",
  "chartOfAccounts.subsidiaryLedgerName": "اسم دفتر الأستاذ المساعد (مثال: العملاء، الموردون)",

  "journalEntries.pageTitle": "قيود اليومية",
  "journalEntries.pageSubtitle": "تسجيل وعرض قيود اليومية المحاسبية.",
  "journalEntries.addNew": "إنشاء قيد يدوي",
  "journalEntries.viewEntryTitle": "عرض قيد اليومية: {{id}}",
  "journalEntries.createEntryTitle": "إنشاء قيد يدوي",
  "journalEntries.referenceId": "المعرف المرجعي",
  "journalEntries.totalDebit": "إجمالي المدين",
  "journalEntries.totalCredit": "إجمالي الدائن",
  "journalEntries.autoType": "آلي",
  "journalEntries.manualType": "يدوي",
  "journalEntries.details": "التفاصيل:",
  "journalEntries.account": "الحساب",
  "journalEntries.debitAed": "مدين (درهم)",
  "journalEntries.creditAed": "دائن (درهم)",
  "journalEntries.totals": "الإجماليات:",
  "journalEntries.referenceIdOptional": "المعرف المرجعي (اختياري)",
  "journalEntries.entryDetails": "تفاصيل القيد",
  "journalEntries.select_account": "اختر الحساب",
  "journalEntries.addRow": "إضافة صف",
  "journalEntries.debits": "المدينون:",
  "journalEntries.credits": "الدائنون:",
  "journalEntries.balance_error": "يجب أن يتوازن المدينون والدائنون.",
  "journalEntries.save_entry": "حفظ القيد",
  "journalEntries.all_lines_need_account": "يجب اختيار حساب لجميع بنود القيد.",

  "ledger.pageTitle": "دفتر الأستاذ العام",
  "ledger.pageSubtitle": "عرض سجل المعاملات التفصيلي لحساب محدد.",
  "ledger.selectAccount": "اختر الحساب",
  "ledger.ledgerFor": "دفتر أستاذ لـ: {{accountName}} ({{accountCode}})",
  "ledger.jeRef": "مرجع ق.ي",
  "ledger.balanceAed": "الرصيد (درهم)",
  "ledger.endingBalance": "الرصيد الختامي:",
  "ledger.no_transactions_found": "لم يتم العثور على معاملات لهذا الحساب.",

  "trialBalance.pageTitle": "ميزان المراجعة",
  "trialBalance.pageSubtitle": "حتى تاريخ {{date}}",
  "trialBalance.code": "الرمز",
  "trialBalance.accountName": "اسم الحساب",
  "trialBalance.totals": "الإجماليات:",
  "trialBalance.warning_mismatch": "تحذير: المدينون والدائنون غير متطابقين! الفرق: درهم {{difference}}",
  "trialBalance.no_balances_to_display": "لا توجد أرصدة حسابات لعرضها.",
  "trialBalance.note_simplified": "ميزان المراجعة هذا مبسط ويفترض أرصدة افتتاحية صفرية لجميع الحسابات. سيتضمن نظام الإنتاج أرصدة افتتاحية وحسابات رصيد أكثر تطورًا.",
  "trialBalance.reportDesc": "تحقق من رصيد جميع الحسابات للتأكد من أن المدين يساوي الدائن.",

  "payments.pageTitle": "المدفوعات",
  "payments.pageSubtitle": "تسجيل وإدارة المدفوعات للموردين.",
  "payments.addNew": "تسجيل دفعة جديدة",
  "payments.editPayment": "تعديل الدفعة",
  "payments.recordPayment": "تسجيل دفعة",
  "payments.paymentDate": "تاريخ الدفعة",
  "payments.supplier": "المورد",
  "payments.select_supplier": "اختر المورد",
  "payments.paymentMethod": "طريقة الدفع",
  "payments.referenceNumber": "الرقم المرجعي (مثال: رقم الشيك، معرف المعاملة)",
  "payments.referenceNumberShort": "رقم المرجع",
  "payments.relatedBookingOptional": "الحجز المرتبط (اختياري)",
  "payments.select_booking": "اختر الحجز",
  "payments.method.bank_transfer": "تحويل بنكي",
  "payments.method.cash": "نقداً",
  "payments.method.cheque": "شيك",
  "payments.method.credit_card": "بطاقة ائتمان",
  "payments.method.online_payment": "دفع عبر الإنترنت",

  "collections.pageTitle": "المتحصلات",
  "collections.pageSubtitle": "تسجيل وإدارة المدفوعات المستلمة من العملاء.",
  "collections.addNew": "تسجيل تحصيل جديد",
  "collections.editCollection": "تعديل التحصيل",
  "collections.recordCollection": "تسجيل التحصيل",
  "collections.collectionDate": "تاريخ التحصيل",
  "collections.client": "العميل",
  "collections.select_client": "اختر العميل",

  "reports.pageTitle": "التقارير المالية",
  "reports.pageSubtitle": "الوصول إلى مختلف التقارير المحاسبية والإدارية.",
  "reports.profit_loss_title": "بيان الأرباح والخسائر",
  "reports.profit_loss_desc": "تحليل الأداء المالي لشركتك خلال فترة.",
  "reports.balance_sheet_title": "الميزانية العمومية",
  "reports.balance_sheet_desc": "احصل على لمحة سريعة عن أصول شركتك وخصومها وحقوق الملكية.",
  "reports.commission_report_title": "تقرير عمولات الموظفين",
  "reports.commission_report_desc": "تتبع العمولات المكتسبة من قبل موظفي المبيعات.",
  "reports.vat_report_title": "تقرير ضريبة القيمة المضافة (الإمارات)",
  "reports.vat_report_desc": "إنشاء ملخص لأغراض الإقرار الضريبي.",
  "reports.view_report_link": "عرض التقرير ←",
  "reports.note_placeholder_title": "ملاحظة:",
  "reports.note_placeholder": "بعض التقارير مثل بيان الأرباح والخسائر والميزانية العمومية وتقارير ضريبة القيمة المضافة التفصيلية هي عناصر نائبة وتتطلب مزيدًا من التنفيذ للمنطق المحاسبي المعقد وتجميع البيانات.",

  "users.pageTitle": "إدارة المستخدمين",
  "users.pageSubtitle": "إدارة مستخدمي التطبيق وأدوارهم.",
  "users.addNew": "إضافة مستخدم جديد",
  "users.editUser": "تعديل المستخدم",
  "users.addUser": "إضافة مستخدم",
  "users.activeUser": "مستخدم نشط",
  "users.roleAdmin": "مدير",
  "users.roleAccountant": "محاسب",
  "users.roleSalesAgent": "مندوب مبيعات",
  "users.roleManager": "مدير",

  // Hotel Service Form related
  "hotel.detailsTitle": "معلومات خدمة الفندق",
  "hotel.voucherNumber": "رقم القسيمة",
  "hotel.country": "الدولة",
  "hotel.city": "المدينة",
  "hotel.hotelName": "اسم الفندق",
  "hotel.region": "المنطقة (الخاصة بالفندق)",
  "hotel.region_domestic": "محلي",
  "hotel.region_international": "دولي",
  "hotel.pnr": "PNR",
  "hotel.originCountry": "بلد المصدر",
  "hotel.gds": "نظام التوزيع العالمي",
  "hotel.gds_Amadeus": "أمايدوس",
  "hotel.gds_Sabre": "سيبر",
  "hotel.gds_Galileo": "جاليليو",
  "hotel.gds_Worldspan": "وورلد سبان",
  "hotel.gds_other": "آخر",
  "hotel.issuingStaff": "موظف الإصدار",
  "hotel.bookingStaff": "موظف الحجز",
  "hotel.issueDate": "تاريخ الإصدار",
  "hotel.supplierConfNo": "رقم تأكيد المورد",
  "hotel.hotelConfNo": "رقم تأكيد الفندق",
  "hotel.roomType": "نوع الغرفة",
  "hotel.checkInDate": "تاريخ الوصول",
  "hotel.checkOutDate": "تاريخ المغادرة",
  "hotel.branch": "الفرع",
  "hotel.branch_main": "رئيسي",
  "hotel.branch_other": "فرع آخر",
  "hotel.ratePerNight": "السعر لليلة",
  "hotel.mealsPlan": "نظام الوجبات",
  "hotel.meals_bb": "إفطار فقط (BB)",
  "hotel.meals_hb": "نصف إقامة (HB)",
  "hotel.meals_fb": "إقامة كاملة (FB)",
  "hotel.meals_ai": "شامل كليًا (AI)",
  "hotel.meals_ro": "غرفة فقط (RO)",
  "hotel.noOfAdults": "عدد البالغين",
  "hotel.noOfChildren": "عدد الأطفال",
  "hotel.noOfRooms": "عدد الغرف",
  "hotel.noOfNights": "عدد الليالي",
  "hotel.guests": "النزلاء",
  "hotel.bookingDetails": "تفاصيل الحجز / ملاحظات",
  "hotel.additionalReference": "مرجع إضافي",
  "hotel.couponRemark": "ملاحظة القسيمة",
  "hotel.customerEmpNo": "رقم موظف العميل",
  "hotel.termsAndConditions": "تم تطبيق الشروط والأحكام",
  "hotel.pickUp": "يشمل الاستقبال",
  "hotel.dropOff": "يشمل التوديع",
  "hotel.saveHotelDetails": "حفظ تفاصيل الفندق",

  // Invoice Page related
  "invoice.pageTitle": "فاتورة",
  "invoice.invoice": "فاتورة",
  "invoice.invoiceTo": "فاتورة إلى:",
  "invoice.invoiceNumber": "رقم الفاتورة:",
  "invoice.bookingFile": "ملف الحجز رقم:",
  "invoice.dateOfIssue": "تاريخ الإصدار:",
  "invoice.vatRate": "ضريبة القيمة المضافة ({{rate}}٪)",
  "invoice.subtotal": "المجموع الفرعي",
  "invoice.grandTotal": "المجموع الكلي",
  "invoice.thankYou": "شكرا لتعاملكم معنا!",
  "invoice.printInvoice": "طباعة الفاتورة",
  "invoice.companyName": "اسم شركتك ذ.م.م",
  "invoice.companyAddress": "123 الخليج التجاري، دبي، الإمارات",
  "invoice.companyVat": "الرقم الضريبي: 1000000000"
};

export default ar;

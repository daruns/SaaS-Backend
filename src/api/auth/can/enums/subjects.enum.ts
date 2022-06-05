export enum Subjects {
    MasterAllowed = 'master_allowed',
    OwnerAllowed = 'owner_allowed',
    EveryoneAllowed = 'everyone_allowed',
    users = 'subject_users',
    permissions = 'subject_permissions',
    userBrands = 'subject_user_brands',
    userBrandNoClients = 'subject_user_brand_no_clients',
    userBrandClients = 'subject_users_brand_clients',
    crm = 'subject_crm',
    crmClientContacts = 'subject_crm_client_contacts',
    crmSocialMedias = 'subject_crm_social_medias',
    crmUsers = 'subject_crm_users',
    crmMeetings = 'subject_crm_meetings',
    financeInvoices = 'subject_finance_invoices',
    financeQuotes = 'subject_finance_quotes',
    financeExpenses = 'subject_finance_expenses',
    financeExpensesCategories = 'subject_finance_expense_categories',
    financeJoinedItems = 'subject_finance_joined_items',
    financeNonInventoryItems = 'subject_finance_non_inventory_items',
    financeServiceItems = 'subject_finance_service_items',
    financeJoinedExpenseCategories = 'subject_finance_joined_expense_categories',
    financeExpensesCategoryChilds = 'subject_finance_expense_category_childs',
    financePaymentMethods = 'subject_finance_payment_methods',
    financeSubServiceItems = 'subject_finance_sub_service_items',
    financeTaxes = 'subject_finance_taxes',
    suppliers = 'subject_suppliers',
    socialMediaStudios = 'subject_social_media_studios',
    hrmOverTimes = 'subject_hrm_overtimes',
    hrmOverTimeTypes = 'subject_hrm_overtime_types',
    hrmLeaveTypes = 'subject_hrm_leave_types',
    hrmLeaves = 'subject_hrm_leaves',
    hrmAttendances = 'subject_hrm_attendances',
    hrmEmployees = 'subject_hrm_employees',
    hrmDepartments = 'subject_hrm_departments',
    hrmDesignations = 'subject_hrm_designations',
    projects = 'subject_projects',
    projectsTasks = 'subject_projects_tasks',
    payrollPayslips = 'subject_payroll_payslips',
    payrollDeductionTypes = 'subject_payroll_deduction_types',
    payrollDeductions = 'subject_payroll_deductions',
    payrollEarnings = 'subject_payroll_earnings',
    payrollEarningTypes = 'subject_payroll_earning_types',
}
export const SubjectsDto = Object.values(Subjects)

// // TODO: we should not return the value that matches in db for security reasons
// export const SubjectsDto = [...getSubjectsDto()]

// function getSubjectsDto(): string[] {
//   const copSubjects = {...Subjects}
//   delete copSubjects.MasterAllowed
//   delete copSubjects.OwnerAllowed
//   return Object.keys(copSubjects)
// }
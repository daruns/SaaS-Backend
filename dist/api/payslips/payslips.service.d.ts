import { LeaveModel } from 'src/database/models/leave.model';
import { PayslipModel } from 'src/database/models/payslip.model';
import { EmployeeModel } from 'src/database/models/employee.model';
import { OvertimeModel } from 'src/database/models/overtime.model';
import { EarningModel } from 'src/database/models/earning.model';
import { DeductionModel } from 'src/database/models/deduction.model';
import { ModelClass } from 'objection';
import { CreatePayslipDto } from './dto/create-payslip.dto';
import { PayslipEarningModel } from 'src/database/models/payslipEarning.model';
import { PayslipDeductionModel } from 'src/database/models/payslipDeduction.model';
import { ResponseData } from 'src/app/app.service';
export declare class PayslipsService {
    private modelClass;
    private employeeClass;
    private leavesClass;
    private overtimeClass;
    private earningClass;
    private deductionClass;
    private payslipEarningClass;
    private payslipDeductionClass;
    constructor(modelClass: ModelClass<PayslipModel>, employeeClass: ModelClass<EmployeeModel>, leavesClass: ModelClass<LeaveModel>, overtimeClass: ModelClass<OvertimeModel>, earningClass: ModelClass<EarningModel>, deductionClass: ModelClass<DeductionModel>, payslipEarningClass: ModelClass<PayslipEarningModel>, payslipDeductionClass: ModelClass<PayslipDeductionModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreatePayslipDto, currentUser: any): Promise<ResponseData>;
    deleteById(payslipId: number, currentUser: any): Promise<ResponseData>;
}

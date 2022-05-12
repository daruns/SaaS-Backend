import { DeductionModel } from 'src/database/models/deduction.model';
import { ModelClass } from 'objection';
import { ResponseData } from 'src/app/app.service';
import DeductionTypeModel from 'src/database/models/deductionType.model';
import EmployeeModel from 'src/database/models/employee.model';
export declare class DeductionsService {
    private modelClass;
    private deductionTypeClass;
    private employeeClass;
    constructor(modelClass: ModelClass<DeductionModel>, deductionTypeClass: ModelClass<DeductionTypeModel>, employeeClass: ModelClass<EmployeeModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(deductionId: number, currentUser: any): Promise<ResponseData>;
}

import { EarningModel } from 'src/database/models/earning.model';
import { ModelClass } from 'objection';
import { EmployeesService } from '../employees/employees.service';
import { EarningTypesService } from '../earningTypes/earningTypes.service';
import { ResponseData } from 'src/app/app.service';
export declare class EarningsService {
    private modelClass;
    private employeeSerive;
    private earningTypeSerive;
    constructor(modelClass: ModelClass<EarningModel>, employeeSerive: EmployeesService, earningTypeSerive: EarningTypesService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(earningId: number, currentUser: any): Promise<ResponseData>;
}

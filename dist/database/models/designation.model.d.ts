import { BaseModel } from './base.model';
import DepartmentModel from './department.model';
export declare class DesignationModel extends BaseModel {
    static tableName: string;
    name: string;
    departmentName: string;
    departmentId: number;
    brandCode: string;
    department: DepartmentModel;
    static relationMappings: {
        department: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default DesignationModel;

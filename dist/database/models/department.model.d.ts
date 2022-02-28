import { BaseModel } from './base.model';
import DesignationModel from './designation.model';
export declare class DepartmentModel extends BaseModel {
    static tableName: string;
    name: string;
    brandCode: string;
    designations: DesignationModel[];
    static relationMappings: {
        designations: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default DepartmentModel;

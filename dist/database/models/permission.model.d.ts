import { BaseModel } from './base.model';
import { UserModel } from './user.model';
export declare class PermissionModel extends BaseModel {
    static tableName: string;
    subject: string;
    action: string;
    userId: number;
    brandCode: string;
    createdBy: string;
    user: UserModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default PermissionModel;

import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { RoleModel } from './role.model';
export declare class PermissionModel extends BaseModel {
    static tableName: string;
    subject: string;
    action: string;
    resource: string;
    weight: number;
    userId: number;
    roleId: number;
    user: UserModel;
    role: RoleModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        role: {
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

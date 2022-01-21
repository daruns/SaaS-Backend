import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { PermissionModel } from './permission.model';
import { UserRoleModel } from './userRole.model';
export declare class RoleModel extends BaseModel {
    static tableName: string;
    name: string;
    users: UserModel;
    permissions: PermissionModel[];
    userRoles: UserRoleModel[];
    static relationMappings: {
        users: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                through: {
                    from: string;
                    to: string;
                };
                to: string;
            };
        };
        userRoles: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        permissions: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default RoleModel;

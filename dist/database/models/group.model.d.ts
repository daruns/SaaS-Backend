import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { PermissionModel } from './permission.model';
export declare class GroupModel extends BaseModel {
    static tableName: string;
    name: string;
    group: string;
    userId: number;
    user: UserModel;
    permissions: PermissionModel[];
    static relationMappings: {
        user: {
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

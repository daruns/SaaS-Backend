import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { GroupModel } from './group.model';
export declare class PermissionModel extends BaseModel {
    static tableName: string;
    subject: string;
    action: string;
    resource: string;
    weight: number;
    userId: number;
    groupId: number;
    user: UserModel;
    group: GroupModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        group: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}

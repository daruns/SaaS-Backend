import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
import { GroupModel } from './group.model';
import { PermissionModel } from './permission.model';
export declare class UserModel extends BaseModel {
    static tableName: string;
    username: string;
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    website: string;
    subdomain: string;
    avatar: string;
    userType: string;
    department: string;
    reportsTo: string;
    clients: ClientModel[];
    groups: GroupModel[];
    permissions: PermissionModel[];
    static relationMappings: {
        clients: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        groups: {
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

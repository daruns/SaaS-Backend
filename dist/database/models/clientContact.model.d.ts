import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
export declare class ClientContactModel extends BaseModel {
    static tableName: string;
    name: string;
    position: string;
    businessPhoneNumber1: string;
    businessPhoneNumber2: string;
    email: string;
    description: string;
    department: string;
    clientId: number;
    client: ClientModel;
    static relationMappings: {
        client: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}

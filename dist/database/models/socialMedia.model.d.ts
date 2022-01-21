import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
export declare class SocialMediaModel extends BaseModel {
    static tableName: string;
    name: string;
    linkAddress: string;
    addressDomain: string;
    clientId: number;
    brandCode: string;
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
export default SocialMediaModel;

import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
export declare class MeetingModel extends BaseModel {
    static tableName: string;
    date: Date;
    duration: number;
    type: string;
    details: string;
    serviceRequirements: string;
    nextMeetingDate: Date;
    currentServiceProvider: string;
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
export default MeetingModel;

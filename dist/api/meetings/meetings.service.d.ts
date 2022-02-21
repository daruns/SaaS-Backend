import { MeetingModel } from 'src/database/models/meeting.model';
import { ModelClass } from 'objection';
import { ClientsService } from '../clients/clients.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class MeetingsService {
    private modelClass;
    private clientSerive;
    constructor(modelClass: ModelClass<MeetingModel>, clientSerive: ClientsService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(meetingId: number, currentUser: any): Promise<ResponseData>;
}

import { ClientContactModel } from 'src/database/models/clientContact.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ClientContactsService {
    private modelClass;
    constructor(modelClass: ModelClass<ClientContactModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(clientContactId: number, currentUser: any): Promise<ResponseData>;
}

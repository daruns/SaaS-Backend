import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ClientsService {
    private modelClass;
    constructor(modelClass: ModelClass<ClientModel>);
    findAll(): Promise<ResponseData>;
    findById(id: number): Promise<ResponseData>;
    create(payload: any): Promise<{
        success: boolean;
        message: string;
        data: ClientModel;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
    update(payload: any): Promise<ResponseData>;
    deleteById(clientId: number): Promise<ResponseData>;
}

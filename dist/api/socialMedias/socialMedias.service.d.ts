import { SocialMediaModel } from 'src/database/models/socialMedia.model';
import { ModelClass } from 'objection';
import { ClientsService } from '../clients/clients.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class SocialMediasService {
    private modelClass;
    private clientSerive;
    constructor(modelClass: ModelClass<SocialMediaModel>, clientSerive: ClientsService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(socialMediaId: number, currentUser: any): Promise<ResponseData>;
}

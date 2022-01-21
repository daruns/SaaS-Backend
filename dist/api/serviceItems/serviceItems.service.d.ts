import { ServiceItemModel } from 'src/database/models/serviceItem.model';
import { ModelClass } from 'objection';
import { CreateServiceItemDto } from './dto/create-serviceItem.dto';
import { UpdateServiceItemDto } from './dto/update-serviceItem.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ServiceItemsService {
    private modelClass;
    constructor(modelClass: ModelClass<ServiceItemModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateServiceItemDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateServiceItemDto, currentUser: any): Promise<ResponseData>;
    deleteById(serviceItemId: number, currentUser: any): Promise<ResponseData>;
}

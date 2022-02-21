import { PaymentMethodModel } from 'src/database/models/paymentMethod.model';
import { ModelClass } from 'objection';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class PaymentMethodsService {
    private modelClass;
    constructor(modelClass: ModelClass<PaymentMethodModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreatePaymentMethodDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdatePaymentMethodDto, currentUser: any): Promise<ResponseData>;
    deleteById(paymentMethodId: number, currentUser: any): Promise<ResponseData>;
}

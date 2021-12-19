import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';
import { PaymentMethodsService } from './paymentMethods.service';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
export declare class PaymentMethodsController {
    private readonly paymentMethodsService;
    constructor(paymentMethodsService: PaymentMethodsService);
    findAll(req: any): Promise<import("./paymentMethods.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./paymentMethods.service").ResponseData>;
    create(paymentMethod: CreatePaymentMethodDto, req: any): Promise<import("./paymentMethods.service").ResponseData>;
    update(payload: UpdatePaymentMethodDto, req: any): Promise<import("./paymentMethods.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./paymentMethods.service").ResponseData>;
}

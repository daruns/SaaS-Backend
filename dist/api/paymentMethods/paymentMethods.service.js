"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const paymentMethod_model_1 = require("../../database/models/paymentMethod.model");
let PaymentMethodsService = class PaymentMethodsService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const paymentMethods = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'PaymentMethods details fetch successfully.',
            data: paymentMethods,
        };
    }
    async findById(id, currentUser) {
        const CUser = currentUser;
        const paymentMethod = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (paymentMethod) {
            return {
                success: true,
                message: 'PaymentMethod details fetch successfully.',
                data: paymentMethod,
            };
        }
        else {
            return {
                success: false,
                message: 'No paymentMethod details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const CUser = currentUser;
        const paymentMethodPayload = payload;
        const newPaymentMethod = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: paymentMethodPayload.name
        });
        if (!newPaymentMethod) {
            paymentMethodPayload['createdBy'] = currentUser.username;
            paymentMethodPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(paymentMethodPayload);
            const createPaymentMethod = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'PaymentMethod created successfully.',
                data: createPaymentMethod,
            };
        }
        else {
            return {
                success: false,
                message: 'PaymentMethod already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const CUser = currentUser;
        const paymentMethodPayload = payload;
        const paymentMethod = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(paymentMethodPayload.id);
        if (paymentMethod) {
            const updatedPaymentMethod = await this.modelClass
                .query()
                .update({
                name: paymentMethodPayload.name ? paymentMethodPayload.name : paymentMethod.name,
                type: paymentMethodPayload.type ? paymentMethodPayload.type : paymentMethod.type,
                description: paymentMethodPayload.description ? paymentMethodPayload.description : paymentMethod.description,
                expireDate: paymentMethodPayload.expireDate ? paymentMethodPayload.expireDate : paymentMethod.expireDate,
                pin: paymentMethodPayload.pin ? paymentMethodPayload.pin : paymentMethod.pin,
                cvs: paymentMethodPayload.cvs ? paymentMethodPayload.cvs : paymentMethod.cvs,
                status: paymentMethodPayload.status ? paymentMethodPayload.status : paymentMethod.status,
                updatedBy: currentUser.username,
            })
                .where({ id: paymentMethodPayload.id });
            return {
                success: true,
                message: 'PaymentMethod details updated successfully.',
                data: updatedPaymentMethod,
            };
        }
        else {
            return {
                success: false,
                message: 'No paymentMethod found.',
                data: {},
            };
        }
    }
    async deleteById(paymentMethodId, currentUser) {
        const CUser = currentUser;
        const paymentMethods = await this.modelClass.query()
            .where({
            brandCode: CUser.brandCode,
            id: paymentMethodId
        })
            .delete();
        if (paymentMethods) {
            return {
                success: true,
                message: 'PaymentMethod deleted successfully.',
                data: paymentMethods,
            };
        }
        else {
            return {
                success: false,
                message: 'No paymentMethod found.',
                data: {},
            };
        }
    }
};
PaymentMethodsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PaymentMethodModel')),
    __metadata("design:paramtypes", [Object])
], PaymentMethodsService);
exports.PaymentMethodsService = PaymentMethodsService;
//# sourceMappingURL=paymentMethods.service.js.map
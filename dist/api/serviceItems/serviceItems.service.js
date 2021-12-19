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
const serviceItem_model_1 = require("../../database/models/serviceItem.model");
let ServiceItemsService = class ServiceItemsService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const serviceItems = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'InventoryItem details fetch successfully.',
            data: serviceItems,
        };
    }
    async findById(id, currentUser) {
        const CUser = currentUser;
        const serviceItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (serviceItem) {
            return {
                success: true,
                message: 'ServiceItem details fetch successfully.',
                data: serviceItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No serviceItem details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const CUser = currentUser;
        const serviceItemPayload = payload;
        const newServiceItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: serviceItemPayload.name
        });
        if (!newServiceItem) {
            serviceItemPayload['createdBy'] = currentUser.username;
            serviceItemPayload['brandCode'] = currentUser.brandCode;
            serviceItemPayload['qty'] = 1;
            const identifiers = await this.modelClass.query().insert(serviceItemPayload);
            const createServiceItem = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'ServiceItem created successfully.',
                data: createServiceItem,
            };
        }
        else {
            return {
                success: false,
                message: 'ServiceItem already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const CUser = currentUser;
        const serviceItemPayload = payload;
        const serviceItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(serviceItemPayload.id);
        if (serviceItem) {
            const updatedServiceItem = await this.modelClass
                .query()
                .update({
                name: serviceItemPayload.name ? serviceItemPayload.name : serviceItem.name,
                description: serviceItemPayload.description ? serviceItemPayload.description : serviceItem.description,
                unitPrice: serviceItemPayload.unitPrice ? serviceItemPayload.unitPrice : serviceItem.unitPrice,
                purchasedAt: serviceItemPayload.purchasedAt ? serviceItemPayload.purchasedAt : serviceItem.purchasedAt,
                expireDate: serviceItemPayload.expireDate ? serviceItemPayload.expireDate : serviceItem.expireDate,
                supplier: serviceItemPayload.supplier ? serviceItemPayload.supplier : serviceItem.supplier,
                updatedBy: currentUser.username,
            })
                .where({ id: serviceItemPayload.id });
            return {
                success: true,
                message: 'ServiceItem details updated successfully.',
                data: updatedServiceItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No serviceItem found.',
                data: {},
            };
        }
    }
    async deleteById(serviceItemId, currentUser) {
        const CUser = currentUser;
        const serviceItems = await this.modelClass.query()
            .where({
            brandCode: CUser.brandCode,
            id: serviceItemId
        })
            .delete();
        if (serviceItems) {
            return {
                success: true,
                message: 'ServiceItem deleted successfully.',
                data: serviceItems,
            };
        }
        else {
            return {
                success: false,
                message: 'No serviceItem found.',
                data: {},
            };
        }
    }
};
ServiceItemsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ServiceItemModel')),
    __metadata("design:paramtypes", [Object])
], ServiceItemsService);
exports.ServiceItemsService = ServiceItemsService;
//# sourceMappingURL=serviceItems.service.js.map
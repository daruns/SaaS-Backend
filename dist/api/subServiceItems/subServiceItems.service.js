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
exports.SubServiceItemsService = void 0;
const common_1 = require("@nestjs/common");
const serviceItems_service_1 = require("../serviceItems/serviceItems.service");
let SubServiceItemsService = class SubServiceItemsService {
    constructor(modelClass, serviceItemService) {
        this.modelClass = modelClass;
        this.serviceItemService = serviceItemService;
    }
    async findAll(currentUser) {
        const subServiceItems = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'SubServices details fetch successfully.',
            data: subServiceItems,
        };
    }
    async findById(id, currentUser) {
        const subServiceItem = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (subServiceItem) {
            return {
                success: true,
                message: 'ServiceItem details fetch successfully.',
                data: subServiceItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No subServiceItem details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const subServiceItemPayload = payload;
        const newServiceItem = await this.modelClass.query()
            .findOne({
            brandCode: currentUser.brandCode,
            name: subServiceItemPayload.name
        });
        if (!newServiceItem) {
            if (subServiceItemPayload.serviceItemId) {
                const clientFnd = await this.serviceItemService.findById(subServiceItemPayload.serviceItemId, currentUser);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'ServiceItem doesnt exist.',
                        data: {},
                    };
                }
            }
            subServiceItemPayload.createdBy = currentUser.username;
            subServiceItemPayload.brandCode = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(subServiceItemPayload);
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
        const subServiceItemPayload = payload;
        const subServiceItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(subServiceItemPayload.id);
        if (subServiceItem) {
            const updatedServiceItem = await this.modelClass.query()
                .update({
                name: subServiceItemPayload.name ? subServiceItemPayload.name : subServiceItem.name,
                description: subServiceItemPayload.description ? subServiceItemPayload.description : subServiceItem.description,
                unitPrice: subServiceItemPayload.unitPrice ? subServiceItemPayload.unitPrice : subServiceItem.unitPrice,
                purchasedAt: subServiceItemPayload.purchasedAt ? subServiceItemPayload.purchasedAt : subServiceItem.purchasedAt,
                expireDate: subServiceItemPayload.expireDate ? subServiceItemPayload.expireDate : subServiceItem.expireDate,
                supplier: subServiceItemPayload.supplier ? subServiceItemPayload.supplier : subServiceItem.supplier,
                updatedBy: currentUser.username,
            })
                .where({ id: subServiceItemPayload.id });
            return {
                success: true,
                message: 'ServiceItem details updated successfully.',
                data: updatedServiceItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No subServiceItem found.',
                data: {},
            };
        }
    }
    async deleteById(subServiceItemId, currentUser) {
        const subServiceItems = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .delete()
            .where({ id: subServiceItemId });
        if (subServiceItems) {
            return {
                success: true,
                message: 'ServiceItem deleted successfully.',
                data: subServiceItems,
            };
        }
        else {
            return {
                success: false,
                message: 'No subServiceItem found.',
                data: {},
            };
        }
    }
};
SubServiceItemsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SubServiceItemModel')),
    __metadata("design:paramtypes", [Object, serviceItems_service_1.ServiceItemsService])
], SubServiceItemsService);
exports.SubServiceItemsService = SubServiceItemsService;
//# sourceMappingURL=subServiceItems.service.js.map
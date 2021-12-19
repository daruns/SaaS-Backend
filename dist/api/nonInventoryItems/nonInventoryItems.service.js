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
const nonInventoryItem_model_1 = require("../../database/models/nonInventoryItem.model");
let NonInventoryItemsService = class NonInventoryItemsService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const nonInventoryItems = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'NonInventoryItem details fetch successfully.',
            data: nonInventoryItems,
        };
    }
    async findById(id, currentUser) {
        const nonInventoryItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (nonInventoryItem) {
            return {
                success: true,
                message: 'NonInventoryItem details fetch successfully.',
                data: nonInventoryItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No nonInventoryItem details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const nonInventoryItemPayload = payload;
        const newNonInventoryItem = await this.modelClass.query()
            .findOne({
            brandCode: currentUser.brandCode,
            name: nonInventoryItemPayload.name
        });
        if (!newNonInventoryItem) {
            nonInventoryItemPayload.qty = 1;
            nonInventoryItemPayload.createdBy = currentUser.username;
            nonInventoryItemPayload.brandCode = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(nonInventoryItemPayload);
            const createNonInventoryItem = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'NonInventoryItem created successfully.',
                data: createNonInventoryItem,
            };
        }
        else {
            return {
                success: false,
                message: 'NonInventoryItem already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const nonInventoryItemPayload = payload;
        const nonInventoryItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(nonInventoryItemPayload.id);
        if (nonInventoryItem) {
            const updatedNonInventoryItem = await this.modelClass
                .query()
                .update({
                name: nonInventoryItemPayload.name ? nonInventoryItemPayload.name : nonInventoryItem.name,
                description: nonInventoryItemPayload.description ? nonInventoryItemPayload.description : nonInventoryItem.description,
                unitPrice: nonInventoryItemPayload.unitPrice ? nonInventoryItemPayload.unitPrice : nonInventoryItem.unitPrice,
                purchasedAt: nonInventoryItemPayload.purchasedAt ? nonInventoryItemPayload.purchasedAt : nonInventoryItem.purchasedAt,
                expireDate: nonInventoryItemPayload.expireDate ? nonInventoryItemPayload.expireDate : nonInventoryItem.expireDate,
                supplier: nonInventoryItemPayload.supplier ? nonInventoryItemPayload.supplier : nonInventoryItem.supplier,
                status: nonInventoryItemPayload.status ? nonInventoryItemPayload.status : nonInventoryItem.status,
                deleted: nonInventoryItemPayload.deleted ? nonInventoryItemPayload.deleted : nonInventoryItem.deleted,
                updatedBy: currentUser.username,
            })
                .where({ id: nonInventoryItemPayload.id });
            return {
                success: true,
                message: 'NonInventoryItem details updated successfully.',
                data: updatedNonInventoryItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No nonInventoryItem found.',
                data: {},
            };
        }
    }
    async deleteById(nonInventoryItemId, currentUser) {
        const nonInventoryItems = await this.modelClass.query()
            .delete()
            .where({
            brandCode: currentUser.brandCode,
            id: nonInventoryItemId
        });
        if (nonInventoryItems) {
            return {
                success: true,
                message: 'NonInventoryItem deleted successfully.',
                data: nonInventoryItems,
            };
        }
        else {
            return {
                success: false,
                message: 'No nonInventoryItem found.',
                data: {},
            };
        }
    }
};
NonInventoryItemsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('NonInventoryItemModel')),
    __metadata("design:paramtypes", [Object])
], NonInventoryItemsService);
exports.NonInventoryItemsService = NonInventoryItemsService;
//# sourceMappingURL=nonInventoryItems.service.js.map
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
exports.InventoryItemsService = void 0;
const common_1 = require("@nestjs/common");
let InventoryItemsService = class InventoryItemsService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const inventoryItems = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'InventoryItem details fetch successfully.',
            data: inventoryItems,
        };
    }
    async findById(id, currentUser) {
        const inventoryItem = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (inventoryItem) {
            return {
                success: true,
                message: 'InventoryItem details fetch successfully.',
                data: inventoryItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No inventoryItem details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        let inventoryItemPayload = payload;
        const newInventoryItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: inventoryItemPayload.name
        });
        if (!newInventoryItem) {
            inventoryItemPayload.createdBy = currentUser.username;
            inventoryItemPayload.brandCode = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(inventoryItemPayload);
            const createInventoryItem = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'InventoryItem created successfully.',
                data: createInventoryItem,
            };
        }
        else {
            return {
                success: false,
                message: 'InventoryItem already exists with this name!!!',
                data: {},
            };
        }
    }
    async reduceItemQty(item, currentUser) {
        let inventoryItemPayload = item;
        const inventoryItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(inventoryItemPayload.id);
        if (inventoryItem) {
            if (inventoryItem.qty <= 0) {
                return {
                    success: true,
                    message: 'Couldnt Reduce the quantity of inventoryItem',
                    data: { msg: "This Item is running out of quantity." },
                };
            }
            if (!(inventoryItem.qty >= item.qty)) {
                return {
                    success: true,
                    message: 'Couldnt Reduce the quantity of inventoryItem',
                    data: { msg: "New Quantity is larger than current Quantity." },
                };
            }
            const updatedInventoryItem = await this.modelClass
                .query()
                .update({
                qty: inventoryItem.qty - item.qty,
                updatedBy: currentUser.username,
            })
                .where({ id: inventoryItemPayload.id });
            if (updatedInventoryItem) {
                return {
                    success: true,
                    message: 'InventoryItem details updated successfully.',
                    data: updatedInventoryItem,
                };
            }
            else {
                return {
                    success: true,
                    message: 'InventoryItem details did not updated.',
                    data: updatedInventoryItem,
                };
            }
        }
        else {
            return {
                success: true,
                message: 'No inventoryItem found.',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        let inventoryItemPayload = payload;
        const inventoryItem = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(inventoryItemPayload.id);
        if (inventoryItem) {
            const updatedInventoryItem = await this.modelClass
                .query()
                .update({
                name: payload.name ? payload.name : inventoryItem.name,
                description: payload.description ? payload.description : inventoryItem.description,
                unitPrice: payload.unitPrice ? payload.unitPrice : inventoryItem.unitPrice,
                qty: payload.qty ? payload.qty : inventoryItem.qty,
                purchasedAt: payload.purchasedAt ? payload.purchasedAt : inventoryItem.purchasedAt,
                expireDate: payload.expireDate ? payload.expireDate : inventoryItem.expireDate,
                supplier: payload.supplier ? payload.supplier : inventoryItem.supplier,
                status: inventoryItemPayload.status ? inventoryItemPayload.status : inventoryItem.status,
                deleted: inventoryItemPayload.deleted ? inventoryItemPayload.deleted : inventoryItem.deleted,
                updatedBy: currentUser.username,
            })
                .where({ id: inventoryItemPayload.id });
            return {
                success: true,
                message: 'InventoryItem details updated successfully.',
                data: updatedInventoryItem,
            };
        }
        else {
            return {
                success: false,
                message: 'No inventoryItem found.',
                data: {},
            };
        }
    }
    async deleteById(inventoryItemId, currentUser) {
        const inventoryItems = await this.modelClass
            .query()
            .delete()
            .where({
            brandCode: currentUser.brandCode,
            id: inventoryItemId
        });
        if (inventoryItems) {
            return {
                success: true,
                message: 'InventoryItem deleted successfully.',
                data: inventoryItems,
            };
        }
        else {
            return {
                success: false,
                message: 'No inventoryItem found.',
                data: {},
            };
        }
    }
};
InventoryItemsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('InventoryItemModel')),
    __metadata("design:paramtypes", [Object])
], InventoryItemsService);
exports.InventoryItemsService = InventoryItemsService;
//# sourceMappingURL=inventoryItems.service.js.map
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
exports.JoinedItemsService = void 0;
const common_1 = require("@nestjs/common");
let JoinedItemsService = class JoinedItemsService {
    constructor(nonInventoryItemClass, inventoryItemModelClass, serviceItemModelClass, expenseCategoryModelClass, expenseSubCategoryModelClass) {
        this.nonInventoryItemClass = nonInventoryItemClass;
        this.inventoryItemModelClass = inventoryItemModelClass;
        this.serviceItemModelClass = serviceItemModelClass;
        this.expenseCategoryModelClass = expenseCategoryModelClass;
        this.expenseSubCategoryModelClass = expenseSubCategoryModelClass;
    }
    async findAll(currentUser) {
        let result = [];
        const inventoryItems = await this.inventoryItemModelClass.query()
            .select('name', 'id', 'description', 'unitPrice', 'qty')
            .where({ brandCode: currentUser.brandCode });
        const nonInventoryItems = await this.nonInventoryItemClass.query()
            .select('name', 'id', 'description', 'unitPrice', 'qty')
            .where({ brandCode: currentUser.brandCode });
        const serviceItems = await this.serviceItemModelClass.query()
            .select('name', 'id', 'description', 'unitPrice', 'qty')
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched('subServiceItems(selectName)')
            .modifiers({
            selectName(builder) {
                builder.select('name', 'id', 'description', 'unitPrice', 'qty');
            },
        });
        serviceItems.forEach(serv => {
            result.push({
                id: serv.id,
                name: serv.name,
                description: serv.description,
                unitePrice: serv.unitPrice,
                qty: 0,
                category: "serviceItem",
            });
            serv.subServiceItems.forEach(subServ => {
                result.push({
                    id: serv.id,
                    name: serv.name + ", " + subServ.name,
                    description: serv.description,
                    unitePrice: serv.unitPrice,
                    qty: 0,
                    category: "subServiceItem",
                });
            });
        });
        result = result.concat(inventoryItems.map(e => {
            return {
                id: e.id,
                name: e.name,
                unitePrice: e.unitPrice,
                qty: e.qty,
                category: "inventoryItem",
            };
        }));
        result = result.concat(nonInventoryItems.map(e => {
            return {
                id: e.id,
                name: e.name,
                unitePrice: e.unitPrice,
                qty: e.qty,
                category: "nonInventoryItem",
            };
        }));
        return {
            success: true,
            message: 'JoinedItem details of InventoryItems and NonInventoryItems and Services and SubServices fetch successfully.',
            data: result,
        };
    }
    async findAllExpenseCategories(currentUser) {
        let result = [];
        const expenseCategories = await this.expenseCategoryModelClass.query()
            .select('id', 'name')
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched('expenseSubCategories(selectName).[expenseChildSubCategories(selectName)]')
            .modifiers({
            selectName(builder) {
                builder.select('name');
            },
        });
        expenseCategories.forEach(cat => {
            result.push({
                name: cat.name,
            });
            cat.expenseSubCategories.forEach(subCat => {
                result.push({
                    name: cat.name + ", " + subCat.name,
                });
                subCat.expenseChildSubCategories.forEach(childSubCat => {
                    result.push({
                        name: cat.name + ", " + subCat.name + ", " + childSubCat.name,
                    });
                });
            });
        });
        return {
            success: true,
            message: 'JoinedExpenseCategories details of Categories and SubCategories fetch successfully.',
            data: result,
        };
    }
};
JoinedItemsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('NonInventoryItemModel')),
    __param(1, common_1.Inject('InventoryItemModel')),
    __param(2, common_1.Inject('ServiceItemModel')),
    __param(3, common_1.Inject('ExpenseCategoryModel')),
    __param(4, common_1.Inject('ExpenseSubCategoryModel')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], JoinedItemsService);
exports.JoinedItemsService = JoinedItemsService;
//# sourceMappingURL=joinedItems.service.js.map
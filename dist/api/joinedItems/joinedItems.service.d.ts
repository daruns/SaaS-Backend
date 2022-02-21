import { ServiceItemModel } from 'src/database/models/serviceItem.model';
import { InventoryItemModel } from 'src/database/models/inventoryItem.model';
import { NonInventoryItemModel } from 'src/database/models/nonInventoryItem.model';
import { ModelClass } from 'objection';
import { ExpenseCategoryModel } from 'src/database/models/expenseCategory.model';
import { ExpenseSubCategoryModel } from 'src/database/models/expenseSubCategory.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class JoinedItemsService {
    private nonInventoryItemClass;
    private inventoryItemModelClass;
    private serviceItemModelClass;
    private expenseCategoryModelClass;
    private expenseSubCategoryModelClass;
    constructor(nonInventoryItemClass: ModelClass<NonInventoryItemModel>, inventoryItemModelClass: ModelClass<InventoryItemModel>, serviceItemModelClass: ModelClass<ServiceItemModel>, expenseCategoryModelClass: ModelClass<ExpenseCategoryModel>, expenseSubCategoryModelClass: ModelClass<ExpenseSubCategoryModel>);
    findAll(currentUser: any): Promise<{
        success: boolean;
        message: string;
        data: any[];
    }>;
    findAllExpenseCategories(currentUser: any): Promise<{
        success: boolean;
        message: string;
        data: any[];
    }>;
}

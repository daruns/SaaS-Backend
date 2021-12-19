import { ExpenseSubCategoryModel } from 'src/database/models/expenseSubCategory.model';
import { ModelClass } from 'objection';
import { CreateExpenseSubCategoryDto } from './dto/create-expenseSubCategory.dto';
import { UpdateExpenseSubCategoryDto } from './dto/update-expenseSubCategory.dto';
import { ExpenseCategoriesService } from '../expenseCategories/expenseCategories.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ExpenseSubCategoriesService {
    private modelClass;
    private readonly expenseCategoryService;
    constructor(modelClass: ModelClass<ExpenseSubCategoryModel>, expenseCategoryService: ExpenseCategoriesService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateExpenseSubCategoryDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateExpenseSubCategoryDto, currentUser: any): Promise<ResponseData>;
    deleteById(expenseSubCategoryId: number, currentUser: any): Promise<ResponseData>;
}

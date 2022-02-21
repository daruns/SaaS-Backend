import { ExpenseChildSubCategoryModel } from 'src/database/models/expenseChildSubCategory.model';
import { ModelClass } from 'objection';
import { CreateExpenseChildSubCategoryDto } from './dto/create-expenseChildSubCategory.dto';
import { UpdateExpenseChildSubCategoryDto } from './dto/update-expenseChildSubCategory.dto';
import { ExpenseSubCategoriesService } from '../expenseSubCategories/expenseSubCategories.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ExpenseChildSubCategoriesService {
    private modelClass;
    private readonly expenseSubCategoryService;
    constructor(modelClass: ModelClass<ExpenseChildSubCategoryModel>, expenseSubCategoryService: ExpenseSubCategoriesService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateExpenseChildSubCategoryDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateExpenseChildSubCategoryDto, currentUser: any): Promise<ResponseData>;
    deleteById(expenseChildSubCategoryId: number, currentUser: any): Promise<ResponseData>;
}

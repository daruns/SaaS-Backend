import { ExpenseCategoryModel } from 'src/database/models/expenseCategory.model';
import { ModelClass } from 'objection';
import { CreateExpenseCategoryDto } from './dto/create-expenseCategory.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expenseCategory.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ExpenseCategoriesService {
    private modelClass;
    constructor(modelClass: ModelClass<ExpenseCategoryModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateExpenseCategoryDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateExpenseCategoryDto, currentUser: any): Promise<ResponseData>;
    deleteById(expenseCategoryId: number, currentUser: any): Promise<ResponseData>;
}

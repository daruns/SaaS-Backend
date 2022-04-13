import { UpdateExpenseSubCategoryDto } from './dto/update-expenseSubCategory.dto';
import { ExpenseSubCategoriesService } from './expenseSubCategories.service';
import { CreateExpenseSubCategoryDto } from './dto/create-expenseSubCategory.dto';
export declare class ExpenseSubCategoriesController {
    private readonly expenseSubCategoriesService;
    constructor(expenseSubCategoriesService: ExpenseSubCategoriesService);
    findAll(req: any): Promise<import("./expenseSubCategories.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./expenseSubCategories.service").ResponseData>;
    create(expenseSubCategory: CreateExpenseSubCategoryDto, req: any): Promise<import("./expenseSubCategories.service").ResponseData>;
    update(payload: UpdateExpenseSubCategoryDto, req: any): Promise<import("./expenseSubCategories.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./expenseSubCategories.service").ResponseData>;
}

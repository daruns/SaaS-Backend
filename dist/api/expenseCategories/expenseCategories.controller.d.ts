import { UpdateExpenseCategoryDto } from './dto/update-expenseCategory.dto';
import { ExpenseCategoriesService } from './expenseCategories.service';
import { CreateExpenseCategoryDto } from './dto/create-expenseCategory.dto';
export declare class ExpenseCategoriesController {
    private readonly expenseCategoriesService;
    constructor(expenseCategoriesService: ExpenseCategoriesService);
    findAll(req: any): Promise<import("./expenseCategories.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./expenseCategories.service").ResponseData>;
    create(expenseCategory: CreateExpenseCategoryDto, req: any): Promise<import("./expenseCategories.service").ResponseData>;
    update(payload: UpdateExpenseCategoryDto, req: any): Promise<import("./expenseCategories.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./expenseCategories.service").ResponseData>;
}

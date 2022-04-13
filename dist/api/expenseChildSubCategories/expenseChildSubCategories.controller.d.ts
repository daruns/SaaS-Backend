import { UpdateExpenseChildSubCategoryDto } from './dto/update-expenseChildSubCategory.dto';
import { ExpenseChildSubCategoriesService } from './expenseChildSubCategories.service';
import { CreateExpenseChildSubCategoryDto } from './dto/create-expenseChildSubCategory.dto';
export declare class ExpenseChildSubCategoriesController {
    private readonly expenseChildSubCategoriesService;
    constructor(expenseChildSubCategoriesService: ExpenseChildSubCategoriesService);
    findAll(req: any): Promise<import("./expenseChildSubCategories.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./expenseChildSubCategories.service").ResponseData>;
    create(expenseChildSubCategory: CreateExpenseChildSubCategoryDto, req: any): Promise<import("./expenseChildSubCategories.service").ResponseData>;
    update(payload: UpdateExpenseChildSubCategoryDto, req: any): Promise<import("./expenseChildSubCategories.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./expenseChildSubCategories.service").ResponseData>;
}

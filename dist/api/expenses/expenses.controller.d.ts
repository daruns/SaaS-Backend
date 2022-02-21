import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto, CreateExpenseItemDto } from './dto/create-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    findAll(req: any): Promise<import("./expenses.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./expenses.service").ResponseData>;
    create(expense: CreateExpenseDto, expenseItems: Array<CreateExpenseItemDto>, req: any): Promise<import("./expenses.service").ResponseData>;
    addFile(id: number, files: any, req: any): Promise<import("./expenses.service").ResponseData>;
    replaceFiles(id: number, files: any, req: any): Promise<import("./expenses.service").ResponseData>;
    removeFile(body: {
        id: number;
        attachId: number;
    }, req: any): Promise<import("./expenses.service").ResponseData>;
    update(payload: UpdateExpenseDto, expenseItems: Array<CreateExpenseItemDto>, req: any): Promise<import("./expenses.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./expenses.service").ResponseData>;
}

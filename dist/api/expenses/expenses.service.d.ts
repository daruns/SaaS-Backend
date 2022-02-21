import { ExpenseModel } from 'src/database/models/expense.model';
import { ExpenseItemModel } from 'src/database/models/expenseItem.model';
import { ModelClass } from 'objection';
import { CreateExpenseDto, CreateExpenseItemDto } from './dto/create-expense.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TaxesService } from '../taxes/taxes.service';
import { PaymentMethodsService } from '../paymentMethods/paymentMethods.service';
import { AddFileDto, FileUploadService } from 'src/app/app.service';
import { ExpenseAttachmentModel } from 'src/database/models/expenseAttachment.model';
import { AttachmentModel } from 'src/database/models/attachment.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ExpensesService {
    private modelClass;
    private expenseItemModel;
    private expenseAttachmentModel;
    private attachmentModel;
    private readonly supplierService;
    private readonly taxService;
    private readonly paymentMethodService;
    private readonly fileUploadService;
    constructor(modelClass: ModelClass<ExpenseModel>, expenseItemModel: ModelClass<ExpenseItemModel>, expenseAttachmentModel: ModelClass<ExpenseAttachmentModel>, attachmentModel: ModelClass<AttachmentModel>, supplierService: SuppliersService, taxService: TaxesService, paymentMethodService: PaymentMethodsService, fileUploadService: FileUploadService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateExpenseDto, items: Array<CreateExpenseItemDto>, currentUser: any): Promise<ResponseData>;
    removeFile(payload: {
        id: number;
        attachId: number;
    }, currentUser: any): Promise<ResponseData>;
    replaceFiles(payload: AddFileDto, currentUser: any): Promise<ResponseData>;
    addFile(payload: AddFileDto, currentUser: any): Promise<ResponseData>;
    update(payload: any, items: Array<CreateExpenseItemDto>, currentUser: any): Promise<ResponseData>;
    deleteById(expenseId: number, currentUser: any): Promise<ResponseData>;
}

import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto, CreateInvoiceItemDto } from './dto/create-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    findAll(req: any): Promise<import("./invoices.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./invoices.service").ResponseData>;
    create(invoice: CreateInvoiceDto, invoiceItems: CreateInvoiceItemDto[], req: any): Promise<import("./invoices.service").ResponseData>;
    update(payload: UpdateInvoiceDto, invoiceItems: CreateInvoiceItemDto[], req: any): Promise<import("./invoices.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./invoices.service").ResponseData>;
}

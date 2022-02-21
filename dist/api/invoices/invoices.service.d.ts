import { InvoiceModel } from 'src/database/models/invoice.model';
import { InvoiceItemModel } from 'src/database/models/invoiceItem.model';
import { ModelClass } from 'objection';
import { CreateInvoiceItemDto } from './dto/create-invoice.dto';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { ClientsService } from '../clients/clients.service';
import { ClientContactsService } from '../clientContacts/clientContacts.service';
import { SubServiceItemsService } from '../subServiceItems/subServiceItems.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class InvoicesService {
    private modelClass;
    private invoiceItemModel;
    private readonly inventoryItemsService;
    private readonly nonInventoryItemsService;
    private readonly serviceItemsService;
    private readonly subServiceItemsService;
    private readonly clientsSerive;
    private readonly clientContactsSerive;
    constructor(modelClass: ModelClass<InvoiceModel>, invoiceItemModel: ModelClass<InvoiceItemModel>, inventoryItemsService: InventoryItemsService, nonInventoryItemsService: NonInventoryItemsService, serviceItemsService: ServiceItemsService, subServiceItemsService: SubServiceItemsService, clientsSerive: ClientsService, clientContactsSerive: ClientContactsService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, items: Array<CreateInvoiceItemDto>, currentUser: any): Promise<ResponseData>;
    update(payload: any, items: Array<CreateInvoiceItemDto>, currentUser: any): Promise<ResponseData>;
    deleteById(invoiceId: number, currentUser: any): Promise<ResponseData>;
}

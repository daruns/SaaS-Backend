import { QuoteModel } from 'src/database/models/quote.model';
import { QuoteItemModel } from 'src/database/models/quoteItem.model';
import { ModelClass } from 'objection';
import { CreateQuoteItemDto } from './dto/create-quote.dto';
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
export declare class QuotesService {
    private modelClass;
    private quoteItemModel;
    private readonly inventoryItemsService;
    private readonly nonInventoryItemsService;
    private readonly serviceItemsService;
    private readonly subServiceItemsService;
    private readonly clientsSerive;
    private readonly clientContactsSerive;
    constructor(modelClass: ModelClass<QuoteModel>, quoteItemModel: ModelClass<QuoteItemModel>, inventoryItemsService: InventoryItemsService, nonInventoryItemsService: NonInventoryItemsService, serviceItemsService: ServiceItemsService, subServiceItemsService: SubServiceItemsService, clientsSerive: ClientsService, clientContactsSerive: ClientContactsService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, items: Array<CreateQuoteItemDto>, currentUser: any): Promise<ResponseData>;
    update(payload: any, items: Array<CreateQuoteItemDto>, currentUser: any): Promise<ResponseData>;
    deleteById(quoteId: number, currentUser: any): Promise<ResponseData>;
}

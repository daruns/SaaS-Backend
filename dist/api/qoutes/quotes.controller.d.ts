import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto, CreateQuoteItemDto } from './dto/create-quote.dto';
export declare class QuotesController {
    private readonly quotesService;
    constructor(quotesService: QuotesService);
    findAll(req: any): Promise<import("./quotes.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./quotes.service").ResponseData>;
    create(quote: CreateQuoteDto, quoteItems: CreateQuoteItemDto[], req: any): Promise<import("./quotes.service").ResponseData>;
    update(payload: UpdateQuoteDto, quoteItems: CreateQuoteItemDto[], req: any): Promise<import("./quotes.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./quotes.service").ResponseData>;
}

import { JoinedItemsService } from './joinedItems.service';
export declare class JoinedItemsController {
    private readonly joinedItemsService;
    constructor(joinedItemsService: JoinedItemsService);
    findAll(req: any): Promise<{
        success: boolean;
        message: string;
        data: any[];
    }>;
    findAllExpenseCategories(req: any): Promise<{
        success: boolean;
        message: string;
        data: any[];
    }>;
}

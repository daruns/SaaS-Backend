import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientsController {
    private readonly postsService;
    constructor(postsService: ClientsService);
    findAll(): Promise<import("./clients.service").ResponseData>;
    findOne(id: number): Promise<import("./clients.service").ResponseData>;
    create(client: CreateClientDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../database/models/client.model").ClientModel;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
    update(payload: UpdateClientDto): Promise<import("./clients.service").ResponseData>;
    deleteById(postId: number): Promise<import("./clients.service").ResponseData>;
}

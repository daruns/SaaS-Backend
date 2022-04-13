import { UpdateClientContactDto } from './dto/update-clientContact.dto';
import { ClientContactsService } from './clientContacts.service';
import { CreateClientContactDto } from './dto/create-clientContact.dto';
export declare class ClientContactsController {
    private readonly clientContactsService;
    constructor(clientContactsService: ClientContactsService);
    findAll(req: any): Promise<import("./clientContacts.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./clientContacts.service").ResponseData>;
    create(clientContact: CreateClientContactDto, req: any): Promise<import("./clientContacts.service").ResponseData>;
    update(payload: UpdateClientContactDto, req: any): Promise<import("./clientContacts.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./clientContacts.service").ResponseData>;
}

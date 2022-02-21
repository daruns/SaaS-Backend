/// <reference types="multer" />
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientUserDto } from './dto/create-client-user.dto';
import { UpdateClientUserDto } from './dto/update-client-user.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findAll(req: any): Promise<import("../../app/app.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("../../app/app.service").ResponseData>;
    create(payload: CreateClientDto, file: Express.Multer.File, req: any): Promise<import("../../app/app.service").ResponseData>;
    update(payload: UpdateClientDto, file: Express.Multer.File, req: any): Promise<import("../../app/app.service").ResponseData>;
    addUser(clientUser: CreateClientUserDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    editUser(payload: UpdateClientUserDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    deleteById(payload: {
        id: number;
    }, req: any): Promise<import("../../app/app.service").ResponseData>;
    removeUser(payload: {
        id: number;
        userId: number;
    }, req: any): Promise<import("../../app/app.service").ResponseData>;
}

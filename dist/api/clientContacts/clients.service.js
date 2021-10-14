"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const client_model_1 = require("../../database/models/client.model");
const users_service_1 = require("../users/users.service");
let ClientsService = class ClientsService {
    constructor(modelClass, usersService) {
        this.modelClass = modelClass;
        this.usersService = usersService;
    }
    async findAll(currentUser) {
        const clients = await this.modelClass.query().joinRelated('users').where('users.subdomain', currentUser.subdomain);
        return {
            success: true,
            message: 'Client details fetch successfully.',
            data: clients,
        };
    }
    async findById(id, currentUser) {
        const client = await this.modelClass
            .query()
            .joinRelated('users')
            .where('users.subdomain', currentUser.subdomain)
            .findById(id);
        if (client) {
            return {
                success: true,
                message: 'Client details fetch successfully.',
                data: client,
            };
        }
        else {
            return {
                success: true,
                message: 'No client details found.',
                data: {},
            };
        }
    }
    async create(payload, user, currentUser) {
        const newClient = await this.modelClass.query()
            .joinRelated('users')
            .where('users.subdomain', currentUser.subdomain)
            .orWhere({
            email: payload.email
        })
            .orWhere('users.username', currentUser.reportsTo);
        if (!newClient.length) {
            console.log(currentUser);
            const createdUser = await this.usersService.create(user);
            user.userType = 'partner';
            user.name = payload.name;
            user.createdBy = currentUser.username;
            user.reportsTo = currentUser.username;
            payload.userId = createdUser.data;
            console.log([createdUser]);
            payload.userId = currentUser.id;
            const identifiers = await this.modelClass.query().insert(payload);
            const createClient = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'Client created successfully.',
                data: createClient,
            };
        }
        else {
            return {
                success: false,
                message: 'Client already exists with this email address!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const client = await this.modelClass.query().joinRelated('users').where('users.subdomain', currentUser.subdomain).findById(payload.id);
        if (client) {
            const updatedClient = await this.modelClass
                .query()
                .update({
                name: payload.name ? payload.name : client.name,
                logo: payload.logo ? payload.logo : client.logo,
                phoneNumbers: payload.phoneNumbers ? payload.phoneNumbers : client.phoneNumbers,
                phoneNumber1: payload.phoneNumber1 ? payload.phoneNumber1 : client.phoneNumber1,
                phoneNumber2: payload.phoneNumber2 ? payload.phoneNumber2 : client.phoneNumber2,
                clientType: payload.clientType ? payload.clientType : client.clientType,
                businessType: payload.businessType ? payload.businessType : client.businessType,
                email: payload.email ? payload.email : client.email,
                website: payload.website ? payload.website : client.website,
                address: payload.address ? payload.address : client.address,
                rate: payload.rate ? payload.rate : client.rate,
                zipCode: payload.zipCode ? payload.zipCode : client.zipCode,
                status: payload.status ? payload.status : client.status,
                deleted: payload.deleted ? payload.deleted : client.deleted,
                createdBy: payload.createdBy ? payload.createdBy : client.createdBy,
                updatedBy: payload.updatedBy ? payload.updatedBy : client.updatedBy,
                userId: payload.userId ? payload.userId : client.userId,
            })
                .where({ id: payload.clientId });
            return {
                success: true,
                message: 'Client details updated successfully.',
                data: updatedClient,
            };
        }
        else {
            return {
                success: true,
                message: 'No client found.',
                data: {},
            };
        }
    }
    async deleteById(clientId, currentUser) {
        const clients = await this.modelClass
            .query()
            .joinRelated('users')
            .where('users.subdomain', currentUser.subdomain)
            .delete()
            .where({ id: clientId });
        if (clients) {
            return {
                success: true,
                message: 'Client deleted successfully.',
                data: clients,
            };
        }
        else {
            return {
                success: false,
                message: 'No client found.',
                data: {},
            };
        }
    }
};
ClientsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ClientModel')),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
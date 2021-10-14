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
const app_service_1 = require("../../app/app.service");
const user_model_1 = require("../../database/models/user.model");
let ClientsService = class ClientsService {
    constructor(modelClass, userClass, usersService) {
        this.modelClass = modelClass;
        this.userClass = userClass;
        this.usersService = usersService;
    }
    async findAll(currentUser) {
        const CUser = await this.getUserById(currentUser.id);
        const clients = await this.modelClass
            .query()
            .select('clients.*')
            .join('users', 'clients.userId', 'users.id')
            .where('users.subdomain', CUser.subdomain)
            .withGraphFetched({
            user: true,
            clientContacts: {},
            meetings: {},
            socialMedias: {},
        });
        if (clients.length) {
            return {
                success: true,
                message: 'Client details fetch successfully.',
                data: clients,
            };
        }
        else {
            return {
                success: true,
                message: 'No clients details found.',
                data: {},
            };
        }
    }
    async findById(id, currentUser) {
        const CUser = await this.getUserById(currentUser.id);
        const client = await this.modelClass
            .query()
            .select('users.*', 'clients.*')
            .join('users', 'clients.userId', 'users.id')
            .where('users.subdomain', CUser.subdomain)
            .findById(id)
            .withGraphFetched({
            clientContacts: {},
            meetings: {},
            socialMedias: {},
        });
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
        const CUser = await this.getUserById(currentUser.id);
        const newClient = await this.modelClass.query()
            .findOne({ email: payload.email });
        const userParams = user;
        if (!newClient) {
            let result;
            const trx = await this.modelClass.startTransaction();
            try {
                userParams.userType = 'partner';
                userParams.name = payload.name;
                userParams.email = payload.email;
                userParams.subdomain = CUser.subdomain;
                userParams.phoneNumber = payload.phoneNumber1;
                userParams.createdBy = CUser.username;
                userParams.reportsTo = CUser.username;
                const createdUser = await this.userClass.query(trx).insert(userParams);
                let newparamspayload = {
                    name: payload.name,
                    phoneNumbers: payload.phoneNumbers,
                    phoneNumber1: payload.phoneNumber1,
                    phoneNumber2: payload.phoneNumber2,
                    clientType: payload.clientType,
                    businessType: payload.businessType,
                    email: payload.email,
                    website: payload.website,
                    address: payload.address,
                    rate: payload.rate,
                    zipCode: payload.zipCode,
                    status: "active",
                    createdBy: CUser.username,
                    userId: createdUser.id,
                };
                const createdClient = await createdUser
                    .$relatedQuery('clients', trx)
                    .insert(newparamspayload);
                const identifier = await this.modelClass.query(trx).findById(createdClient.id).withGraphFetched({
                    user: {},
                });
                await trx.commit();
                result = identifier;
                console.log('Client and User created successfully');
                return {
                    success: true,
                    message: 'Client created successfully.',
                    data: result,
                };
            }
            catch (err) {
                await trx.rollback();
                console.log(`Something went wrong. Neither Jennifer nor Scrappy were inserted\n ${err}`);
                result = err;
                return {
                    success: false,
                    message: `Something went wrong. Neither Client nor User were inserted.`,
                    data: err,
                };
            }
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
        const client = await this.modelClass.query().findById(payload.id);
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
                website: payload.website ? payload.website : client.website,
                address: payload.address ? payload.address : client.address,
                rate: payload.rate ? payload.rate : client.rate,
                zipCode: payload.zipCode ? payload.zipCode : client.zipCode,
                status: payload.status ? payload.status : client.status,
                deleted: payload.deleted ? payload.deleted : client.deleted,
                updatedBy: payload.updatedBy ? payload.updatedBy : client.updatedBy,
                userId: payload.userId ? payload.userId : client.userId,
            })
                .where({ id: payload.id });
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
    async deleteById(payload, currentUser) {
        const clients = await this.modelClass
            .query()
            .delete()
            .where({ id: payload.id });
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
    async getUserById(id) {
        const CUser = await this.usersService.findById(id);
        return CUser.data;
    }
};
ClientsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ClientModel')),
    __param(1, common_1.Inject('UserModel')),
    __metadata("design:paramtypes", [Object, Object, users_service_1.UsersService])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
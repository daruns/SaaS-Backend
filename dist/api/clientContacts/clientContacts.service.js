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
const clientContact_model_1 = require("../../database/models/clientContact.model");
let ClientContactsService = class ClientContactsService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const clientContacts = await this.modelClass.query();
        return {
            success: true,
            message: 'ClientContact details fetch successfully.',
            data: clientContacts,
        };
    }
    async findById(id, currentUser) {
        const clientContact = await this.modelClass
            .query()
            .findById(id);
        if (clientContact) {
            return {
                success: true,
                message: 'ClientContact details fetch successfully.',
                data: clientContact,
            };
        }
        else {
            return {
                success: true,
                message: 'No clientContact details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        let clientContactPayload = payload;
        const newClientContact = await this.modelClass.query()
            .where({
            email: clientContactPayload.email
        })
            .withGraphFetched({});
        if (!newClientContact.length) {
            clientContactPayload.createdBy = currentUser.username;
            const identifiers = await this.modelClass.query().insert(clientContactPayload);
            const createClientContact = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'ClientContact created successfully.',
                data: createClientContact,
            };
        }
        else {
            return {
                success: false,
                message: 'ClientContact already exists with this email address!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        let clientContactPayload = payload;
        const clientContact = await this.modelClass.query().findById(clientContactPayload.id);
        if (clientContact) {
            const updatedClientContact = await this.modelClass
                .query()
                .update({
                name: clientContactPayload.name ? clientContactPayload.name : clientContact.name,
                businessPhoneNumber1: clientContactPayload.businessPhoneNumber1 ? clientContactPayload.businessPhoneNumber1 : clientContact.businessPhoneNumber1,
                businessPhoneNumber2: clientContactPayload.businessPhoneNumber2 ? clientContactPayload.businessPhoneNumber2 : clientContact.businessPhoneNumber2,
                email: clientContactPayload.email ? clientContactPayload.email : clientContact.email,
                position: clientContactPayload.position ? clientContactPayload.position : clientContact.position,
                description: clientContactPayload.description ? clientContactPayload.description : clientContact.description,
                department: clientContactPayload.department ? clientContactPayload.department : clientContact.department,
                status: clientContactPayload.status ? clientContactPayload.status : clientContact.status,
                deleted: clientContactPayload.deleted ? clientContactPayload.deleted : clientContact.deleted,
                updatedBy: currentUser.username,
                clientId: clientContactPayload.clientId ? clientContactPayload.clientId : clientContact.clientId,
            })
                .where({ id: clientContactPayload.id });
            return {
                success: true,
                message: 'ClientContact details updated successfully.',
                data: updatedClientContact,
            };
        }
        else {
            return {
                success: true,
                message: 'No clientContact found.',
                data: {},
            };
        }
    }
    async deleteById(clientContactId, currentUser) {
        const clientContacts = await this.modelClass
            .query()
            .delete()
            .where({ id: clientContactId });
        if (clientContacts) {
            return {
                success: true,
                message: 'ClientContact deleted successfully.',
                data: clientContacts,
            };
        }
        else {
            return {
                success: false,
                message: 'No clientContact found.',
                data: {},
            };
        }
    }
};
ClientContactsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ClientContactModel')),
    __metadata("design:paramtypes", [Object])
], ClientContactsService);
exports.ClientContactsService = ClientContactsService;
//# sourceMappingURL=clientContacts.service.js.map
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
const tax_model_1 = require("../../database/models/tax.model");
let TaxesService = class TaxesService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const taxes = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'Taxes details fetch successfully.',
            data: taxes,
        };
    }
    async findById(id, currentUser) {
        const CUser = currentUser;
        const tax = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (tax) {
            return {
                success: true,
                message: 'Tax details fetch successfully.',
                data: tax,
            };
        }
        else {
            return {
                success: false,
                message: 'No tax details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const CUser = currentUser;
        const taxPayload = payload;
        const newTax = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: taxPayload.name
        });
        if (!newTax) {
            taxPayload['createdBy'] = currentUser.username;
            taxPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(taxPayload);
            const createTax = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'Tax created successfully.',
                data: createTax,
            };
        }
        else {
            return {
                success: false,
                message: 'Tax already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const CUser = currentUser;
        const taxPayload = payload;
        const tax = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(taxPayload.id);
        if (tax) {
            const updatedTax = await this.modelClass
                .query()
                .update({
                name: taxPayload.name ? taxPayload.name : tax.name,
                type: taxPayload.type ? taxPayload.type : tax.type,
                rate: taxPayload.rate ? taxPayload.rate : tax.rate,
                description: taxPayload.description ? taxPayload.description : tax.description,
                updatedBy: currentUser.username,
            })
                .where({ id: taxPayload.id });
            return {
                success: true,
                message: 'Tax details updated successfully.',
                data: updatedTax,
            };
        }
        else {
            return {
                success: false,
                message: 'No tax found.',
                data: {},
            };
        }
    }
    async deleteById(taxId, currentUser) {
        const CUser = currentUser;
        const taxes = await this.modelClass.query()
            .where({
            brandCode: CUser.brandCode,
            id: taxId
        })
            .delete();
        if (taxes) {
            return {
                success: true,
                message: 'Tax deleted successfully.',
                data: taxes,
            };
        }
        else {
            return {
                success: false,
                message: 'No tax found.',
                data: {},
            };
        }
    }
};
TaxesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('TaxModel')),
    __metadata("design:paramtypes", [Object])
], TaxesService);
exports.TaxesService = TaxesService;
//# sourceMappingURL=taxes.service.js.map
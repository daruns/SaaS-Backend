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
const supplier_model_1 = require("../../database/models/supplier.model");
let SuppliersService = class SuppliersService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const suppliers = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'Suppliers details fetch successfully.',
            data: suppliers,
        };
    }
    async findById(id, currentUser) {
        const CUser = currentUser;
        const supplier = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (supplier) {
            return {
                success: true,
                message: 'Supplier details fetch successfully.',
                data: supplier,
            };
        }
        else {
            return {
                success: false,
                message: 'No supplier details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const CUser = currentUser;
        const supplierPayload = payload;
        const newSupplier = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: supplierPayload.name
        });
        if (!newSupplier) {
            supplierPayload['createdBy'] = currentUser.username;
            supplierPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(supplierPayload);
            const createSupplier = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'Supplier created successfully.',
                data: createSupplier,
            };
        }
        else {
            return {
                success: false,
                message: 'Supplier already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const CUser = currentUser;
        const supplierPayload = payload;
        const supplier = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(supplierPayload.id);
        if (supplier) {
            const updatedSupplier = await this.modelClass
                .query()
                .update({
                name: supplierPayload.name ? supplierPayload.name : supplier.name,
                logo: supplierPayload.logo ? supplierPayload.logo : supplier.logo,
                phoneNumbers: supplierPayload.phoneNumbers ? supplierPayload.phoneNumbers : supplier.phoneNumbers,
                supplierType: supplierPayload.supplierType ? supplierPayload.supplierType : supplier.supplierType,
                businessType: supplierPayload.businessType ? supplierPayload.businessType : supplier.businessType,
                email: supplierPayload.email ? supplierPayload.email : supplier.email,
                website: supplierPayload.website ? supplierPayload.website : supplier.website,
                address: supplierPayload.address ? supplierPayload.address : supplier.address,
                rate: supplierPayload.rate ? supplierPayload.rate : supplier.rate,
                zipCode: supplierPayload.zipCode ? supplierPayload.zipCode : supplier.zipCode,
                status: supplierPayload.status ? supplierPayload.status : supplier.status,
                updatedBy: currentUser.username,
            })
                .where({ id: supplierPayload.id });
            return {
                success: true,
                message: 'Supplier details updated successfully.',
                data: updatedSupplier,
            };
        }
        else {
            return {
                success: false,
                message: 'No supplier found.',
                data: {},
            };
        }
    }
    async deleteById(supplierId, currentUser) {
        const CUser = currentUser;
        const suppliers = await this.modelClass.query()
            .where({
            brandCode: CUser.brandCode,
            id: supplierId
        })
            .delete();
        if (suppliers) {
            return {
                success: true,
                message: 'Supplier deleted successfully.',
                data: suppliers,
            };
        }
        else {
            return {
                success: false,
                message: 'No supplier found.',
                data: {},
            };
        }
    }
};
SuppliersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SupplierModel')),
    __metadata("design:paramtypes", [Object])
], SuppliersService);
exports.SuppliersService = SuppliersService;
//# sourceMappingURL=suppliers.service.js.map
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
exports.DeductionTypesService = void 0;
const common_1 = require("@nestjs/common");
let DeductionTypesService = class DeductionTypesService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const deductionTypes = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'Deduction Types details fetch successfully.',
            data: deductionTypes,
        };
    }
    async findById(id, currentUser) {
        const deductionType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (deductionType) {
            return {
                success: true,
                message: 'DeductionType details fetch successfully.',
                data: deductionType,
            };
        }
        else {
            return {
                success: false,
                message: 'No deductionType details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const deductionTypePayload = payload;
        const newDeductionType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: deductionTypePayload.name
        });
        if (!newDeductionType) {
            deductionTypePayload['createdBy'] = currentUser.username;
            deductionTypePayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(deductionTypePayload);
            const createDeductionType = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'DeductionType created successfully.',
                data: createDeductionType,
            };
        }
        else {
            return {
                success: false,
                message: 'DeductionType already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const deductionTypePayload = payload;
        const deductionType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(deductionTypePayload.id);
        if (deductionType) {
            const updatedDeductionType = await this.modelClass
                .query()
                .update({
                name: deductionTypePayload.name ? deductionTypePayload.name : deductionType.name,
                type: deductionTypePayload.type ? deductionTypePayload.type : deductionType.type,
                fund: deductionTypePayload.fund ? deductionTypePayload.fund : deductionType.fund,
                rate: deductionTypePayload.rate ? deductionTypePayload.rate : deductionType.rate,
                durationType: deductionTypePayload.durationType ? deductionTypePayload.durationType : deductionType.durationType,
                brandCode: deductionTypePayload.brandCode ? deductionTypePayload.brandCode : deductionType.brandCode,
                updatedBy: currentUser.username,
            })
                .where({ id: deductionTypePayload.id });
            return {
                success: true,
                message: 'DeductionType details updated successfully.',
                data: updatedDeductionType,
            };
        }
        else {
            return {
                success: false,
                message: 'No deductionType found.',
                data: {},
            };
        }
    }
    async deleteById(deductionTypeId, currentUser) {
        const deductionTypes = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: deductionTypeId
        })
            .delete();
        if (deductionTypes) {
            return {
                success: true,
                message: 'DeductionType deleted successfully.',
                data: deductionTypes,
            };
        }
        else {
            return {
                success: false,
                message: 'No deductionType found.',
                data: {},
            };
        }
    }
};
DeductionTypesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('DeductionTypeModel')),
    __metadata("design:paramtypes", [Object])
], DeductionTypesService);
exports.DeductionTypesService = DeductionTypesService;
//# sourceMappingURL=deductionTypes.service.js.map
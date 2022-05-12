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
exports.EarningTypesService = void 0;
const common_1 = require("@nestjs/common");
let EarningTypesService = class EarningTypesService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const earningTypes = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'Earning Types details fetch successfully.',
            data: earningTypes,
        };
    }
    async findById(id, currentUser) {
        const earningType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (earningType) {
            return {
                success: true,
                message: 'EarningType details fetch successfully.',
                data: earningType,
            };
        }
        else {
            return {
                success: false,
                message: 'No earningType details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const earningTypePayload = payload;
        const newEarningType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ name: earningTypePayload.name });
        if (!newEarningType) {
            earningTypePayload['createdBy'] = currentUser.username;
            earningTypePayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(earningTypePayload);
            const createEarningType = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'EarningType created successfully.',
                data: createEarningType,
            };
        }
        else {
            return {
                success: false,
                message: 'EarningType already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const earningTypePayload = payload;
        const earningType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(earningTypePayload.id);
        if (earningType) {
            const updatedEarningType = await this.modelClass
                .query()
                .update({
                name: earningTypePayload.name ? earningTypePayload.name : earningType.name,
                type: earningTypePayload.type ? earningTypePayload.type : earningType.type,
                fund: earningTypePayload.fund ? earningTypePayload.fund : earningType.fund,
                rate: earningTypePayload.rate ? earningTypePayload.rate : earningType.rate,
                durationType: earningTypePayload.durationType ? earningTypePayload.durationType : earningType.durationType,
                brandCode: earningTypePayload.brandCode ? earningTypePayload.brandCode : earningType.brandCode,
                updatedBy: currentUser.username,
            })
                .where({ id: earningTypePayload.id });
            return {
                success: true,
                message: 'EarningType details updated successfully.',
                data: updatedEarningType,
            };
        }
        else {
            return {
                success: false,
                message: 'No earningType found.',
                data: {},
            };
        }
    }
    async deleteById(earningTypeId, currentUser) {
        const earningTypes = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: earningTypeId
        })
            .delete();
        if (earningTypes) {
            return {
                success: true,
                message: 'EarningType deleted successfully.',
                data: earningTypes,
            };
        }
        else {
            return {
                success: false,
                message: 'No earningType found.',
                data: {},
            };
        }
    }
};
EarningTypesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('EarningTypeModel')),
    __metadata("design:paramtypes", [Object])
], EarningTypesService);
exports.EarningTypesService = EarningTypesService;
//# sourceMappingURL=earningTypes.service.js.map
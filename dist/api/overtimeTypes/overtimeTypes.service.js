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
exports.OvertimeTypesService = void 0;
const common_1 = require("@nestjs/common");
let OvertimeTypesService = class OvertimeTypesService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const overtimeTypes = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'Overtime Types details fetch successfully.',
            data: overtimeTypes,
        };
    }
    async findById(id, currentUser) {
        const overtimeType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (overtimeType) {
            return {
                success: true,
                message: 'OvertimeType details fetch successfully.',
                data: overtimeType,
            };
        }
        else {
            return {
                success: false,
                message: 'No overtimeType details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const overtimeTypePayload = payload;
        const newOvertimeType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: overtimeTypePayload.name
        });
        if (!newOvertimeType) {
            overtimeTypePayload['createdBy'] = currentUser.username;
            overtimeTypePayload['brandCode'] = currentUser.brandCode;
            overtimeTypePayload.durationType = 'hours';
            const identifiers = await this.modelClass.query().insert(overtimeTypePayload);
            const createOvertimeType = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'OvertimeType created successfully.',
                data: createOvertimeType,
            };
        }
        else {
            return {
                success: false,
                message: 'OvertimeType already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const overtimeTypePayload = payload;
        const overtimeType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(overtimeTypePayload.id);
        if (overtimeType) {
            const updatedOvertimeType = await this.modelClass
                .query()
                .update({
                name: overtimeTypePayload.name ? overtimeTypePayload.name : overtimeType.name,
                fund: overtimeTypePayload.fund ? overtimeTypePayload.fund : overtimeType.fund,
                days: overtimeTypePayload.days ? overtimeTypePayload.days : overtimeType.days,
                hours: overtimeTypePayload.hours ? overtimeTypePayload.hours : overtimeType.hours,
                updatedBy: currentUser.username,
            })
                .where({ id: overtimeTypePayload.id });
            return {
                success: true,
                message: 'OvertimeType details updated successfully.',
                data: updatedOvertimeType,
            };
        }
        else {
            return {
                success: false,
                message: 'No overtimeType found.',
                data: {},
            };
        }
    }
    async deleteById(overtimeTypeId, currentUser) {
        const overtimeTypes = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: overtimeTypeId
        })
            .delete();
        if (overtimeTypes) {
            return {
                success: true,
                message: 'OvertimeType deleted successfully.',
                data: overtimeTypes,
            };
        }
        else {
            return {
                success: false,
                message: 'No overtimeType found.',
                data: {},
            };
        }
    }
};
OvertimeTypesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('OvertimeTypeModel')),
    __metadata("design:paramtypes", [Object])
], OvertimeTypesService);
exports.OvertimeTypesService = OvertimeTypesService;
//# sourceMappingURL=overtimeTypes.service.js.map
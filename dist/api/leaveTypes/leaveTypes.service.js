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
exports.LeaveTypesService = void 0;
const common_1 = require("@nestjs/common");
let LeaveTypesService = class LeaveTypesService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const leaveTypes = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'Leave Types details fetch successfully.',
            data: leaveTypes,
        };
    }
    async findById(id, currentUser) {
        const leaveType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (leaveType) {
            return {
                success: true,
                message: 'LeaveType details fetch successfully.',
                data: leaveType,
            };
        }
        else {
            return {
                success: false,
                message: 'No leaveType details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const leaveTypePayload = payload;
        const newLeaveType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: leaveTypePayload.name
        });
        if (!newLeaveType) {
            leaveTypePayload['createdBy'] = currentUser.username;
            leaveTypePayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(leaveTypePayload);
            const createLeaveType = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'LeaveType created successfully.',
                data: createLeaveType,
            };
        }
        else {
            return {
                success: false,
                message: 'LeaveType already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const leaveTypePayload = payload;
        const leaveType = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(leaveTypePayload.id);
        if (leaveType) {
            const updatedLeaveType = await this.modelClass
                .query()
                .update({
                name: leaveTypePayload.name ? leaveTypePayload.name : leaveType.name,
                fund: leaveTypePayload.fund ? leaveTypePayload.fund : leaveType.fund,
                days: leaveTypePayload.days ? leaveTypePayload.days : leaveType.days,
                hours: leaveTypePayload.hours ? leaveTypePayload.hours : leaveType.hours,
                durationType: leaveTypePayload.durationType ? leaveTypePayload.durationType : leaveType.durationType,
                urgent: typeof payload.urgent === 'boolean' ? payload.urgent : leaveType.urgent,
                updatedBy: currentUser.username,
            })
                .where({ id: leaveTypePayload.id });
            return {
                success: true,
                message: 'LeaveType details updated successfully.',
                data: updatedLeaveType,
            };
        }
        else {
            return {
                success: false,
                message: 'No leaveType found.',
                data: {},
            };
        }
    }
    async deleteById(leaveTypeId, currentUser) {
        const leaveTypes = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: leaveTypeId
        })
            .delete();
        if (leaveTypes) {
            return {
                success: true,
                message: 'LeaveType deleted successfully.',
                data: leaveTypes,
            };
        }
        else {
            return {
                success: false,
                message: 'No leaveType found.',
                data: {},
            };
        }
    }
};
LeaveTypesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('LeaveTypeModel')),
    __metadata("design:paramtypes", [Object])
], LeaveTypesService);
exports.LeaveTypesService = LeaveTypesService;
//# sourceMappingURL=leaveTypes.service.js.map
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
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
let LeavesService = class LeavesService {
    constructor(modelClass, employeeClass, leaveApprovalClass) {
        this.modelClass = modelClass;
        this.employeeClass = employeeClass;
        this.leaveApprovalClass = leaveApprovalClass;
    }
    async findAllApproval(currentUser) {
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            userId: currentUser.id
        });
        if (currentEmployee.hrMember == true) {
            const leaves = await this.leaveApprovalClass.query()
                .where({ brandCode: currentUser.brandCode });
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leaves,
            };
        }
        else {
            const leaves = await this.leaveApprovalClass.query()
                .where({ brandCode: currentUser.brandCode, managerId: currentEmployee.id });
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leaves,
            };
        }
    }
    async findAll(currentUser) {
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            userId: currentUser.id
        });
        if (currentEmployee.hrMember === true) {
            const leaves = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode });
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leaves,
            };
        }
        else {
            const leaves = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode, employeeId: currentEmployee.id });
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leaves,
            };
        }
    }
    async findById(id, currentUser) {
        const leave = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (leave) {
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leave,
            };
        }
        else {
            return {
                success: false,
                message: 'No leave details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const leavePayload = payload;
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            userId: currentUser.id
        });
        leavePayload['createdBy'] = currentUser.username;
        leavePayload['brandCode'] = currentUser.brandCode;
        const identifiersInst = await this.modelClass.query().insert(leavePayload);
        if (identifiersInst && currentEmployee.managerId) {
            const identifiers = await this.leaveApprovalClass.query().insert({ leaveId: identifiersInst.id, managerId: currentEmployee.managerId });
        }
        else {
            return {
                success: false,
                message: "couldnt create the leave",
                data: {}
            };
        }
        const createLeave = await this.modelClass.query().findById(identifiersInst.id);
        return {
            success: true,
            message: 'Leave created successfully.',
            data: createLeave,
        };
    }
    async updateApproval(payload, currentUser) {
        const leavePayload = payload;
        const currentEMployee = await this.employeeClass.query()
            .findOne({ userId: currentUser.id });
        const leave = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(leavePayload.id)
            .withGraphFetched({ employee: {} });
        if (!currentEMployee) {
            return {
                success: false,
                message: "no employee found",
                data: {}
            };
        }
        if (currentEMployee.id !== leave.employee.userId) {
            return {
                success: false,
                message: "no manager found",
                data: {}
            };
        }
        if (leave) {
            const updatedLeave = await this.modelClass
                .query()
                .update({
                status: leavePayload.status ? leavePayload.status : leave.status,
                updatedBy: currentUser.username,
            })
                .where({ id: leavePayload.id });
            const updatedLeaveApproval = await this.leaveApprovalClass
                .query()
                .update({
                status: leavePayload.status ? leavePayload.status : leave.status,
                updatedBy: currentUser.username,
            })
                .where({ id: leavePayload.id });
            return {
                success: true,
                message: 'Leave details updated successfully.',
                data: updatedLeave,
            };
        }
        else {
            return {
                success: false,
                message: 'No leave found.',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const leavePayload = payload;
        const leave = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(leavePayload.id);
        if (leave) {
            const updatedLeave = await this.modelClass
                .query()
                .update({
                name: leavePayload.name ? leavePayload.name : leave.name,
                updatedBy: currentUser.username,
            })
                .where({ id: leavePayload.id });
            return {
                success: true,
                message: 'Leave details updated successfully.',
                data: updatedLeave,
            };
        }
        else {
            return {
                success: false,
                message: 'No leave found.',
                data: {},
            };
        }
    }
    async deleteById(leaveId, currentUser) {
        const leaves = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: leaveId
        })
            .delete();
        if (leaves) {
            return {
                success: true,
                message: 'Leave deleted successfully.',
                data: leaves,
            };
        }
        else {
            return {
                success: false,
                message: 'No leave found.',
                data: {},
            };
        }
    }
};
LeavesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('LeaveModel')),
    __param(1, common_1.Inject('EmployeeModel')),
    __param(2, common_1.Inject('LeaveApprovalModel')),
    __metadata("design:paramtypes", [Object, Object, Object])
], LeavesService);
exports.LeavesService = LeavesService;
//# sourceMappingURL=leaves.service.js.map
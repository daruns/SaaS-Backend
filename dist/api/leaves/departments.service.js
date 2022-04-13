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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
let DepartmentsService = class DepartmentsService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const departments = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({
            designations: {}
        });
        return {
            success: true,
            message: 'InventoryItem details fetch successfully.',
            data: departments,
        };
    }
    async findById(id, currentUser) {
        const department = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({
            designations: {}
        });
        if (department) {
            return {
                success: true,
                message: 'Department details fetch successfully.',
                data: department,
            };
        }
        else {
            return {
                success: false,
                message: 'No department details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const departmentPayload = payload;
        const newDepartment = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: departmentPayload.name
        });
        if (!newDepartment) {
            departmentPayload['createdBy'] = currentUser.username;
            departmentPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(departmentPayload);
            const createDepartment = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'Department created successfully.',
                data: createDepartment,
            };
        }
        else {
            return {
                success: false,
                message: 'Department already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const departmentPayload = payload;
        const department = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(departmentPayload.id);
        if (department) {
            const updatedDepartment = await this.modelClass
                .query()
                .update({
                name: departmentPayload.name ? departmentPayload.name : department.name,
                updatedBy: currentUser.username,
            })
                .where({ id: departmentPayload.id });
            return {
                success: true,
                message: 'Department details updated successfully.',
                data: updatedDepartment,
            };
        }
        else {
            return {
                success: false,
                message: 'No department found.',
                data: {},
            };
        }
    }
    async deleteById(departmentId, currentUser) {
        const departments = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: departmentId
        })
            .delete();
        if (departments) {
            return {
                success: true,
                message: 'Department deleted successfully.',
                data: departments,
            };
        }
        else {
            return {
                success: false,
                message: 'No department found.',
                data: {},
            };
        }
    }
};
DepartmentsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('DepartmentModel')),
    __metadata("design:paramtypes", [Object])
], DepartmentsService);
exports.DepartmentsService = DepartmentsService;
//# sourceMappingURL=departments.service.js.map
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
exports.DesignationsService = void 0;
const common_1 = require("@nestjs/common");
let DesignationsService = class DesignationsService {
    constructor(modelClass, departmentClass) {
        this.modelClass = modelClass;
        this.departmentClass = departmentClass;
    }
    async findAll(currentUser) {
        const designations = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({
            department: {}
        });
        return {
            success: true,
            message: 'Departments details fetch successfully.',
            data: designations,
        };
    }
    async findById(id, currentUser) {
        const designation = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({
            department: {}
        });
        if (designation) {
            return {
                success: true,
                message: 'Designation details fetch successfully.',
                data: designation,
            };
        }
        else {
            return {
                success: false,
                message: 'No designation details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const designationPayload = payload;
        const newDesignation = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: designationPayload.name,
            departmentId: designationPayload.departmentId,
        });
        const departmentFnd = await this.departmentClass.query().findById(designationPayload.departmentId);
        if (!departmentFnd) {
            return {
                success: false,
                message: "Department not found!",
                data: {}
            };
        }
        if (!newDesignation) {
            designationPayload['createdBy'] = currentUser.username;
            designationPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(designationPayload);
            const createDesignation = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'Designation created successfully.',
                data: createDesignation,
            };
        }
        else {
            return {
                success: false,
                message: 'Designation already exists with this name!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const designationPayload = payload;
        const designation = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(designationPayload.id);
        if (designationPayload.departmentId) {
            const departmentFnd = await this.departmentClass.query()
                .where({ brandCode: currentUser.brandCode })
                .findOne({
                name: designationPayload.name,
            });
            if (!departmentFnd) {
                return {
                    success: false,
                    message: 'Department not found',
                    data: {}
                };
            }
        }
        if (designation) {
            const updatedDesignation = await this.modelClass
                .query()
                .update({
                name: designationPayload.name ? designationPayload.name : designation.name,
                departmentId: designationPayload.departmentId ? designationPayload.departmentId : designation.departmentId,
                updatedBy: currentUser.username,
            })
                .where({ id: designationPayload.id });
            return {
                success: true,
                message: 'Designation details updated successfully.',
                data: updatedDesignation,
            };
        }
        else {
            return {
                success: false,
                message: 'No designation found.',
                data: {},
            };
        }
    }
    async deleteById(designationId, currentUser) {
        const designations = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: designationId
        })
            .delete();
        if (designations) {
            return {
                success: true,
                message: 'Designation deleted successfully.',
                data: designations,
            };
        }
        else {
            return {
                success: false,
                message: 'No designation found.',
                data: {},
            };
        }
    }
};
DesignationsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('DesignationModel')),
    __param(1, common_1.Inject('DepartmentModel')),
    __metadata("design:paramtypes", [Object, Object])
], DesignationsService);
exports.DesignationsService = DesignationsService;
//# sourceMappingURL=designations.service.js.map
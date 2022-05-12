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
exports.DeductionsService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
let DeductionsService = class DeductionsService {
    constructor(modelClass, deductionTypeClass, employeeClass) {
        this.modelClass = modelClass;
        this.deductionTypeClass = deductionTypeClass;
        this.employeeClass = employeeClass;
    }
    async findAll(currentUser) {
        const deductions = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({ deductionType: true, employee: true });
        return {
            success: true,
            message: 'Deduction details fetch successfully.',
            data: deductions,
        };
    }
    async findById(id, currentUser) {
        const deduction = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({ deductionType: true, employee: true });
        if (deduction) {
            return {
                success: true,
                message: 'Deduction details fetch successfully.',
                data: deduction,
            };
        }
        else {
            return {
                success: false,
                message: 'No deduction details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const deductionPayload = payload;
        const employeeFnd = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(deductionPayload.employeeId);
        if (!employeeFnd) {
            return {
                success: false,
                message: 'Employee doesnt exist.',
                data: {},
            };
        }
        const deductionTypeFnd = await this.deductionTypeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(deductionPayload.deductionTypeId);
        if (!deductionTypeFnd) {
            return {
                success: false,
                message: 'DeductionType doesnt exist.',
                data: {},
            };
        }
        deductionPayload.total = deductionPayload.qty * deductionTypeFnd.fund;
        deductionPayload.deductionTypeId = deductionTypeFnd.id;
        deductionPayload.date = moment(deductionPayload.date).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss').toString();
        deductionPayload.createdBy = currentUser.username;
        deductionPayload.brandCode = currentUser.brandCode;
        const identifiers = await this.modelClass.query().insert(deductionPayload);
        const createDeduction = await this.modelClass.query().findById(identifiers.id);
        return {
            success: true,
            message: 'Deduction created successfully.',
            data: createDeduction,
        };
    }
    async update(payload, currentUser) {
        var _a;
        const deductionPayload = payload;
        const deduction = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(deductionPayload.id)
            .withGraphFetched({ deductionType: true, employee: true });
        if (deduction) {
            if (deductionPayload.employeeId) {
                const employeeFnd = await this.employeeClass.query()
                    .where({ brandCode: currentUser.brandCode })
                    .findById(deductionPayload.employeeId);
                if (!employeeFnd) {
                    return {
                        success: false,
                        message: 'Employee doesnt exist.',
                        data: {},
                    };
                }
            }
            let earnQty = deduction.qty;
            let earntypefund = (_a = deduction.deductionType) === null || _a === void 0 ? void 0 : _a.fund;
            if (deductionPayload.qty) {
                earnQty = deductionPayload.qty;
            }
            if (deductionPayload.deductionTypeId) {
                const deductionTypeFnd = await this.deductionTypeClass.query()
                    .where({ brandCode: currentUser.brandCode })
                    .findById(deductionPayload.deductionTypeId);
                if (!deductionTypeFnd) {
                    return {
                        success: false,
                        message: 'DeductionType doesnt exist.',
                        data: {},
                    };
                }
                earntypefund = deductionTypeFnd.fund;
                deductionPayload.deductionTypeId = deductionTypeFnd.id;
            }
            deductionPayload.total = earntypefund * earnQty;
            deductionPayload.date = deductionPayload.date ? moment(deductionPayload.date).format('YYYY-MM-DD HH:mm:ss').toString() : deduction.date;
            const updatedDeduction = await this.modelClass
                .query()
                .update({
                description: deductionPayload.description ? deductionPayload.description : deduction.description,
                qty: deductionPayload.qty ? deductionPayload.qty : deduction.qty,
                total: deductionPayload.total ? deductionPayload.total : deduction.total,
                date: deductionPayload.date ? deductionPayload.date : deduction.date,
                employeeId: deductionPayload.employeeId ? deductionPayload.employeeId : deduction.employeeId,
                deductionTypeId: deductionPayload.deductionTypeId ? deductionPayload.deductionTypeId : deduction.deductionTypeId,
                updatedBy: currentUser.username,
            })
                .where({ id: deductionPayload.id });
            return {
                success: true,
                message: 'Deduction details updated successfully.',
                data: updatedDeduction,
            };
        }
        else {
            return {
                success: false,
                message: 'No deduction found.',
                data: {},
            };
        }
    }
    async deleteById(deductionId, currentUser) {
        const deductions = await this.modelClass.query()
            .delete()
            .where({
            brandCode: currentUser.brandCode,
            id: deductionId
        });
        if (deductions) {
            return {
                success: true,
                message: 'Deduction deleted successfully.',
                data: deductions,
            };
        }
        else {
            return {
                success: false,
                message: 'No deduction found.',
                data: {},
            };
        }
    }
};
DeductionsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('DeductionModel')),
    __param(1, common_1.Inject('DeductionTypeModel')),
    __param(2, common_1.Inject('EmployeeModel')),
    __metadata("design:paramtypes", [Object, Object, Object])
], DeductionsService);
exports.DeductionsService = DeductionsService;
//# sourceMappingURL=deductions.service.js.map
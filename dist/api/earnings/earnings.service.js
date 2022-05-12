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
exports.EarningsService = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("../employees/employees.service");
const moment = require("moment");
const earningTypes_service_1 = require("../earningTypes/earningTypes.service");
let EarningsService = class EarningsService {
    constructor(modelClass, employeeSerive, earningTypeSerive) {
        this.modelClass = modelClass;
        this.employeeSerive = employeeSerive;
        this.earningTypeSerive = earningTypeSerive;
    }
    async findAll(currentUser) {
        const earnings = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({ earningType: true, employee: true });
        return {
            success: true,
            message: 'Earning details fetch successfully.',
            data: earnings,
        };
    }
    async findById(id, currentUser) {
        const earning = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({ earningType: true, employee: true });
        if (earning) {
            return {
                success: true,
                message: 'Earning details fetch successfully.',
                data: earning,
            };
        }
        else {
            return {
                success: false,
                message: 'No earning details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        var _a;
        const earningPayload = payload;
        const employeeFnd = await this.employeeSerive.findById(earningPayload.employeeId, currentUser);
        if (!employeeFnd.success) {
            return {
                success: false,
                message: 'Employee doesnt exist.',
                data: {},
            };
        }
        const earningTypeFnd = await this.earningTypeSerive.findById(earningPayload.earningTypeId, currentUser);
        if (!earningTypeFnd.success) {
            return {
                success: false,
                message: 'EarningType doesnt exist.',
                data: {},
            };
        }
        earningPayload.total = Number(earningPayload.qty || 0) * Number(((_a = earningTypeFnd === null || earningTypeFnd === void 0 ? void 0 : earningTypeFnd.data) === null || _a === void 0 ? void 0 : _a.fund) || 0);
        earningPayload.earningTypeId = earningTypeFnd === null || earningTypeFnd === void 0 ? void 0 : earningTypeFnd.data.id;
        earningPayload.date = moment(earningPayload.date).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss').toString();
        earningPayload.createdBy = currentUser.username;
        earningPayload.brandCode = currentUser.brandCode;
        const identifiers = await this.modelClass.query().insert(earningPayload);
        const createEarning = await this.modelClass.query().findById(identifiers.id);
        return {
            success: true,
            message: 'Earning created successfully.',
            data: createEarning,
        };
    }
    async update(payload, currentUser) {
        var _a;
        const earningPayload = payload;
        const earning = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(earningPayload.id)
            .withGraphFetched({ earningType: true, employee: true });
        if (earning) {
            if (earningPayload.employeeId) {
                const employeeFnd = await this.employeeSerive.findById(earningPayload.employeeId, currentUser);
                if (!employeeFnd.success) {
                    return {
                        success: false,
                        message: 'Employee doesnt exist.',
                        data: {},
                    };
                }
            }
            let earnQty = earning.qty;
            let earntypefund = (_a = earning.earningType) === null || _a === void 0 ? void 0 : _a.fund;
            if (earningPayload.qty) {
                earnQty = earningPayload.qty;
            }
            if (earningPayload.earningTypeId) {
                const earningTypeFnd = await this.earningTypeSerive.findById(earningPayload.earningTypeId, currentUser);
                if (!earningTypeFnd.success) {
                    return {
                        success: false,
                        message: 'EarningType doesnt exist.',
                        data: {},
                    };
                }
                earntypefund = earningTypeFnd.data.fund;
                earningPayload.earningTypeId = earningTypeFnd === null || earningTypeFnd === void 0 ? void 0 : earningTypeFnd.data.id;
            }
            earningPayload.total = earntypefund * earnQty;
            earningPayload.date = earningPayload.date ? moment(earningPayload.date).format('YYYY-MM-DD HH:mm:ss').toString() : earning.date;
            const updatedEarning = await this.modelClass
                .query()
                .update({
                description: earningPayload.description ? earningPayload.description : earning.description,
                qty: earningPayload.qty ? earningPayload.qty : earning.qty,
                total: earningPayload.total ? earningPayload.total : earning.total,
                date: earningPayload.date ? earningPayload.date : earning.date,
                employeeId: earningPayload.employeeId ? earningPayload.employeeId : earning.employeeId,
                earningTypeId: earningPayload.earningTypeId ? earningPayload.earningTypeId : earning.earningTypeId,
                updatedBy: currentUser.username,
            })
                .where({ id: earningPayload.id });
            return {
                success: true,
                message: 'Earning details updated successfully.',
                data: updatedEarning,
            };
        }
        else {
            return {
                success: false,
                message: 'No earning found.',
                data: {},
            };
        }
    }
    async deleteById(earningId, currentUser) {
        const earnings = await this.modelClass.query()
            .delete()
            .where({
            brandCode: currentUser.brandCode,
            id: earningId
        });
        if (earnings) {
            return {
                success: true,
                message: 'Earning deleted successfully.',
                data: earnings,
            };
        }
        else {
            return {
                success: false,
                message: 'No earning found.',
                data: {},
            };
        }
    }
};
EarningsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('EarningModel')),
    __metadata("design:paramtypes", [Object, employees_service_1.EmployeesService,
        earningTypes_service_1.EarningTypesService])
], EarningsService);
exports.EarningsService = EarningsService;
//# sourceMappingURL=earnings.service.js.map
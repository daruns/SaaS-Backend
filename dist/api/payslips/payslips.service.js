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
exports.PayslipsService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const overtime_status_dto_1 = require("../overtimes/dto/overtime-status.dto");
const leave_status_dto_1 = require("../leaves/dto/leave-status.dto");
let PayslipsService = class PayslipsService {
    constructor(modelClass, employeeClass, leavesClass, overtimeClass, earningClass, deductionClass, payslipEarningClass, payslipDeductionClass) {
        this.modelClass = modelClass;
        this.employeeClass = employeeClass;
        this.leavesClass = leavesClass;
        this.overtimeClass = overtimeClass;
        this.earningClass = earningClass;
        this.deductionClass = deductionClass;
        this.payslipEarningClass = payslipEarningClass;
        this.payslipDeductionClass = payslipDeductionClass;
    }
    async findAll(currentUser) {
        const payslips = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .modifiers({
            selectUser(builder) {
                builder.select('name');
                builder.select('email');
                builder.select('phoneNumber');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
        })
            .withGraphFetched(`
        [
          employee.[user(selectUser)],
          payslipEarnings,
          payslipDeductions,
        ]
      `);
        return {
            success: true,
            message: 'Payslips details fetch successfully.',
            data: payslips,
        };
    }
    async findById(id, currentUser) {
        const payslip = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .modifiers({
            selectUser(builder) {
                builder.select('name');
                builder.select('email');
                builder.select('phoneNumber');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
        })
            .withGraphFetched(`
          [
            employee.[user(selectUser)],
            payslipEarnings,
            payslipDeductions,
          ]
        `);
        if (payslip) {
            return {
                success: true,
                message: 'Payslip details fetch successfully.',
                data: payslip,
            };
        }
        else {
            return {
                success: false,
                message: 'No payslip details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        var _a, _b;
        const payslipPayload = payload;
        const currentPayslip = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode, employeeId: payslipPayload.employeeId })
            .where('fromDate', 'like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%');
        if (currentPayslip.length > 0) {
            return {
                success: false,
                message: "Payslip already exist for this date",
                data: {}
            };
        }
        let finalEarningItems = { 'overtimes': 0 };
        let finalDeductionItems = { 'leaves': 0 };
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            id: payslipPayload.employeeId
        });
        if (!currentEmployee) {
            return {
                success: false,
                message: "The employee doesnt exist!",
                data: {},
            };
        }
        let workingHours = Number(currentEmployee.workingHours) ? Number(currentEmployee.workingHours) : 8;
        const currentLeaves = await this.leavesClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({ employeeId: currentEmployee.id })
            .where({ status: leave_status_dto_1.LeaveStatusLayers.completed })
            .where('from', 'like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
            .withGraphFetched({ leaveType: true });
        let leavesTotal = 0;
        if (currentLeaves.length) {
            for (let curleave of currentLeaves) {
                if (((_a = curleave.leaveType) === null || _a === void 0 ? void 0 : _a.durationType) === "days") {
                    leavesTotal += (Number(curleave.currentBalance) - Number(curleave.remainBalance)) * Number(curleave.leaveType.fund ? curleave.leaveType.fund : 1);
                }
                else if (((_b = curleave.leaveType) === null || _b === void 0 ? void 0 : _b.durationType) === "hours") {
                    leavesTotal += (Number(curleave.currentBalance) - Number(curleave.remainBalance)) * (Number(curleave.leaveType.fund ? curleave.leaveType.fund : 1) / workingHours);
                }
            }
        }
        finalDeductionItems["leaves"] = leavesTotal;
        const currentOvertimes = await this.overtimeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({
            employeeId: currentEmployee.id
        })
            .where({ status: overtime_status_dto_1.OvertimeStatusLayers.completed })
            .where('from', 'like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
            .withGraphFetched({ overtimeType: true });
        let overtimesTotal = 0;
        if (currentOvertimes.length) {
            for (let curovertime of currentOvertimes) {
                overtimesTotal += (Number(curovertime.currentBalance) - Number(curovertime.remainBalance)) * (Number(curovertime.overtimeType.fund) / workingHours);
            }
        }
        finalEarningItems["overtimes"] = overtimesTotal;
        const currentDeductions = await this.deductionClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({
            employeeId: currentEmployee.id
        })
            .where('date', 'like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
            .withGraphFetched({ deductionType: true });
        if (currentDeductions.length) {
            for (let curdeduction of currentDeductions) {
                if (curdeduction.deductionType)
                    finalDeductionItems[curdeduction.deductionType.name] += curdeduction.total;
            }
        }
        const currentEarnings = await this.earningClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({
            employeeId: currentEmployee.id
        })
            .where('date', 'like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
            .withGraphFetched({ earningType: true });
        if (currentEarnings.length) {
            for (let curearning of currentEarnings) {
                if (curearning.earningType)
                    finalEarningItems[curearning.earningType.name] = curearning.total;
            }
        }
        const earningSum = Object.values(finalEarningItems).reduce((a, b) => { return a + b; }, 0);
        const deductionSum = Object.values(finalDeductionItems).reduce((a, b) => { return a + b; }, 0);
        const netSalary = Number(earningSum + currentEmployee.salary) - Number(deductionSum);
        const payslipParamsToAdd = {
            basicSalary: currentEmployee.salary,
            employeeId: currentEmployee.id,
            netSalary: netSalary,
            fromDate: new Date(moment(payslipPayload.fromDate).format('YYYY-MM-01 03:00:00').toString()),
            createdBy: currentUser.username,
            brandCode: currentUser.brandCode
        };
        const identifiers = await this.modelClass.query().insert(payslipParamsToAdd);
        const createPayslip = await this.modelClass.query().findById(identifiers.id);
        Object.keys(finalEarningItems).forEach(async (element) => {
            const insertearningItems = await this.payslipEarningClass.query().insert({
                name: element,
                amount: finalEarningItems[element],
                payslipId: identifiers.id,
                createdBy: currentUser.username,
                brandCode: currentUser.brandCode
            });
        });
        Object.keys(finalDeductionItems).forEach(async (element) => {
            const insertDeductionItems = await this.payslipDeductionClass.query().insert({
                name: element,
                amount: finalDeductionItems[element],
                payslipId: identifiers.id,
                createdBy: currentUser.username,
                brandCode: currentUser.brandCode
            });
        });
        return {
            success: true,
            message: 'Payslip created successfully.',
            data: createPayslip,
        };
    }
    async deleteById(payslipId, currentUser) {
        const trx = await this.modelClass.startTransaction();
        try {
            const payslips = await this.modelClass.query(trx)
                .findOne({
                brandCode: currentUser.brandCode,
                id: payslipId
            });
            if (payslips) {
                const deletedPayslip = await this.modelClass.query(trx)
                    .findOne({
                    brandCode: currentUser.brandCode,
                    id: payslipId
                })
                    .delete();
                const payslipsDeductionDelete = await this.payslipDeductionClass.query(trx)
                    .where({
                    brandCode: currentUser.brandCode,
                    payslipId: payslipId
                })
                    .delete();
                const payslipsEarningDelete = await this.payslipEarningClass.query(trx)
                    .where({
                    brandCode: currentUser.brandCode,
                    payslipId: payslipId
                });
                await trx.commit();
                return {
                    success: true,
                    message: 'Payslip deleted successfully.',
                    data: deletedPayslip,
                };
            }
            else {
                return {
                    success: false,
                    message: 'No payslip found.',
                    data: {},
                };
            }
        }
        catch (err) {
            await trx.rollback();
            return {
                success: false,
                message: `Something went wrong. couldnt delete Payslip.`,
                data: err,
            };
        }
    }
};
PayslipsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PayslipModel')),
    __param(1, common_1.Inject('EmployeeModel')),
    __param(2, common_1.Inject('LeaveModel')),
    __param(3, common_1.Inject('OvertimeModel')),
    __param(4, common_1.Inject('EarningModel')),
    __param(5, common_1.Inject('DeductionModel')),
    __param(6, common_1.Inject('PayslipEarningModel')),
    __param(7, common_1.Inject('PayslipDeductionModel')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], PayslipsService);
exports.PayslipsService = PayslipsService;
//# sourceMappingURL=payslips.service.js.map
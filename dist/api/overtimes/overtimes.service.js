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
exports.OvertimesService = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../app/app.service");
const user_layers_dto_1 = require("../auth/dto/user-layers.dto");
const overtime_status_dto_1 = require("./dto/overtime-status.dto");
const moment = require("moment");
let OvertimesService = class OvertimesService {
    constructor(modelClass, employeeClass, overtimeTypeClass, overtimeApprovalClass) {
        this.modelClass = modelClass;
        this.employeeClass = employeeClass;
        this.overtimeTypeClass = overtimeTypeClass;
        this.overtimeApprovalClass = overtimeApprovalClass;
    }
    async findMyOvertimes(currentUser) {
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            userId: currentUser.id
        });
        if (currentEmployee) {
            const overtimes = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode, employeeId: currentUser.myEmployeeProfile.id })
                .modifiers({
                overtimeTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                overtimeApprovalsParams(builder) {
                    builder.select('id');
                    builder.select('managerId');
                    builder.select('status');
                    builder.select('createdAt');
                },
                userParams(builder) {
                    builder.select('name');
                    builder.select('avatar');
                    builder.select('users.id as userId');
                    builder.select('name');
                },
            })
                .withGraphFetched(`
          [
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'My Overtime details fetch successfully.',
                data: overtimes,
            };
        }
    }
    async findAllApprovals(currentUser) {
        if (currentUser.myEmployeeProfile && currentUser.myEmployeeProfile.hrMember === 1) {
            const overtimesFnd = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .whereIn('status', [overtime_status_dto_1.OvertimeStatusLayers.completed, overtime_status_dto_1.OvertimeStatusLayers.pending, overtime_status_dto_1.OvertimeStatusLayers.rejected])
                .modifiers({
                overtimeTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                overtimeApprovalsParams(builder) {
                    builder.select('id');
                    builder.select('managerId');
                    builder.select('status');
                    builder.select('createdAt');
                },
                userParams(builder) {
                    builder.select('name');
                    builder.select('avatar');
                    builder.select('users.id as userId');
                    builder.select('name');
                },
            })
                .withGraphFetched(`
          [
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            const result = overtimesFnd.filter(props => {
                if (props.overtimeApprovals.every(ee => ee.status !== 'rejected') && props.status === 'rejected') {
                    return true;
                }
                else if (props.overtimeApprovals.every(ee => ee.status === 'completed') && props.status === 'completed') {
                    return true;
                }
                else if (props.overtimeApprovals.every(ee => ee.status === 'completed') && props.status === 'pending') {
                    return true;
                }
                else if (props.overtimeApprovals.length === 0 && !props.employee.manager) {
                    return true;
                }
                else
                    return false;
            });
            return {
                success: true,
                message: 'Overtime details fetch successfully.',
                data: result,
            };
        }
        if (currentUser.myEmployeeProfile && app_service_1.getUserType(currentUser) === user_layers_dto_1.UserLayers.layerTwo) {
            const overtimes = await this.overtimeApprovalClass.query()
                .where({ brandCode: currentUser.brandCode, managerId: currentUser.myEmployeeProfile.id })
                .whereIn('status', [overtime_status_dto_1.OvertimeStatusLayers.completed, overtime_status_dto_1.OvertimeStatusLayers.pending, overtime_status_dto_1.OvertimeStatusLayers.rejected]);
            const overtimesFnd = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .whereIn('id', overtimes.map(e => e.overtimeId))
                .whereIn('status', [overtime_status_dto_1.OvertimeStatusLayers.completed, overtime_status_dto_1.OvertimeStatusLayers.pending, overtime_status_dto_1.OvertimeStatusLayers.rejected])
                .modifiers({
                overtimeTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                overtimeApprovalsParams(builder) {
                    builder.select('id');
                    builder.select('managerId');
                    builder.select('status');
                    builder.select('createdAt');
                },
                userParams(builder) {
                    builder.select('name');
                    builder.select('avatar');
                    builder.select('users.id as userId');
                    builder.select('name');
                },
            })
                .withGraphFetched(`
          [
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'Overtime details fetch successfully.',
                data: overtimesFnd,
            };
        }
        return {
            success: false,
            message: "You are not allowed for this section!",
            data: []
        };
    }
    async findAll(currentUser) {
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ userId: currentUser.id });
        if (app_service_1.getUserType(currentUser) === user_layers_dto_1.UserLayers.layerOne) {
            const overtimes = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .modifiers({
                overtimeTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                overtimeApprovalsParams(builder) {
                    builder.select('id');
                    builder.select('managerId');
                    builder.select('status');
                    builder.select('createdAt');
                },
                userParams(builder) {
                    builder.select('name');
                    builder.select('avatar');
                    builder.select('users.id as userId');
                    builder.select('name');
                },
            })
                .withGraphFetched(`
          [
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'Overtime details fetch successfully.',
                data: overtimes,
            };
        }
        if (!currentEmployee) {
            return {
                success: false,
                message: "user not found",
                data: {},
            };
        }
        if (currentEmployee.hrMember == true) {
            const overtimes = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .modifiers({
                overtimeTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                overtimeApprovalsParams(builder) {
                    builder.select('id');
                    builder.select('managerId');
                    builder.select('status');
                    builder.select('createdAt');
                },
                userParams(builder) {
                    builder.select('name');
                    builder.select('avatar');
                    builder.select('users.id as userId');
                    builder.select('name');
                },
            })
                .withGraphFetched(`
          [
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'Overtime details fetch successfully.',
                data: overtimes,
            };
        }
        else {
            const overtimes = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode, employeeId: currentEmployee.id })
                .modifiers({
                overtimeTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                overtimeApprovalsParams(builder) {
                    builder.select('id');
                    builder.select('managerId');
                    builder.select('status');
                    builder.select('createdAt');
                },
                userParams(builder) {
                    builder.select('name');
                    builder.select('avatar');
                    builder.select('users.id as userId');
                    builder.select('name');
                },
            })
                .withGraphFetched(`
          [
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'Overtime details fetch successfully.',
                data: overtimes,
            };
        }
    }
    async findById(id, currentUser) {
        const overtime = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (overtime) {
            return {
                success: true,
                message: 'Overtime details fetch successfully.',
                data: overtime,
            };
        }
        else {
            return {
                success: false,
                message: 'No overtime details found.',
                data: {},
            };
        }
    }
    async createOvertime(payload, currentUser) {
        var _a, _b;
        const overtimePayload = payload;
        if (currentUser.myEmployeeProfile &&
            app_service_1.getUserType(currentUser) !== user_layers_dto_1.UserLayers.layerOne &&
            !((_a = currentUser.myEmployeeProfile) === null || _a === void 0 ? void 0 : _a.hrMember)) {
            overtimePayload.employeeId = currentUser.myEmployeeProfile.id;
        }
        if (!overtimePayload.employeeId &&
            app_service_1.getUserType(currentUser) !== user_layers_dto_1.UserLayers.layerOne &&
            (currentUser.myEmployeeProfile && ((_b = currentUser.myEmployeeProfile) === null || _b === void 0 ? void 0 : _b.hrMember))) {
            overtimePayload.employeeId = currentUser.myEmployeeProfile.id;
        }
        if (!overtimePayload.employeeId) {
            return {
                success: false,
                message: "The employeeId is required!",
                data: {},
            };
        }
        const currentOvertimeType = await this.overtimeTypeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            id: overtimePayload.overtimeTypeId
        });
        if (!currentOvertimeType) {
            return {
                success: false,
                message: "The overtimeType doesnt exist!",
                data: {},
            };
        }
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            id: overtimePayload.employeeId
        });
        if (!currentEmployee) {
            return {
                success: false,
                message: "The employee doesnt exist!",
                data: {},
            };
        }
        const currentOvertimeTypeMax = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({
            employeeId: currentEmployee.id,
            overtimeTypeId: currentOvertimeType.id,
        })
            .whereIn('status', [overtime_status_dto_1.OvertimeStatusLayers.pending, overtime_status_dto_1.OvertimeStatusLayers.completed]);
        let hours = currentOvertimeTypeMax.map((qqw) => {
            return Number(qqw.currentBalance - qqw.remainBalance);
        }).reduce((a, b) => { return a + b; }, 0);
        if (currentOvertimeType.hours <= hours) {
            return {
                success: false,
                message: "The overtimeType exceeded the current overtimetype limited hours!",
                data: {},
            };
        }
        if (currentUser.myEmployeeProfile.hrMember) {
            overtimePayload['status'] = overtime_status_dto_1.OvertimeStatusLayers.completed;
        }
        else {
            overtimePayload['status'] = overtime_status_dto_1.OvertimeStatusLayers.pending;
        }
        overtimePayload['createdBy'] = currentUser.username;
        overtimePayload['brandCode'] = currentUser.brandCode;
        if (Number(new Date(overtimePayload.from)) > Number(new Date(overtimePayload.to))) {
            return {
                success: false,
                message: "The to is bigger than from!",
                data: {},
            };
        }
        const overtimeDurationInHours = Number(new Date(overtimePayload.to)) - Number(new Date(overtimePayload.from)) / 3600000;
        console.log(`overtime durationDays ${overtimeDurationInHours}`);
        console.log(`overtimePayload.from ${overtimePayload.from} === ${overtimePayload.to}`);
        if (overtimeDurationInHours >= currentEmployee.overtimeBalance) {
            return {
                success: false,
                message: "The duration is bigger than balance!",
                data: {},
            };
        }
        if (overtimeDurationInHours > currentOvertimeType.hours) {
            return {
                success: false,
                message: "The duration is bigger than overtime type hours!",
                data: {},
            };
        }
        let initFrom = overtimePayload.from.toString().split(" ").length === 1 ? overtimePayload.from + " 00:00:00" : overtimePayload.from;
        let initTo = overtimePayload.to.toString().split(" ").length === 1 ? overtimePayload.to + " 00:00:00" : overtimePayload.to;
        let fromparsedAfter = moment(initFrom).add(1, 'days');
        let toparsedAfter = moment(initTo).add(1, 'days');
        let fromparsedwithoutAfter = moment(initFrom);
        let toparsedwithoutAfter = moment(initTo);
        if (currentOvertimeType.durationType === "hours") {
            fromparsedAfter = fromparsedAfter.add(-1, 'days');
            toparsedAfter = toparsedAfter.add(-1, 'days');
            fromparsedwithoutAfter = fromparsedwithoutAfter;
            toparsedwithoutAfter = toparsedwithoutAfter;
            overtimePayload.from = new Date(fromparsedwithoutAfter.add(3, 'hours').toString());
            overtimePayload.to = new Date(toparsedwithoutAfter.add(3, 'hours').toString());
        }
        console.log("overtime payload:", JSON.parse(JSON.stringify([Object.values(overtimePayload), fromparsedAfter, toparsedAfter])));
        let fromparsed;
        let toparsed;
        let fromparsedwithout;
        let toparsedwithout;
        if (currentOvertimeType.durationType === 'hours') {
            let baseDayFrom = fromparsedwithoutAfter.format("YYYY-MM-DD").toString();
            let baseDayTo = toparsedwithoutAfter.format("YYYY-MM-DD").toString();
            console.log("base day to and from: ", baseDayTo, baseDayFrom);
            if (baseDayFrom !== baseDayTo) {
                return {
                    success: false,
                    message: "from and to dates are not matching the requirements depending on the duration type",
                    data: {},
                };
            }
            fromparsed = fromparsedAfter.format("YYYY-MM-DD HH:mm:00").toString();
            toparsed = toparsedAfter.format('YYYY-MM-DD HH:mm:00').toString();
            fromparsedwithout = fromparsedwithoutAfter.format('YYYY-MM-DD HH:mm:00').toString();
            toparsedwithout = toparsedwithoutAfter.format('YYYY-MM-DD HH:mm:00').toString();
        }
        else if (currentOvertimeType.durationType === "days") {
            fromparsed = fromparsedAfter.format("YYYY-MM-DD 00:00:00").toString();
            toparsed = toparsedAfter.format('YYYY-MM-DD 00:00:00').toString();
            fromparsedwithout = fromparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString();
            toparsedwithout = toparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString();
        }
        else {
            return {
                success: true,
                message: "overtimeType duration is not supported, must be on of ['hours','days'] you can update it or add new in overtimeTypes controller",
                data: {}
            };
        }
        const alllvs = await this.modelClass.query()
            .select('id')
            .select('from')
            .select('to')
            .where({ employeeId: currentEmployee.id })
            .whereIn('status', [overtime_status_dto_1.OvertimeStatusLayers.completed, overtime_status_dto_1.OvertimeStatusLayers.pending])
            .whereRaw(`\`from\` < '${fromparsed}'`)
            .whereRaw(`\`to\` > '${toparsed}'`);
        console.log("allovertimes", JSON.parse(JSON.stringify(alllvs.map(er => Object.values(er)))));
        const alllvs1 = await this.modelClass.query()
            .select('id')
            .select('from')
            .select('to')
            .where({ employeeId: currentEmployee.id })
            .whereIn('status', [overtime_status_dto_1.OvertimeStatusLayers.completed, overtime_status_dto_1.OvertimeStatusLayers.pending])
            .whereRaw(`\`from\` < '${fromparsed}'`)
            .whereRaw(`\`to\` > '${fromparsedwithout}'`);
        console.log("alllea111", JSON.parse(JSON.stringify(alllvs1.map(er => Object.values(er)))));
        const alllvs2 = await this.modelClass.query()
            .select('id')
            .select('from')
            .select('to')
            .where({ employeeId: currentEmployee.id })
            .whereIn('status', [overtime_status_dto_1.OvertimeStatusLayers.completed, overtime_status_dto_1.OvertimeStatusLayers.pending])
            .whereRaw(`\`from\` < '${toparsed}'`)
            .whereRaw(`\`to\` > '${toparsedwithout}'`);
        console.log("alllea222", JSON.parse(JSON.stringify(alllvs2.map(er => Object.values(er)))));
        if (alllvs.length || alllvs1.length || alllvs2.length) {
            return {
                success: false,
                message: "The duration overlaps with previous overtimes!",
                data: {},
            };
        }
        let newParams = { ...overtimePayload };
        newParams.currentBalance = currentEmployee.overtimeBalance;
        if (currentEmployee.overtimeBalance !== 0) {
            newParams.remainBalance = currentEmployee.overtimeBalance - (((Number(new Date(toparsedwithout)) / 3600000) - (Number(new Date(fromparsedwithout)) / 3600000)));
            console.log("remain balance: ", Number(new Date(toparsedwithout)), Number(new Date(fromparsedwithout)), currentEmployee.overtimeBalance, newParams.remainBalance);
        }
        const identifiersInst = await this.modelClass.query().insert(newParams);
        if (identifiersInst) {
            let retnr = [];
            retnr = await this.getManagersOvertimeApproval(currentEmployee, identifiersInst, currentUser, true);
            if (currentUser.myEmployeeProfile.hrMember === 1) {
                await this.overtimeApprovalClass.query().insert({ brandCode: currentUser.brandCode, overtimeId: identifiersInst.id, managerId: currentUser.myEmployeeProfile.id, status: overtime_status_dto_1.OvertimeStatusLayers.completed });
            }
            if (currentUser.myEmployeeProfile) {
                retnr.forEach(async (ex) => {
                    console.log("ex: ", ex);
                    if (currentEmployee.managerId) {
                        await this.overtimeApprovalClass.query().insert({ brandCode: currentUser.brandCode, overtimeId: identifiersInst.id, managerId: ex.managerId, status: ex.status });
                    }
                });
            }
            await this.employeeClass.query()
                .where({ brandCode: currentUser.brandCode, id: currentEmployee.id })
                .update({
                overtimeBalance: newParams.remainBalance
            });
            console.log("updated employee balance to ", currentEmployee.overtimeBalance, " - - - ", newParams.remainBalance, "!");
        }
        else {
            return {
                success: false,
                message: "couldnt create the overtime",
                data: {}
            };
        }
        const createOvertime = await this.modelClass.query().findById(identifiersInst.id);
        return {
            success: true,
            message: 'Overtime created successfully.',
            data: createOvertime,
        };
    }
    async updateApproval(payload, currentUser) {
        var _a, _b;
        const overtimePayload = payload;
        const overtime = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(overtimePayload.id)
            .withGraphFetched({ employee: { user: {} }, overtimeApprovals: { manager: { user: {} } }, overtimeType: {} });
        if (!overtime) {
            return {
                success: false,
                message: "no overtime found",
                data: {}
            };
        }
        if (currentUser.myEmployeeProfile.hrMember === 1 || app_service_1.getUserType(currentUser) !== user_layers_dto_1.UserLayers.layerTwo) {
            return {
                success: false,
                message: "not allowed to perform this action",
                data: {}
            };
        }
        if (!overtime.overtimeApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.id)) {
            return {
                success: false,
                message: "no manager found",
                data: {}
            };
        }
        let currentApproval = (_a = overtime.overtimeApprovals) === null || _a === void 0 ? void 0 : _a.filter(wer => { return wer.managerId === currentUser.myEmployeeProfile.id; })[0];
        let statusss;
        let newOvertimeparams;
        let newEmployeeparams;
        if (overtimePayload.status === overtime_status_dto_1.OvertimeStatusLayers.rejected) {
            statusss = overtime_status_dto_1.OvertimeStatusLayers.rejected;
            newOvertimeparams = {
                status: overtime_status_dto_1.OvertimeStatusLayers.rejected
            };
            newEmployeeparams = {
                overtimeBalance: Number(overtime.employee.overtimeBalance) + (Number(overtime.currentBalance) - Number(overtime.remainBalance))
            };
        }
        if (overtimePayload.status === overtime_status_dto_1.OvertimeStatusLayers.completed) {
            statusss = overtime_status_dto_1.OvertimeStatusLayers.completed;
        }
        if ((currentApproval === null || currentApproval === void 0 ? void 0 : currentApproval.status) !== overtime_status_dto_1.OvertimeStatusLayers.pending) {
            return {
                success: false,
                message: "not allowed to reject after completed found",
                data: {}
            };
        }
        let updatedOvertimeapprovalRes;
        updatedOvertimeapprovalRes = await this.overtimeApprovalClass
            .query()
            .update({
            status: statusss ? statusss : currentApproval.status,
            updatedBy: currentUser.username,
        })
            .where({ id: currentApproval.id });
        if (statusss === overtime_status_dto_1.OvertimeStatusLayers.rejected) {
            await this.modelClass.query()
                .update(newOvertimeparams)
                .where({ id: overtime.id });
            await this.employeeClass.query()
                .update(newEmployeeparams)
                .where({ id: overtime.employeeId });
        }
        if (updatedOvertimeapprovalRes && currentUser.myEmployeeProfile.hrMember !== 1 && currentUser.myEmployeeProfile.managerId && overtime.overtimeApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.managerId)) {
            let currentApprovalManager = (_b = overtime.overtimeApprovals) === null || _b === void 0 ? void 0 : _b.filter(wer => { return wer.managerId === currentUser.myEmployeeProfile.id; })[0];
            const updatedOvertimeapproval = await this.overtimeApprovalClass
                .query()
                .update({
                status: overtime_status_dto_1.OvertimeStatusLayers.pending,
                updatedBy: currentUser.username,
            })
                .where({ id: currentApprovalManager.id });
        }
        return {
            success: true,
            message: 'Overtime details updated successfully.',
            data: updatedOvertimeapprovalRes,
        };
    }
    async approveOvertime(payload, currentUser) {
        const overtimePayload = payload;
        const overtime = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(overtimePayload.id)
            .withGraphFetched({ employee: { user: {} }, overtimeApprovals: { manager: { user: {} } }, overtimeType: {} });
        if (!overtime) {
            return {
                success: false,
                message: "no overtime found",
                data: {}
            };
        }
        if (overtime.status !== overtime_status_dto_1.OvertimeStatusLayers.pending) {
            return {
                success: false,
                message: "no overtime found",
                data: {}
            };
        }
        if (currentUser.myEmployeeProfile.hrMember !== 1) {
            return {
                success: false,
                message: "not allowed to perform this action",
                data: {}
            };
        }
        if (!overtime.overtimeApprovals.every(erwr => erwr.status === overtime_status_dto_1.OvertimeStatusLayers.completed)) {
            return {
                success: false,
                message: "no overtime found",
                data: {}
            };
        }
        let statusss;
        let newOvertimeparams;
        let newEmployeeparams;
        if (overtimePayload.status === overtime_status_dto_1.OvertimeStatusLayers.rejected) {
            statusss = overtime_status_dto_1.OvertimeStatusLayers.rejected;
            newOvertimeparams = {
                status: overtime_status_dto_1.OvertimeStatusLayers.rejected,
                updatedBy: currentUser.username,
            };
            newEmployeeparams = {
                overtimeBalance: Number(overtime.employee.overtimeBalance) + (Number(overtime.currentBalance) - Number(overtime.remainBalance)),
                updatedBy: currentUser.username,
            };
        }
        if (overtimePayload.status === overtime_status_dto_1.OvertimeStatusLayers.completed) {
            statusss = overtime_status_dto_1.OvertimeStatusLayers.completed;
            newOvertimeparams = {
                status: overtime_status_dto_1.OvertimeStatusLayers.completed,
                updatedBy: currentUser.username,
            };
        }
        if ((overtime === null || overtime === void 0 ? void 0 : overtime.status) !== overtime_status_dto_1.OvertimeStatusLayers.pending) {
            return {
                success: false,
                message: "not allowed to reject after completed found",
                data: {}
            };
        }
        let udpatedOvertime;
        udpatedOvertime = await this.modelClass.query()
            .update(newOvertimeparams)
            .where({ id: overtime.id });
        if (statusss === overtime_status_dto_1.OvertimeStatusLayers.rejected) {
            if (udpatedOvertime) {
                await this.employeeClass.query()
                    .update(newEmployeeparams)
                    .where({ id: overtime.employeeId });
            }
        }
        return {
            success: true,
            message: 'Overtime details updated successfully.',
            data: udpatedOvertime,
        };
    }
    async update(payload, currentUser) {
        const overtimePayload = payload;
        const overtime = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(overtimePayload.id);
        if (overtime) {
            const updatedOvertime = await this.modelClass
                .query()
                .update({
                updatedBy: currentUser.username,
            })
                .where({ id: overtimePayload.id });
            return {
                success: true,
                message: 'Overtime details updated successfully.',
                data: updatedOvertime,
            };
        }
        else {
            return {
                success: false,
                message: 'No overtime found.',
                data: {},
            };
        }
    }
    async deleteById(overtimeId, currentUser) {
        const overtimes = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: overtimeId
        })
            .delete();
        if (overtimes) {
            return {
                success: true,
                message: 'Overtime deleted successfully.',
                data: overtimes,
            };
        }
        else {
            return {
                success: false,
                message: 'No overtime found.',
                data: {},
            };
        }
    }
    async getManagersOvertimeApproval(employeeProfile, addedOvertime, currentUser, firstManager) {
        if (employeeProfile.managerId) {
            let status = "";
            let managerId = employeeProfile.managerId;
            if (firstManager === true) {
                status = overtime_status_dto_1.OvertimeStatusLayers.pending;
            }
            if (currentUser.myEmployeeProfile.hrMember === 1) {
                status = overtime_status_dto_1.OvertimeStatusLayers.completed;
            }
            const identifiers = [{ overtimeId: addedOvertime.id, managerId: managerId, status: status }];
            const managerIdd = await this.employeeClass.query().findById(employeeProfile.managerId);
            if (managerIdd && managerIdd.managerId) {
                const parentManager = await this.getManagersOvertimeApproval(managerIdd, addedOvertime, currentUser, false);
                console.log("merged: ", parentManager.concat(identifiers));
                if (firstManager === true && currentUser.myEmployeeProfile.hrMember === 1) {
                    status = overtime_status_dto_1.OvertimeStatusLayers.completed;
                    managerId = currentUser.myEmployeeProfile.id;
                }
                return parentManager.concat(identifiers);
            }
            console.log("getManagersOvertimeApproval: ", identifiers);
            return identifiers;
        }
        return [];
    }
};
OvertimesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('OvertimeModel')),
    __param(1, common_1.Inject('EmployeeModel')),
    __param(2, common_1.Inject('OvertimeTypeModel')),
    __param(3, common_1.Inject('OvertimeApprovalModel')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], OvertimesService);
exports.OvertimesService = OvertimesService;
//# sourceMappingURL=overtimes.service.js.map
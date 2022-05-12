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
const app_service_1 = require("../../app/app.service");
const user_layers_dto_1 = require("../auth/dto/user-layers.dto");
const leave_status_dto_1 = require("./dto/leave-status.dto");
const moment = require("moment");
let LeavesService = class LeavesService {
    constructor(modelClass, employeeClass, leaveTypeClass, leaveApprovalClass) {
        this.modelClass = modelClass;
        this.employeeClass = employeeClass;
        this.leaveTypeClass = leaveTypeClass;
        this.leaveApprovalClass = leaveApprovalClass;
    }
    async findMyLeaves(currentUser) {
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            userId: currentUser.id
        });
        if (currentEmployee) {
            const leaves = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode, employeeId: currentUser.myEmployeeProfile.id })
                .modifiers({
                leaveTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                leaveApprovalsParams(builder) {
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
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'My Leave details fetch successfully.',
                data: leaves,
            };
        }
    }
    async findAllApprovals(currentUser) {
        if (currentUser.myEmployeeProfile && currentUser.myEmployeeProfile.hrMember === 1) {
            const leavesFnd = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .whereIn('status', [leave_status_dto_1.LeaveStatusLayers.completed, leave_status_dto_1.LeaveStatusLayers.pending, leave_status_dto_1.LeaveStatusLayers.rejected])
                .modifiers({
                leaveTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                leaveApprovalsParams(builder) {
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
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            const result = leavesFnd.filter(props => {
                if (props.leaveApprovals.every(ee => ee.status !== 'rejected') && props.status === 'rejected') {
                    return true;
                }
                else if (props.leaveApprovals.every(ee => ee.status === 'completed') && props.status === 'completed') {
                    return true;
                }
                else if (props.leaveApprovals.every(ee => ee.status === 'completed') && props.status === 'pending') {
                    return true;
                }
                else if (props.leaveApprovals.length === 0 && !props.employee.manager) {
                    return true;
                }
                else
                    return false;
            });
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: result,
            };
        }
        if (currentUser.myEmployeeProfile && app_service_1.getUserType(currentUser) === user_layers_dto_1.UserLayers.layerTwo) {
            const leaves = await this.leaveApprovalClass.query()
                .where({ brandCode: currentUser.brandCode, managerId: currentUser.myEmployeeProfile.id })
                .whereIn('status', [leave_status_dto_1.LeaveStatusLayers.completed, leave_status_dto_1.LeaveStatusLayers.pending, leave_status_dto_1.LeaveStatusLayers.rejected]);
            const leavesFnd = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .whereIn('id', leaves.map(e => e.leaveId))
                .whereIn('status', [leave_status_dto_1.LeaveStatusLayers.completed, leave_status_dto_1.LeaveStatusLayers.pending, leave_status_dto_1.LeaveStatusLayers.rejected])
                .modifiers({
                leaveTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                leaveApprovalsParams(builder) {
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
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leavesFnd,
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
            const leaves = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .modifiers({
                leaveTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                leaveApprovalsParams(builder) {
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
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leaves,
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
            const leaves = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .modifiers({
                leaveTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                leaveApprovalsParams(builder) {
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
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
            return {
                success: true,
                message: 'Leave details fetch successfully.',
                data: leaves,
            };
        }
        else {
            const leaves = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode, employeeId: currentEmployee.id })
                .modifiers({
                leaveTypeParams(builder) {
                    builder.select('id');
                    builder.select('name');
                    builder.select('days');
                    builder.select('hours');
                    builder.select('durationType');
                    builder.select('fund');
                },
                leaveApprovalsParams(builder) {
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
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `);
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
    async createLeave(payload, currentUser) {
        var _a, _b;
        const leavePayload = payload;
        if (currentUser.myEmployeeProfile &&
            app_service_1.getUserType(currentUser) !== user_layers_dto_1.UserLayers.layerOne &&
            !((_a = currentUser.myEmployeeProfile) === null || _a === void 0 ? void 0 : _a.hrMember)) {
            leavePayload.employeeId = currentUser.myEmployeeProfile.id;
        }
        if (!leavePayload.employeeId &&
            app_service_1.getUserType(currentUser) !== user_layers_dto_1.UserLayers.layerOne &&
            (currentUser.myEmployeeProfile && ((_b = currentUser.myEmployeeProfile) === null || _b === void 0 ? void 0 : _b.hrMember))) {
            leavePayload.employeeId = currentUser.myEmployeeProfile.id;
        }
        if (!leavePayload.employeeId) {
            return {
                success: false,
                message: "The employeeId is required!",
                data: {},
            };
        }
        const currentLeaveType = await this.leaveTypeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            id: leavePayload.leaveTypeId
        });
        if (!currentLeaveType) {
            return {
                success: false,
                message: "The leaveType doesnt exist!",
                data: {},
            };
        }
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            id: leavePayload.employeeId
        });
        if (!currentEmployee) {
            return {
                success: false,
                message: "The employee doesnt exist!",
                data: {},
            };
        }
        const currentLeaveTypeMax = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({
            employeeId: currentEmployee.id,
            leaveTypeId: currentLeaveType.id,
        })
            .whereIn('status', [leave_status_dto_1.LeaveStatusLayers.pending, leave_status_dto_1.LeaveStatusLayers.completed]);
        let days = currentLeaveTypeMax.map((qqw) => {
            return Number(qqw.currentBalance - qqw.remainBalance);
        }).reduce((a, b) => { return a + b; }, 0);
        console.log("days leave type max - currentLeaveTypeMax: ", days, currentLeaveType.days);
        if (currentLeaveType.days <= days) {
            return {
                success: false,
                message: "The leaveType exceeded the current leavetype limited days!",
                data: {},
            };
        }
        if (currentUser.myEmployeeProfile.hrMember) {
            leavePayload['status'] = leave_status_dto_1.LeaveStatusLayers.completed;
        }
        else {
            leavePayload['status'] = leave_status_dto_1.LeaveStatusLayers.pending;
        }
        leavePayload['createdBy'] = currentUser.username;
        leavePayload['brandCode'] = currentUser.brandCode;
        if (Number(new Date(leavePayload.from)) > Number(new Date(leavePayload.to))) {
            return {
                success: false,
                message: "The from is bigger than from!",
                data: {},
            };
        }
        const leaveDurationInDays = Number(new Date(leavePayload.to)) - Number(new Date(leavePayload.from)) / 86400000;
        if (leaveDurationInDays >= currentEmployee.leaveBalance && !currentLeaveType.urgent) {
            return {
                success: false,
                message: "The duration is bigger than balance!",
                data: {},
            };
        }
        if (leaveDurationInDays > currentLeaveType.days) {
            return {
                success: false,
                message: "The duration is bigger than leave type days!",
                data: {},
            };
        }
        let initFrom = leavePayload.from.toString().split(" ").length === 1 ? leavePayload.from + " 00:00:00" : leavePayload.from;
        let initTo = leavePayload.to.toString().split(" ").length === 1 ? leavePayload.to + " 00:00:00" : leavePayload.to;
        let fromparsedAfter = moment(initFrom).add(1, 'days');
        let toparsedAfter = moment(initTo).add(1, 'days');
        let fromparsedwithoutAfter = moment(initFrom);
        let toparsedwithoutAfter = moment(initTo);
        if (currentLeaveType.durationType === "hours") {
            fromparsedAfter = fromparsedAfter.add(-1, 'days');
            toparsedAfter = toparsedAfter.add(-1, 'days');
            fromparsedwithoutAfter = fromparsedwithoutAfter;
            toparsedwithoutAfter = toparsedwithoutAfter;
            leavePayload.from = new Date(fromparsedwithoutAfter.add(3, 'hours').toString());
            leavePayload.to = new Date(toparsedwithoutAfter.add(3, 'hours').toString());
        }
        console.log("leave payload:", JSON.parse(JSON.stringify([Object.values(leavePayload), fromparsedAfter, toparsedAfter])));
        let fromparsed;
        let toparsed;
        let fromparsedwithout;
        let toparsedwithout;
        if (currentLeaveType.durationType === 'hours') {
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
        else if (currentLeaveType.durationType === "days") {
            fromparsed = fromparsedAfter.format("YYYY-MM-DD 00:00:00").toString();
            toparsed = toparsedAfter.format('YYYY-MM-DD 00:00:00').toString();
            fromparsedwithout = fromparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString();
            toparsedwithout = toparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString();
        }
        else {
            return {
                success: true,
                message: "leaveType duration is not supported, must be on of ['hours','days'] you can update it or add new in leaveTypes controller",
                data: {}
            };
        }
        const alllvs = await this.modelClass.query()
            .select('id')
            .select('from')
            .select('to')
            .where({ employeeId: currentEmployee.id })
            .whereIn('status', [leave_status_dto_1.LeaveStatusLayers.completed, leave_status_dto_1.LeaveStatusLayers.pending])
            .whereRaw(`\`from\` < '${fromparsed}'`)
            .whereRaw(`\`to\` > '${toparsed}'`);
        console.log("allleaves", JSON.parse(JSON.stringify(alllvs.map(er => Object.values(er)))));
        const alllvs1 = await this.modelClass.query()
            .select('id')
            .select('from')
            .select('to')
            .where({ employeeId: currentEmployee.id })
            .whereIn('status', [leave_status_dto_1.LeaveStatusLayers.completed, leave_status_dto_1.LeaveStatusLayers.pending])
            .whereRaw(`\`from\` < '${fromparsed}'`)
            .whereRaw(`\`to\` > '${fromparsedwithout}'`);
        console.log("alllea111", JSON.parse(JSON.stringify(alllvs1.map(er => Object.values(er)))));
        const alllvs2 = await this.modelClass.query()
            .select('id')
            .select('from')
            .select('to')
            .where({ employeeId: currentEmployee.id })
            .whereIn('status', [leave_status_dto_1.LeaveStatusLayers.completed, leave_status_dto_1.LeaveStatusLayers.pending])
            .whereRaw(`\`from\` < '${toparsed}'`)
            .whereRaw(`\`to\` > '${toparsedwithout}'`);
        console.log("alllea222", JSON.parse(JSON.stringify(alllvs2.map(er => Object.values(er)))));
        if (alllvs.length || alllvs1.length || alllvs2.length) {
            return {
                success: false,
                message: "The duration overlaps with previous leaves!",
                data: {},
            };
        }
        let newParams = { ...leavePayload };
        newParams.currentBalance = currentEmployee.leaveBalance;
        if (currentEmployee.leaveBalance !== 0) {
            if (currentLeaveType.durationType === 'hours') {
                newParams.remainBalance = currentEmployee.leaveBalance - (((Number(new Date(toparsedwithout)) / 86400000) - (Number(new Date(fromparsedwithout)) / 86400000)));
            }
            else {
                newParams.remainBalance = currentEmployee.leaveBalance - (((Number(new Date(toparsedwithout)) / 86400000) - (Number(new Date(fromparsedwithout)) / 86400000)) + 1);
            }
            console.log("remain balance: ", Number(new Date(toparsedwithout)), Number(new Date(fromparsedwithout)), currentEmployee.leaveBalance, newParams.remainBalance);
        }
        const identifiersInst = await this.modelClass.query().insert(newParams);
        if (identifiersInst) {
            let retnr = [];
            retnr = await this.getManagersLeaveApproval(currentEmployee, identifiersInst, currentUser, true);
            if (currentUser.myEmployeeProfile.hrMember === 1) {
                await this.leaveApprovalClass.query().insert({ brandCode: currentUser.brandCode, leaveId: identifiersInst.id, managerId: currentUser.myEmployeeProfile.id, status: leave_status_dto_1.LeaveStatusLayers.completed });
            }
            if (currentUser.myEmployeeProfile) {
                retnr.forEach(async (ex) => {
                    console.log("ex: ", ex);
                    if (currentEmployee.managerId) {
                        await this.leaveApprovalClass.query().insert({ brandCode: currentUser.brandCode, leaveId: identifiersInst.id, managerId: ex.managerId, status: ex.status });
                    }
                });
            }
            await this.employeeClass.query()
                .where({ brandCode: currentUser.brandCode, id: currentEmployee.id })
                .update({
                leaveBalance: newParams.remainBalance
            });
            console.log("updated employee balance to ", currentEmployee.leaveBalance, " - - - ", newParams.remainBalance, "!");
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
        var _a, _b;
        const leavePayload = payload;
        const leave = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(leavePayload.id)
            .withGraphFetched({ employee: { user: {} }, leaveApprovals: { manager: { user: {} } }, leaveType: {} });
        if (!leave) {
            return {
                success: false,
                message: "no leave found",
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
        if (!leave.leaveApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.id)) {
            return {
                success: false,
                message: "no manager found",
                data: {}
            };
        }
        let currentApproval = (_a = leave.leaveApprovals) === null || _a === void 0 ? void 0 : _a.filter(wer => { return wer.managerId === currentUser.myEmployeeProfile.id; })[0];
        let statusss;
        let newLeaveparams;
        let newEmployeeparams;
        if (leavePayload.status === leave_status_dto_1.LeaveStatusLayers.rejected) {
            statusss = leave_status_dto_1.LeaveStatusLayers.rejected;
            newLeaveparams = {
                status: leave_status_dto_1.LeaveStatusLayers.rejected
            };
            newEmployeeparams = {
                leaveBalance: Number(leave.employee.leaveBalance) + (Number(leave.currentBalance) - Number(leave.remainBalance))
            };
        }
        if (leavePayload.status === leave_status_dto_1.LeaveStatusLayers.completed) {
            statusss = leave_status_dto_1.LeaveStatusLayers.completed;
        }
        if ((currentApproval === null || currentApproval === void 0 ? void 0 : currentApproval.status) !== leave_status_dto_1.LeaveStatusLayers.pending) {
            return {
                success: false,
                message: "not allowed to reject after completed found",
                data: {}
            };
        }
        let updatedLeaveapprovalRes;
        updatedLeaveapprovalRes = await this.leaveApprovalClass
            .query()
            .update({
            status: statusss ? statusss : currentApproval.status,
            updatedBy: currentUser.username,
        })
            .where({ id: currentApproval.id });
        if (statusss === leave_status_dto_1.LeaveStatusLayers.rejected) {
            await this.modelClass.query()
                .update(newLeaveparams)
                .where({ id: leave.id });
            await this.employeeClass.query()
                .update(newEmployeeparams)
                .where({ id: leave.employeeId });
        }
        if (updatedLeaveapprovalRes && currentUser.myEmployeeProfile.hrMember !== 1 && currentUser.myEmployeeProfile.managerId && leave.leaveApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.managerId)) {
            let currentApprovalManager = (_b = leave.leaveApprovals) === null || _b === void 0 ? void 0 : _b.filter(wer => { return wer.managerId === currentUser.myEmployeeProfile.id; })[0];
            const updatedLeaveapproval = await this.leaveApprovalClass
                .query()
                .update({
                status: leave_status_dto_1.LeaveStatusLayers.pending,
                updatedBy: currentUser.username,
            })
                .where({ id: currentApprovalManager.id });
        }
        return {
            success: true,
            message: 'Leave details updated successfully.',
            data: updatedLeaveapprovalRes,
        };
    }
    async approveLeave(payload, currentUser) {
        const leavePayload = payload;
        const leave = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(leavePayload.id)
            .withGraphFetched({ employee: { user: {} }, leaveApprovals: { manager: { user: {} } }, leaveType: {} });
        if (!leave) {
            return {
                success: false,
                message: "no leave found",
                data: {}
            };
        }
        if (leave.status !== leave_status_dto_1.LeaveStatusLayers.pending) {
            return {
                success: false,
                message: "no leave found",
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
        if (!leave.leaveApprovals.every(erwr => erwr.status === leave_status_dto_1.LeaveStatusLayers.completed)) {
            return {
                success: false,
                message: "no leave found",
                data: {}
            };
        }
        let statusss;
        let newLeaveparams;
        let newEmployeeparams;
        if (leavePayload.status === leave_status_dto_1.LeaveStatusLayers.rejected) {
            statusss = leave_status_dto_1.LeaveStatusLayers.rejected;
            newLeaveparams = {
                status: leave_status_dto_1.LeaveStatusLayers.rejected,
                updatedBy: currentUser.username,
            };
            newEmployeeparams = {
                leaveBalance: Number(leave.employee.leaveBalance) + (Number(leave.currentBalance) - Number(leave.remainBalance)),
                updatedBy: currentUser.username,
            };
        }
        if (leavePayload.status === leave_status_dto_1.LeaveStatusLayers.completed) {
            statusss = leave_status_dto_1.LeaveStatusLayers.completed;
            newLeaveparams = {
                status: leave_status_dto_1.LeaveStatusLayers.completed,
                updatedBy: currentUser.username,
            };
        }
        if ((leave === null || leave === void 0 ? void 0 : leave.status) !== leave_status_dto_1.LeaveStatusLayers.pending) {
            return {
                success: false,
                message: "not allowed to reject after completed found",
                data: {}
            };
        }
        let udpatedLeave;
        udpatedLeave = await this.modelClass.query()
            .update(newLeaveparams)
            .where({ id: leave.id });
        if (statusss === leave_status_dto_1.LeaveStatusLayers.rejected) {
            if (udpatedLeave) {
                await this.employeeClass.query()
                    .update(newEmployeeparams)
                    .where({ id: leave.employeeId });
            }
        }
        return {
            success: true,
            message: 'Leave details updated successfully.',
            data: udpatedLeave,
        };
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
    async getManagersLeaveApproval(employeeProfile, addedLeave, currentUser, firstManager) {
        if (employeeProfile.managerId) {
            let status = "";
            let managerId = employeeProfile.managerId;
            if (firstManager === true) {
                status = leave_status_dto_1.LeaveStatusLayers.pending;
            }
            if (currentUser.myEmployeeProfile.hrMember === 1) {
                status = leave_status_dto_1.LeaveStatusLayers.completed;
            }
            const identifiers = [{ leaveId: addedLeave.id, managerId: managerId, status: status }];
            const managerIdd = await this.employeeClass.query().findById(employeeProfile.managerId);
            if (managerIdd && managerIdd.managerId) {
                const parentManager = await this.getManagersLeaveApproval(managerIdd, addedLeave, currentUser, false);
                console.log("merged: ", parentManager.concat(identifiers));
                if (firstManager === true && currentUser.myEmployeeProfile.hrMember === 1) {
                    status = leave_status_dto_1.LeaveStatusLayers.completed;
                    managerId = currentUser.myEmployeeProfile.id;
                }
                return parentManager.concat(identifiers);
            }
            console.log("getManagersLeaveApproval: ", identifiers);
            return identifiers;
        }
        return [];
    }
};
LeavesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('LeaveModel')),
    __param(1, common_1.Inject('EmployeeModel')),
    __param(2, common_1.Inject('LeaveTypeModel')),
    __param(3, common_1.Inject('LeaveApprovalModel')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], LeavesService);
exports.LeavesService = LeavesService;
//# sourceMappingURL=leaves.service.js.map
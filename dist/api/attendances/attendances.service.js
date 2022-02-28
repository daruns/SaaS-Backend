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
exports.AttendancesService = void 0;
const common_1 = require("@nestjs/common");
let AttendancesService = class AttendancesService {
    constructor(modelClass, employeeClass) {
        this.modelClass = modelClass;
        this.employeeClass = employeeClass;
    }
    async findAll(currentUser) {
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ userId: currentUser.id })
            .withGraphFetched({ attendances: {} });
        if (currentEmployee.hrMember === true) {
            const attendances = await this.modelClass.query()
                .where({ brandCode: currentUser.brandCode })
                .withGraphFetched({
                designations: {}
            });
            return {
                success: true,
                message: 'Attendances details fetch successfully.',
                data: attendances,
            };
        }
        else {
            return {
                success: true,
                message: 'Attendances details fetch successfully.',
                data: currentEmployee.attendances,
            };
        }
    }
    async create(currentUser) {
        const currentEmployee = await this.employeeClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ userId: currentUser.id });
        console.log(currentEmployee);
        if (!currentEmployee) {
            throw new common_1.UnauthorizedException();
        }
        const attendancePayload = {};
        const lastAtt = await this.modelClass.query().orderBy('createdAt', 'desc').findOne({ employeeId: currentEmployee.id });
        var checkedOrNot = true;
        if (lastAtt) {
            checkedOrNot = !lastAtt.checkedIn;
        }
        console.log("deljfnel: ", lastAtt, checkedOrNot);
        attendancePayload['employeeId'] = currentEmployee.id;
        attendancePayload['checkedIn'] = checkedOrNot;
        attendancePayload['createdBy'] = currentUser.username;
        attendancePayload['brandCode'] = currentUser.brandCode;
        const identifiers = await this.modelClass.query().insert(attendancePayload);
        const createAttendance = await this.modelClass.query().findById(identifiers.id);
        return {
            success: true,
            message: 'Attendance created successfully.',
            data: createAttendance,
        };
    }
};
AttendancesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('AttendanceModel')),
    __param(1, common_1.Inject('EmployeeModel')),
    __metadata("design:paramtypes", [Object, Object])
], AttendancesService);
exports.AttendancesService = AttendancesService;
//# sourceMappingURL=attendances.service.js.map
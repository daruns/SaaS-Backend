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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../auth/apps/users/users.service");
const app_service_1 = require("../../app/app.service");
const user_layers_dto_1 = require("../auth/dto/user-layers.dto");
let EmployeesService = class EmployeesService {
    constructor(modelClass, userClass, designationClass, usersService, fileUploadService) {
        this.modelClass = modelClass;
        this.userClass = userClass;
        this.designationClass = designationClass;
        this.usersService = usersService;
        this.fileUploadService = fileUploadService;
    }
    async findAll(currentUser) {
        const employees = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .modifiers({
            selectDepartmentParams(builder) {
                builder.select('id');
                builder.select('name');
            },
            selectUserParams(builder) {
                builder.select('id');
                builder.select('name');
                builder.select('avatar');
                builder.select('phoneNumber');
                builder.select('username');
                builder.select('email');
                builder.select('userType');
            },
        })
            .withGraphFetched(`
          [
            designation(selectDepartmentParams).[department(selectDepartmentParams)],
            user(selectUserParams),
            manager.[user(selectUserParams)]
          ]
        `);
        if (employees.length) {
            return {
                success: true,
                message: 'Employee details fetch successfully.',
                data: employees,
            };
        }
        else {
            return {
                success: false,
                message: 'No employees details found.',
                data: {},
            };
        }
    }
    async findUsers(currentUser) {
        const users = await this.userClass
            .query()
            .select('id')
            .select('name')
            .select('avatar')
            .select('username')
            .select('email')
            .select('userType')
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({ myEmployeeProfile: true });
        if (users.length) {
            return {
                success: true,
                message: 'Users details fetch successfully.',
                data: users,
            };
        }
        else {
            return {
                success: false,
                message: 'No Users details found.',
                data: {},
            };
        }
    }
    async findById(id, currentUser) {
        const employee = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .modifiers({
            selectDepartmentParams(builder) {
                builder.select('id');
                builder.select('name');
            },
            selectUserParams(builder) {
                builder.select('id');
                builder.select('name');
                builder.select('avatar');
                builder.select('phoneNumber');
                builder.select('username');
                builder.select('email');
                builder.select('userType');
            },
        })
            .withGraphFetched(`
          [
            designation(selectDepartmentParams).[department(selectDepartmentParams)],
            user(selectUserParams),
            manager.[user(selectUserParams)]
          ]
        `);
        if (employee) {
            return {
                success: true,
                message: 'Employee details fetch successfully.',
                data: employee,
            };
        }
        else {
            return {
                success: false,
                message: 'No employee details found.',
                data: {},
            };
        }
    }
    async findMe(currentUser) {
        const employee = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ userId: currentUser.id })
            .modifiers({
            selectDepartmentParams(builder) {
                builder.select('id');
                builder.select('name');
            },
            selectUserParams(builder) {
                builder.select('id');
                builder.select('name');
                builder.select('avatar');
                builder.select('phoneNumber');
                builder.select('username');
                builder.select('email');
                builder.select('userType');
            },
        })
            .withGraphFetched(`
          [
            designation(selectDepartmentParams).[department(selectDepartmentParams)],
            user(selectUserParams),
            manager.[user(selectUserParams)]
          ]
        `);
        if (employee) {
            return {
                success: true,
                message: 'Employee details fetch successfully.',
                data: employee,
            };
        }
        else {
            return {
                success: false,
                message: 'No employee details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        if ((app_service_1.getUserType(currentUser) !== user_layers_dto_1.UserLayers.layerOne) && (!currentUser.myEmployeeProfile || currentUser.myEmployeeProfile.hrMember != true)) {
            console.log("normal employee create error", app_service_1.getUserType(currentUser), currentUser.myEmployeeProfile);
            throw new common_1.UnauthorizedException();
        }
        const newEmployee = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ name: payload.name });
        if (newEmployee) {
            return {
                success: false,
                message: 'Employee already exists with this name!',
                data: {},
            };
        }
        var newParams = {};
        var newParamsmanagerId;
        if (payload.managerId) {
            const managerFnd = await this.modelClass.query().findOne({ id: payload.managerId, brandCode: currentUser.brandCode });
            if (!managerFnd) {
                return {
                    success: false,
                    message: "manager not found!",
                    data: {}
                };
            }
            const managerUserFnd = await this.userClass.query()
                .where({ id: managerFnd.userId, userType: user_layers_dto_1.UserLayers.layerThree })
                .update({
                userType: user_layers_dto_1.UserLayers.layerTwo
            });
            newParamsmanagerId = managerFnd.id;
        }
        if (payload.designationId) {
            const designationFnd = await this.designationClass.query().findOne({ id: payload.designationId, brandCode: currentUser.brandCode });
            if (!designationFnd) {
                return {
                    success: false,
                    message: "designation not found!",
                    data: {}
                };
            }
        }
        if (payload.userId) {
            const userUserId = await this.userClass.query().findOne({ id: payload.userId, brandCode: currentUser.brandCode });
            const employeeUserId = await this.modelClass.query().findOne({ userId: payload.userId, brandCode: currentUser.brandCode });
            if (!userUserId || employeeUserId) {
                return {
                    success: false,
                    message: 'User Already exist with this user id.',
                    data: {},
                };
            }
        }
        newParams = {
            managerId: newParamsmanagerId ? newParamsmanagerId : null,
            name: payload.name,
            leaveBalance: payload.leaveBalance,
            overtimeBalance: payload.overtimeBalance,
            salary: payload.salary,
            hrMember: payload.hrMember ? payload.hrMember : 0,
            status: "active",
            createdBy: currentUser.username,
            brandCode: currentUser.brandCode,
            designationId: payload.designationId,
            userId: payload.userId,
        };
        var createdEmployee = await this.modelClass.query().insert(newParams);
        const identifier = await this.modelClass.query().findById(createdEmployee.id);
        if (identifier) {
            return {
                success: true,
                message: 'Employee created successfully.',
                data: identifier,
            };
        }
        else {
            return {
                success: false,
                message: 'Employee couldnt be created.',
                data: createdEmployee,
            };
        }
    }
    async update(payload, currentUser) {
        const employee = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id);
        var newParamsmanagerId;
        if (payload.managerId && payload.managerId !== employee.managerId) {
            const managerFnd = await this.modelClass.query().findById(payload.managerId);
            if (!managerFnd) {
                return {
                    success: false,
                    message: "manager not found!",
                    data: {}
                };
            }
            const managerUserFnd = await this.userClass.query()
                .where({ id: managerFnd.userId, userType: user_layers_dto_1.UserLayers.layerThree })
                .update({
                userType: user_layers_dto_1.UserLayers.layerTwo
            });
            newParamsmanagerId = managerFnd.id;
        }
        if (payload.designationId) {
            const designationFnd = await this.designationClass.query().findById(payload.designationId);
            if (!designationFnd) {
                return {
                    success: false,
                    message: "designation not found!",
                    data: {}
                };
            }
        }
        if (payload.userId) {
            const userUserId = await this.userClass.query().findOne({ id: `${payload.userId}`, brandCode: currentUser.brandCode });
            if (!userUserId) {
                return {
                    success: false,
                    message: "user not found!",
                    data: {}
                };
            }
        }
        if (employee) {
            const updatedEmployee = await this.modelClass
                .query()
                .update({
                managerId: newParamsmanagerId ? newParamsmanagerId : employee.managerId,
                leaveBalance: payload.leaveBalance ? payload.leaveBalance : employee.leaveBalance,
                overtimeBalance: payload.overtimeBalance ? payload.overtimeBalance : employee.overtimeBalance,
                salary: payload.salary ? payload.salary : employee.salary,
                designationId: payload.designationId ? payload.designationId : employee.designationId,
                userId: payload.userId ? payload.userId : employee.userId,
                hrMember: typeof payload.hrMember === 'boolean' ? payload.hrMember : employee.hrMember,
                name: payload.name ? payload.name : employee.name,
                updatedBy: currentUser.username,
            })
                .where({ id: payload.id });
            if (updatedEmployee) {
                return {
                    success: true,
                    message: 'Employee details updated successfully.',
                    data: updatedEmployee,
                };
            }
            else {
                return {
                    success: false,
                    message: 'Employee Not Updated!',
                    data: updatedEmployee
                };
            }
        }
        else {
            return {
                success: false,
                message: 'No employee found.',
                data: {},
            };
        }
    }
    async deleteById(payload, currentUser) {
        const employee = await this.modelClass
            .query()
            .findOne({
            brandCode: currentUser.brandCode,
            id: payload.id,
        });
        if (employee) {
            await this.modelClass
                .query()
                .findOne({
                brandCode: currentUser.brandCode,
                id: payload.id,
            }).delete();
            if (employee.userId) {
                await this.userClass
                    .query()
                    .findOne({ id: employee.userId, brandCode: currentUser.brandCode })
                    .delete();
            }
            return {
                success: true,
                message: 'Employee deleted successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'No employee found.',
                data: {},
            };
        }
    }
    async findByUSerId(id, currentUser) {
        const employee = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({ userId: id });
        if (employee) {
            return {
                success: true,
                message: 'Employee details fetch successfully.',
                data: employee,
            };
        }
        else {
            return {
                success: false,
                message: 'No employee details found.',
                data: {},
            };
        }
    }
};
EmployeesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('EmployeeModel')),
    __param(1, common_1.Inject('UserModel')),
    __param(2, common_1.Inject('DesignationModel')),
    __metadata("design:paramtypes", [Object, Object, Object, users_service_1.UsersService,
        app_service_1.FileUploadService])
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employees.service.js.map
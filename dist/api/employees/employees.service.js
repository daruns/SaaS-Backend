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
const bcrypt = require("bcrypt");
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
            },
        })
            .withGraphFetched(`
          [
            designation(selectDepartmentParams).[department(selectDepartmentParams)],
            user(selectUserParams),
            manager
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
            },
        })
            .withGraphFetched(`
          [
            designation(selectDepartmentParams).[department(selectDepartmentParams)],
            user(selectUserParams),
            manager
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
    async createHr(payload, currentUser) {
        var _a;
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
        var newUserParams = {};
        var newUserParamsCust = {};
        var newParams = {};
        const designationFnd = await this.designationClass.query().findById(payload.designationId);
        if (!designationFnd) {
            return {
                success: false,
                message: "designation not found!",
                data: {}
            };
        }
        if (!payload.email || !payload.username) {
            return {
                success: false,
                message: "Email and Username should not be empty",
                data: {}
            };
        }
        const userEmail = await this.userClass.query().findOne({ email: `${payload.email}` });
        if (userEmail) {
            return {
                success: false,
                message: 'User Already exist with this Email address.',
                data: {},
            };
        }
        const userUsername = await this.userClass.query().findOne({ username: `${payload.username}` });
        if (userUsername) {
            return {
                success: false,
                message: 'User Already exist with this Username.',
                data: {},
            };
        }
        const randomUsernameSuffix = Math.floor(Math.random() * 100000);
        let fixedUsername = payload.username ? payload.username : `${(_a = payload.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().replace(' ', '')}_${randomUsernameSuffix}`;
        if (payload.password) {
            const hashedPassword = await bcrypt.hash(payload.password ? payload.password : fixedUsername, 10);
            newUserParamsCust['password'] = hashedPassword;
        }
        newUserParamsCust['name'] = payload.name;
        newUserParamsCust['email'] = payload.email;
        newUserParamsCust['username'] = fixedUsername;
        newUserParamsCust['phoneNumber'] = payload.phoneNumber ? payload.phoneNumber : '';
        newUserParamsCust['userType'] = 'agent';
        newUserParamsCust['createdBy'] = currentUser.username;
        newUserParamsCust['brandCode'] = currentUser.brandCode;
        newUserParamsCust['status'] = 'active';
        const trx = await this.modelClass.startTransaction();
        var result;
        try {
            const userInstd = await this.userClass.query(trx).insert(newUserParamsCust);
            if (!userInstd)
                return {
                    success: false,
                    message: 'user didnt insert',
                    data: userInstd
                };
            newUserParams = userInstd;
            newParams = {
                name: payload.name,
                leaveBalance: payload.leaveBalance,
                salary: payload.salary,
                status: "active",
                userId: newUserParams['id'],
                hrMember: true,
                createdBy: currentUser.username,
                brandCode: currentUser.brandCode,
                designationId: payload.designationId,
            };
            var createdEmployee = await this.modelClass.query(trx).insert(newParams);
            const identifier = await this.modelClass.query(trx).findById(createdEmployee.id);
            await trx.commit();
            result = identifier;
            console.log('Employee and User created successfully');
            return {
                success: true,
                message: 'Employee created successfully.',
                data: result,
            };
        }
        catch (err) {
            await trx.rollback();
            console.log(`Something went wrong. Employee couldnt be inserted\n ${err}`);
            result = err;
            return {
                success: false,
                message: `Something went wrong. Employee couldnt be inserted.`,
                data: err,
            };
        }
    }
    async create(payload, currentUser) {
        var _a;
        const currentEMployee = await this.modelClass.query()
            .findOne({ userId: currentUser.id, hrMember: true });
        if (!currentEMployee) {
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
        var newUserParams = {};
        var newUserParamsCust = {};
        var newParams = {};
        if (payload.managerId) {
            const managerFnd = await this.modelClass.query().findById(payload.managerId);
            if (!managerFnd) {
                return {
                    success: false,
                    message: "manager not found!",
                    data: {}
                };
            }
            newParams['managerId'] = managerFnd.id;
        }
        const designationFnd = await this.designationClass.query().findById(payload.designationId);
        if (!designationFnd) {
            return {
                success: false,
                message: "designation not found!",
                data: {}
            };
        }
        if (!payload.email || !payload.username) {
            return {
                success: false,
                message: "Email and Username should not be empty while",
                data: {}
            };
        }
        const userEmail = await this.userClass.query().findOne({ email: `${payload.email}` });
        if (userEmail) {
            return {
                success: false,
                message: 'User Already exist with this Email address.',
                data: {},
            };
        }
        const userUsername = await this.userClass.query().findOne({ username: `${payload.username}` });
        if (userUsername) {
            return {
                success: false,
                message: 'User Already exist with this Username.',
                data: {},
            };
        }
        const randomUsernameSuffix = Math.floor(Math.random() * 100000);
        let fixedUsername = payload.username ? payload.username : `${(_a = payload.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().replace(' ', '')}_${randomUsernameSuffix}`;
        if (payload.password) {
            const hashedPassword = await bcrypt.hash(payload.password ? payload.password : fixedUsername, 10);
            newUserParamsCust['password'] = hashedPassword;
        }
        newUserParamsCust['name'] = payload.name;
        newUserParamsCust['email'] = payload.email;
        newUserParamsCust['username'] = fixedUsername;
        newUserParamsCust['phoneNumber'] = payload.phoneNumber ? payload.phoneNumber : '';
        newUserParamsCust['userType'] = 'agent';
        newUserParamsCust['createdBy'] = currentUser.username;
        newUserParamsCust['brandCode'] = currentUser.brandCode;
        newUserParamsCust['status'] = 'active';
        const trx = await this.modelClass.startTransaction();
        var result;
        try {
            if (!newUserParams['id']) {
                console.log("195---------------------", newUserParamsCust);
                const userInstd = await this.userClass.query(trx).insert(newUserParamsCust);
                console.log("197---------------------", userInstd);
                if (!userInstd)
                    return {
                        success: false,
                        message: 'user didnt insert',
                        data: userInstd
                    };
                newUserParams = userInstd;
            }
            newParams = {
                name: payload.name,
                leaveBalance: payload.leaveBalance,
                salary: payload.salary,
                hrMember: false,
                status: "active",
                userId: newUserParams['id'],
                createdBy: currentUser.username,
                brandCode: currentUser.brandCode,
                designationId: payload.designationId,
            };
            var createdEmployee = await this.modelClass.query(trx).insert(newParams);
            const identifier = await this.modelClass.query(trx).findById(createdEmployee.id);
            console.log("219---------------------", createdEmployee.id, identifier);
            await trx.commit();
            result = identifier;
            console.log('Employee and User created successfully');
            return {
                success: true,
                message: 'Employee created successfully.',
                data: result,
            };
        }
        catch (err) {
            await trx.rollback();
            console.log(`Something went wrong. Employee couldnt be inserted\n ${err}`);
            result = err;
            return {
                success: false,
                message: `Something went wrong. Employee couldnt be inserted.`,
                data: err,
            };
        }
    }
    async update(payload, currentUser) {
        const employee = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id);
        if (employee) {
            const updatedEmployee = await this.modelClass
                .query()
                .update({
                managerId: payload.managerId ? payload.managerId : employee.managerId,
                leaveBalance: payload.leaveBalance ? payload.leaveBalance : employee.leaveBalance,
                salary: payload.salary ? payload.salary : employee.salary,
                designationId: payload.designationId ? payload.designationId : employee.designationId,
                userId: payload.userId ? payload.userId : employee.userId,
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
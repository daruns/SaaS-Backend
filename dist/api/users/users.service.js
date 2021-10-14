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
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../database/models/user.model");
const bcrypt = require("bcrypt");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UsersService = class UsersService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll() {
        const users = await this.modelClass.query().withGraphFetched({
            clients: {
                clientContacts: {}
            },
            groups: {
                permissions: {}
            },
        });
        return {
            success: true,
            message: 'User details fetch successfully.',
            data: users,
        };
    }
    async findById(id) {
        const user = await this.modelClass
            .query()
            .findById(id)
            .withGraphFetched({
            clients: {
                clientContacts: true,
            },
            groups: {
                permissions: true
            },
        });
        if (user) {
            return {
                success: true,
                message: 'User details fetch successfully.',
                data: user,
            };
        }
        else {
            return {
                success: true,
                message: 'No user details found.',
                data: {},
            };
        }
    }
    async findByUsername(username) {
        const user = await this.modelClass
            .query()
            .findOne({ username: username })
            .withGraphFetched({
            clients: {
                user: true,
                clientContacts: true,
            },
            groups: {
                user: true,
                permissions: {
                    user: true,
                }
            },
        });
        if (user) {
            return {
                success: true,
                message: 'User details fetch successfully.',
                data: user,
            };
        }
        else {
            return {
                success: true,
                message: 'No user details found.',
                data: {},
            };
        }
    }
    async findByEmail(email) {
        const user = await this.modelClass
            .query()
            .findOne({ email: email })
            .withGraphFetched({
            clients: {
                user: true,
                clientContacts: true,
            },
            groups: {
                user: true,
                permissions: {
                    user: true,
                }
            },
        });
        if (user) {
            return {
                success: true,
                message: 'User details fetch successfully.',
                data: user,
            };
        }
        else {
            return {
                success: true,
                message: 'No user details found.',
                data: {},
            };
        }
    }
    async create(payload) {
        const newUser = await this.modelClass.query().where({
            email: payload.email
        }).orWhere({
            username: payload.username
        });
        if (!newUser.length) {
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            payload.password = hashedPassword;
            try {
                const identifiers = await this.modelClass.query().insert(payload);
                const createUser = await this.modelClass.query().findById(identifiers.id);
                return {
                    success: true,
                    message: 'User created successfully.',
                    data: createUser,
                };
            }
            catch (err) {
                return {
                    success: false,
                    message: 'User didnt created',
                    data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'User already exists with this username or email address!',
                data: {},
            };
        }
    }
    async update(payload) {
        const user = await this.modelClass.query().findById(payload.id);
        if (user) {
            const updatedUser = await this.modelClass
                .query()
                .update({
                name: payload.name ? payload.name : user.name,
                password: payload.password ? payload.password : user.password,
                phoneNumber: payload.phoneNumber ? payload.phoneNumber : user.phoneNumber,
                website: payload.website ? payload.website : user.website,
                avatar: payload.avatar ? payload.avatar : user.avatar,
                userType: payload.userType ? payload.userType : user.userType,
                department: payload.department ? payload.department : user.department,
                reportsTo: payload.reportsTo ? payload.reportsTo : user.reportsTo,
                deleted: payload.deleted ? payload.deleted : user.deleted,
                status: payload.status ? payload.status : user.status,
            })
                .where({ id: payload.id });
            return {
                success: true,
                message: 'User details updated successfully.',
                data: updatedUser,
            };
        }
        else {
            return {
                success: true,
                message: 'No user found.',
                data: {},
            };
        }
    }
    async delete(payload) {
        const user = await this.modelClass
            .query()
            .delete()
            .where({ id: payload.id });
        if (user) {
            return {
                success: true,
                message: 'User deleted successfully.',
                data: user,
            };
        }
        else {
            return {
                success: false,
                message: 'No user found.',
                data: {},
            };
        }
    }
};
UsersService = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Injectable(),
    __param(0, common_1.Inject('UserModel')),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
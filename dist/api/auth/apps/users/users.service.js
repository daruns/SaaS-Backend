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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const brands_service_1 = require("../../../brands/brands.service");
const app_service_1 = require("../../../../app/app.service");
const user_layers_dto_1 = require("../../dto/user-layers.dto");
const subjects_enum_1 = require("../../can/enums/subjects.enum");
const actions_enum_1 = require("../../can/enums/actions.enum");
let UsersService = class UsersService {
    constructor(modelClass, permissionClass, brandService, fileUploadService) {
        this.modelClass = modelClass;
        this.permissionClass = permissionClass;
        this.brandService = brandService;
        this.fileUploadService = fileUploadService;
    }
    async allWithBrand(currentUser) {
        const users = await this.modelClass.query().where({ brandCode: currentUser.brandCode })
            .withGraphFetched({ permissions: true, myEmployeeProfile: true });
        users.map(user => {
            delete user.password;
            delete user.activationToken;
            delete user.passwordResetToken;
            delete user.passwordResetTokenExpire;
            delete user.activationTokenExpire;
        });
        return {
            success: true,
            message: 'User details fetch successfully.',
            data: users,
        };
    }
    async allWithBrandClients(currentUser) {
        const users = await this.modelClass.query().where({ brandCode: currentUser.brandCode }).where({ userType: user_layers_dto_1.UserLayers.layerFour })
            .withGraphFetched({ permissions: true, myEmployeeProfile: true });
        users.map(user => {
            delete user.password;
            delete user.activationToken;
            delete user.passwordResetToken;
            delete user.passwordResetTokenExpire;
            delete user.activationTokenExpire;
        });
        return {
            success: true,
            message: 'User details fetch successfully.',
            data: users,
        };
    }
    async allWithBrandNoClients(currentUser) {
        const users = await this.modelClass.query().where({ brandCode: currentUser.brandCode }).whereNot({ userType: user_layers_dto_1.UserLayers.layerFour })
            .withGraphFetched({ permissions: true, myEmployeeProfile: true });
        users.map(user => {
            delete user.password;
            delete user.activationToken;
            delete user.passwordResetToken;
            delete user.passwordResetTokenExpire;
            delete user.activationTokenExpire;
        });
        return {
            success: true,
            message: 'User details fetch successfully.',
            data: users,
        };
    }
    async findAll() {
        const users = await this.modelClass.query().withGraphFetched({
            clients: {
                clientContacts: {}
            },
            roles: {
                permissions: {}
            },
            permissions: {}
        });
        users.map(user => {
            delete user.password;
            delete user.activationToken;
            delete user.passwordResetToken;
            delete user.passwordResetTokenExpire;
            delete user.activationTokenExpire;
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
            brand: {},
            clients: {
                clientContacts: true,
            },
            roles: {
                permissions: true
            },
            permissions: {},
            myEmployeeProfile: {}
        });
        if (user) {
            delete user.password;
            return {
                success: true,
                message: 'User details fetch successfully.',
                data: user,
            };
        }
        else {
            return {
                success: false,
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
            brand: {},
            clients: {
                user: true,
                clientContacts: true,
            },
            roles: {
                permissions: {}
            },
            permissions: {},
            myEmployeeProfile: {}
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
                success: false,
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
            brand: {},
            clients: {
                user: true,
                clientContacts: true,
                meetings: true,
                socialMedias: true,
            },
            roles: {
                permissions: {}
            },
            permissions: {},
            myEmployeeProfile: {}
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
                success: false,
                message: 'No user details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser = null) {
        const { permissions } = payload;
        const newUser = await this.modelClass.query().where({
            email: payload.email
        }).orWhere({
            username: payload.username
        });
        if (!newUser.length) {
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            payload.password = hashedPassword;
            if (payload.avatar) {
                const avatarUploaded = payload.avatar;
                const fileUploaded = await this.fileUploadService.addFile(avatarUploaded, "avatars", { brandCode: payload.brandCode, username: payload.username });
                if (fileUploaded.success) {
                    console.log(fileUploaded.data);
                    payload.avatar = fileUploaded.data.url;
                }
                else
                    return fileUploaded;
            }
            const trx = await this.modelClass.startTransaction();
            try {
                const identifiers = await this.modelClass.query(trx).insert(payload);
                const createUser = await this.modelClass.query(trx).findById(identifiers.id);
                delete createUser.password;
                if (permissions && Array.isArray(permissions)) {
                    console.log("permissions: ", permissions);
                    const permissionsParam = payload.permissions;
                    if (!permissionsParam
                        ||
                            permissionsParam.some(ee => {
                                return ee.subjects.some(er => {
                                    return !Object.values(subjects_enum_1.Subjects).includes(er);
                                });
                            })) {
                        return {
                            success: false,
                            message: `unexpected subjects inserted doesnt match the make sure its matching the following array.`,
                            data: subjects_enum_1.SubjectsDto,
                        };
                    }
                    for (let eachperm of permissionsParam) {
                        if ((eachperm === null || eachperm === void 0 ? void 0 : eachperm.all) === true || (eachperm.create && eachperm.update && eachperm.delete)) {
                            for (let sbjct of eachperm.subjects) {
                                await this.permissionClass.query(trx).insert({
                                    subject: sbjct,
                                    action: `${actions_enum_1.Action.All}`,
                                    userId: createUser.id,
                                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                });
                            }
                        }
                        else {
                            for (let sbjct of eachperm.subjects) {
                                if (eachperm.read || eachperm.create || eachperm.update || eachperm.delete) {
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Read}`,
                                        userId: createUser.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                                if (eachperm.create) {
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Create}`,
                                        userId: createUser.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                                if (eachperm.update) {
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Update}`,
                                        userId: createUser.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                                if (eachperm.delete) {
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Delete}`,
                                        userId: createUser.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                            }
                        }
                    }
                }
                await trx.commit();
                return {
                    success: true,
                    message: 'User created successfully.',
                    data: createUser,
                };
            }
            catch (err) {
                await trx.rollback();
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
    async update(payload, currentUser) {
        const { permissions } = payload;
        const user = await this.modelClass.query().findById(payload.id);
        if (user) {
            if (payload.password) {
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password = hashedPassword;
            }
            if (permissions
                &&
                    permissions.some(ee => {
                        return ee.subjects.some(er => {
                            return !Object.values(subjects_enum_1.Subjects).includes(er);
                        });
                    })) {
                return {
                    success: false,
                    message: `unexpected subjects inserted doesnt match the make sure its matching the following array.`,
                    data: subjects_enum_1.SubjectsDto,
                };
            }
            if (payload.avatar) {
                const avatarUploaded = payload.avatar;
                const fileUploaded = await this.fileUploadService.addFile(avatarUploaded, "avatars", currentUser);
                if (fileUploaded.success) {
                    console.log(fileUploaded.data);
                    payload.avatar = fileUploaded.data.url;
                }
                else
                    return fileUploaded;
            }
            const trx = await this.modelClass.startTransaction();
            try {
                if (permissions && Array.isArray(permissions)) {
                    const permissionsParam = permissions;
                    await this.permissionClass.query(trx).where({ userId: payload.id, brandCode: user.brandCode }).delete();
                    for (let eachperm of permissionsParam) {
                        if ((eachperm === null || eachperm === void 0 ? void 0 : eachperm.all) === true || (eachperm.create && eachperm.update && eachperm.delete)) {
                            for (let sbjct of eachperm.subjects) {
                                const permFND = await this.permissionClass.query(trx).findOne({
                                    userId: payload.id,
                                    brandCode: currentUser === null || currentUser === void 0 ? void 0 : currentUser.brandCode,
                                    subject: sbjct,
                                    action: `${actions_enum_1.Action.All}`,
                                });
                                if (permFND) {
                                    throw ['permission already exist!', permFND];
                                }
                                await this.permissionClass.query(trx).insert({
                                    subject: sbjct,
                                    action: `${actions_enum_1.Action.All}`,
                                    userId: payload.id,
                                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                });
                            }
                        }
                        else {
                            for (let sbjct of eachperm.subjects) {
                                if (eachperm.read || eachperm.create || eachperm.update || eachperm.delete) {
                                    const permFND = await this.permissionClass.query(trx).findOne({
                                        userId: payload.id,
                                        brandCode: currentUser === null || currentUser === void 0 ? void 0 : currentUser.brandCode,
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Read}`,
                                    });
                                    if (permFND) {
                                        throw ['permission already exist!', permFND];
                                    }
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Read}`,
                                        userId: payload.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                                if (eachperm.create) {
                                    const permFND = await this.permissionClass.query(trx).findOne({
                                        userId: payload.id,
                                        brandCode: currentUser === null || currentUser === void 0 ? void 0 : currentUser.brandCode,
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Create}`,
                                    });
                                    if (permFND) {
                                        throw ['permission already exist!', permFND];
                                    }
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Create}`,
                                        userId: payload.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                                if (eachperm.update) {
                                    const permFND = await this.permissionClass.query(trx).findOne({
                                        userId: payload.id,
                                        brandCode: currentUser === null || currentUser === void 0 ? void 0 : currentUser.brandCode,
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Update}`,
                                    });
                                    if (permFND) {
                                        throw ['permission already exist!', permFND];
                                    }
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Update}`,
                                        userId: payload.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                                if (eachperm.delete) {
                                    const permFND = await this.permissionClass.query(trx).findOne({
                                        userId: payload.id,
                                        brandCode: currentUser === null || currentUser === void 0 ? void 0 : currentUser.brandCode,
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Delete}`,
                                    });
                                    if (permFND) {
                                        throw ['permission already exist!', permFND];
                                    }
                                    await this.permissionClass.query(trx).insert({
                                        subject: sbjct,
                                        action: `${actions_enum_1.Action.Delete}`,
                                        userId: payload.id,
                                        brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                                        createdBy: `${currentUser ? currentUser['username'] : ''}`,
                                    });
                                }
                            }
                        }
                    }
                }
                const updatedUser = await this.modelClass
                    .query(trx)
                    .update({
                    password: payload.password ? payload.password : user.password,
                    name: payload.name ? payload.name : user.name,
                    phoneNumber: payload.phoneNumber ? payload.phoneNumber : user.phoneNumber,
                    avatar: payload.avatar ? payload.avatar : user.avatar,
                    userType: payload.userType ? payload.userType : user.userType,
                    department: payload.department ? payload.department : user.department,
                    reportsTo: payload.reportsTo ? payload.reportsTo : user.reportsTo,
                    activationToken: payload.activationToken ? payload.activationToken : user.activationToken,
                    activationTokenExpire: payload.activationTokenExpire ? payload.activationTokenExpire : user.activationTokenExpire,
                    activatedAt: payload.activatedAt ? payload.activatedAt : user.activatedAt,
                    passwordResetToken: payload.passwordResetToken ? payload.passwordResetToken : user.passwordResetToken,
                    passwordResetTokenExpire: payload.passwordResetTokenExpire ? payload.passwordResetTokenExpire : user.passwordResetTokenExpire,
                    lastResetAt: payload.lastResetAt ? payload.lastResetAt : user.lastResetAt,
                    userId: payload.userId ? payload.userId : user.userId,
                    deleted: payload.deleted ? payload.deleted : user.deleted,
                    status: payload.status ? payload.status : user.status,
                    updatedBy: currentUser.username,
                })
                    .where({ id: payload.id });
                await trx.commit();
                return {
                    success: true,
                    message: 'User details updated successfully.',
                    data: updatedUser,
                };
            }
            catch (err) {
                await trx.rollback();
                return {
                    success: false,
                    message: "something wnet wrong!",
                    data: err,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'No user found.',
                data: {},
            };
        }
    }
    async delete(payload, currentUser) {
        try {
            const user = await this.modelClass
                .query()
                .delete()
                .where({ id: payload.id, brandCode: currentUser.brandCode });
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
        catch (err) {
            return {
                success: false,
                message: 'something went wrong! while deleting user.',
                data: err,
            };
        }
    }
};
UsersService = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Injectable(),
    __param(0, common_1.Inject('UserModel')),
    __param(1, common_1.Inject('PermissionModel')),
    __metadata("design:paramtypes", [Object, Object, brands_service_1.BrandsService,
        app_service_1.FileUploadService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
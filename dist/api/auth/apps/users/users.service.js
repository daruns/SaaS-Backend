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
let UsersService = class UsersService {
    constructor(modelClass, brandService, fileUploadService) {
        this.modelClass = modelClass;
        this.brandService = brandService;
        this.fileUploadService = fileUploadService;
    }
    async allWithBrand(currentUser) {
        const users = await this.modelClass.query().where({ brandCode: currentUser.brandCode });
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
        const users = await this.modelClass.query().where({ brandCode: currentUser.brandCode }).where({ userType: user_layers_dto_1.UserLayers.layerFour });
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
        const users = await this.modelClass.query().where({ brandCode: currentUser.brandCode }).whereNot({ userType: user_layers_dto_1.UserLayers.layerFour });
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
        delete user.password;
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
    async create(payload) {
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
            try {
                const identifiers = await this.modelClass.query().insert(payload);
                const createUser = await this.modelClass.query().findById(identifiers.id);
                delete createUser.password;
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
    async update(payload, currentUser) {
        const user = await this.modelClass.query().findById(payload.id);
        if (user) {
            if (payload.password) {
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password = hashedPassword;
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
            const updatedUser = await this.modelClass
                .query()
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
                brandCode: payload.brandCode ? payload.brandCode : user.brandCode,
                deleted: payload.deleted ? payload.deleted : user.deleted,
                status: payload.status ? payload.status : user.status,
                updatedBy: currentUser.username,
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
                success: false,
                message: 'No user found.',
                data: {},
            };
        }
    }
    async delete(payload, currentUser) {
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
};
UsersService = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Injectable(),
    __param(0, common_1.Inject('UserModel')),
    __metadata("design:paramtypes", [Object, brands_service_1.BrandsService,
        app_service_1.FileUploadService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
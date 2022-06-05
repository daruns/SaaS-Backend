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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
let PermissionsService = class PermissionsService {
    constructor(modelClass, userModel) {
        this.modelClass = modelClass;
        this.userModel = userModel;
    }
    async findAll(currentUser) {
        const permissions = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({
            user: {},
        });
        if (permissions.length) {
            return {
                success: true,
                message: 'Permissions details fetch successfully.',
                data: permissions,
            };
        }
        else {
            return {
                success: false,
                message: 'No permissions found.',
                data: permissions,
            };
        }
    }
    async findById(id, currentUser) {
        const permission = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({
            user: {},
        });
        if (permission) {
            return {
                success: true,
                message: 'Permission details fetch successfully.',
                data: permission,
            };
        }
        else {
            return {
                success: false,
                message: 'No permission details by Id found.',
                data: {},
            };
        }
    }
    async findByUser(userId, currentUser) {
        const permissions = await this.modelClass
            .query()
            .where({ userId: userId, brandCode: currentUser.brandCode })
            .withGraphFetched({});
        if (permissions.length) {
            return {
                success: true,
                message: 'Permissions details by userId fetch successfully.',
                data: permissions,
            };
        }
        else {
            return {
                success: false,
                message: 'No permission details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const userFnd = await this.userModel.query()
            .findById(payload.userId);
        if (!userFnd) {
            return {
                success: false,
                message: "user couldnt be found!",
                data: {}
            };
        }
        const newPermission = await this.modelClass.query()
            .where({
            subject: payload.subject,
            action: payload.action,
            userId: (payload === null || payload === void 0 ? void 0 : payload.userId) || null,
            brandCode: currentUser.brandCode,
            createdBy: currentUser.username
        });
        if (!newPermission.length) {
            try {
                payload['brandCode'] = currentUser.brandCode;
                payload['createdBy'] = currentUser.username;
                const identifiers = await this.modelClass.query().insert(payload);
                const createPermission = await this.modelClass.query().findById(identifiers.id);
                return {
                    success: true,
                    message: 'Permission created successfully.',
                    data: createPermission,
                };
            }
            catch (err) {
                return {
                    success: false,
                    message: 'Permission didnt created',
                    data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Permission already exists with this combination of parameters!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const permission = await this.modelClass.query().findById(payload.id);
        if (permission) {
            if (payload.userId) {
                const userFnd = await this.userModel.query()
                    .findOne({ brandCode: currentUser.brandCode, id: payload.userId });
                if (!userFnd) {
                    return {
                        success: false,
                        message: "user couldnt be found!",
                        data: {}
                    };
                }
            }
            const updatedPermission = await this.modelClass
                .query()
                .update({
                subject: payload.subject ? payload.subject : permission.subject,
                action: payload.action ? payload.action : permission.action,
                userId: payload.userId ? payload.userId : permission.userId,
                updatedBy: currentUser.username,
            })
                .where({ id: payload.id, brandCode: currentUser.brandCode });
            return {
                success: true,
                message: 'Permission details updated successfully.',
                data: updatedPermission,
            };
        }
        else {
            return {
                success: true,
                message: 'No Permission found.',
                data: {},
            };
        }
    }
    async delete(payload, currentUser) {
        const permission = await this.modelClass
            .query()
            .delete()
            .where({ id: payload.id, brandCode: currentUser.brandCode });
        if (permission) {
            return {
                success: true,
                message: 'Permission deleted successfully.',
                data: permission,
            };
        }
        else {
            return {
                success: false,
                message: 'No Permission found.',
                data: {},
            };
        }
    }
};
PermissionsService = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Injectable(),
    __param(0, common_1.Inject('PermissionModel')),
    __param(1, common_1.Inject('UserModel')),
    __metadata("design:paramtypes", [Object, Object])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map
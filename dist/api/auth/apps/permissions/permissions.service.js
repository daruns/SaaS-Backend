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
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll() {
        const permissions = await this.modelClass.query().withGraphFetched({
            user: {},
            role: {
                users: true
            },
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
    async findById(id) {
        const permission = await this.modelClass
            .query()
            .findById(id)
            .withGraphFetched({
            user: {},
            role: {
                users: true
            },
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
    async findByRoleId(roleId) {
        const permissions = await this.modelClass
            .query()
            .where({ roleId: roleId })
            .withGraphFetched({
            user: {}
        });
        if (permissions.length) {
            return {
                success: true,
                message: 'Permissions details by roleId fetch successfully.',
                data: permissions,
            };
        }
        else {
            return {
                success: false,
                message: 'No permissions details found for roleId:' + roleId,
                data: {},
            };
        }
    }
    async findByUser(userId) {
        const permissions = await this.modelClass
            .query()
            .where({ userId: userId })
            .withGraphFetched({
            role: {
                users: true,
            },
        });
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
    async create(payload) {
        const newPermission = await this.modelClass.query()
            .where({
            subject: payload.subject,
            resource: payload.resource,
            weight: payload.weight,
            action: payload.action,
            userId: payload.userId,
        }).orWhere({
            subject: payload.subject,
            resource: payload.resource,
            weight: payload.weight,
            action: payload.action,
            roleId: payload.roleId,
        });
        if (!newPermission.length) {
            try {
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
    async update(payload) {
        const permission = await this.modelClass.query().findById(payload.id);
        if (permission) {
            const updatedPermission = await this.modelClass
                .query()
                .update({
                subject: payload.subject ? payload.subject : permission.subject,
                action: payload.action ? payload.action : permission.action,
                resource: payload.resource ? payload.resource : permission.resource,
                weight: payload.weight ? payload.weight : permission.weight,
                userId: payload.userId ? payload.userId : permission.userId,
                roleId: payload.roleId ? payload.roleId : permission.roleId,
                status: payload.status ? payload.status : permission.status,
                updatedBy: '',
            })
                .where({ id: payload.id });
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
    async delete(payload) {
        const permission = await this.modelClass
            .query()
            .delete()
            .where({ id: payload.id });
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
    __metadata("design:paramtypes", [Object])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map
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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
let RolesService = class RolesService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll() {
        const roles = await this.modelClass.query().withGraphFetched({
            clients: {
                clientContacts: {}
            },
            groups: {
                permissions: {}
            },
        });
        return {
            success: true,
            message: 'Role details fetch successfully.',
            data: roles,
        };
    }
    async findById(id) {
        const role = await this.modelClass
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
        if (role) {
            return {
                success: true,
                message: 'Role details fetch successfully.',
                data: role,
            };
        }
        else {
            return {
                success: true,
                message: 'No role details found.',
                data: {},
            };
        }
    }
    async findByRolename(rolename) {
        const role = await this.modelClass
            .query()
            .findOne({ name: rolename })
            .withGraphFetched({
            permissions: {},
            users: {
                permissions: true
            },
        });
        if (role) {
            return {
                success: true,
                message: 'Role details fetch successfully.',
                data: role,
            };
        }
        else {
            return {
                success: true,
                message: 'No role details found.',
                data: {},
            };
        }
    }
    async create(payload) {
        const newRole = await this.modelClass.query().where({
            name: payload.name
        });
        if (!newRole.length) {
            try {
                const identifiers = await this.modelClass.query().insert(payload);
                const createRole = await this.modelClass.query().findById(identifiers.id);
                return {
                    success: true,
                    message: 'Role created successfully.',
                    data: createRole,
                };
            }
            catch (err) {
                return {
                    success: false,
                    message: 'Role didnt created',
                    data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Role already exists with this rolename or email address!',
                data: {},
            };
        }
    }
    async update(payload) {
        const role = await this.modelClass.query().findById(payload.id);
        if (role) {
            const updatedRole = await this.modelClass
                .query()
                .update({
                name: payload.name ? payload.name : role.name,
                deleted: payload.deleted ? payload.deleted : role.deleted,
                status: payload.status ? payload.status : role.status,
            })
                .where({ id: payload.id });
            return {
                success: true,
                message: 'Role details updated successfully.',
                data: updatedRole,
            };
        }
        else {
            return {
                success: true,
                message: 'No role found.',
                data: {},
            };
        }
    }
    async delete(payload) {
        const role = await this.modelClass
            .query()
            .delete()
            .where({ id: payload.id });
        if (role) {
            return {
                success: true,
                message: 'Role deleted successfully.',
                data: role,
            };
        }
        else {
            return {
                success: false,
                message: 'No role found.',
                data: {},
            };
        }
    }
};
RolesService = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Injectable(),
    __param(0, common_1.Inject('RoleModel')),
    __metadata("design:paramtypes", [Object])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map
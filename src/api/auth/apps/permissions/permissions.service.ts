import { Injectable, Inject, UseGuards } from '@nestjs/common';
import { PermissionModel } from 'src/database/models/permission.model';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Subject } from 'rxjs';
import { UpdateExpression } from 'typescript';
import moment = require('moment');

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@UseGuards(JwtAuthGuard)
@Injectable()
export class PermissionsService {
  constructor(@Inject('PermissionModel') private modelClass: ModelClass<PermissionModel>) {}

  // permission list with list of posts and comments on post
  async findAll(): Promise<ResponseData> {
    const permissions = await this.modelClass.query().withGraphFetched({
      user: {
      },
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
    } else {
      return {
        success: false,
        message: 'No permissions found.',
        data: permissions,
      };
    }
  }

  // find one permission info by permissionId with posts data
  async findById(id: number): Promise<ResponseData> {
    const permission = await this.modelClass
      .query()
      // .where({subdomain: currentPermission.subdomain})
      .findById(id)
      .withGraphFetched({
        user: {
        },
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
    } else {
      return {
        success: false,
        message: 'No permission details by Id found.',
        data: {},
      };
    }
  }
  // find permissions info by roleId with posts data
  async findByRoleId(roleId: number): Promise<ResponseData> {
    const permissions = await this.modelClass
      .query()
      .where({roleId: roleId})
      .withGraphFetched({
        user: {}
      });
    if (permissions.length) {
      return {
        success: true,
        message: 'Permissions details by roleId fetch successfully.',
        data: permissions,
      };
    } else {
      return {
        success: false,
        message: 'No permissions details found for roleId:' + roleId,
        data: {},
      };
    }
  }
  // find permissions info by userId with posts data
  async findByUser(userId: number): Promise<ResponseData> {
    const permissions = await this.modelClass
      .query()
      .where({userId: userId})
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
    } else {
      return {
        success: false,
        message: 'No permission details found.',
        data: {},
      };
    }
  }
  // Create user before save encrypt password
  async create(payload: CreatePermissionDto): Promise<ResponseData> {
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
      // const hashedPassword = (payload.password, 10);
      // payload.password = hashedPassword
      try {

        const identifiers = await this.modelClass.query().insert(payload);
        const createPermission = await this.modelClass.query().findById(identifiers.id);
        return {
          success: true,
          message: 'Permission created successfully.',
          data: createPermission,
        }
      } catch(err) {
        return {
          success: false,
          message: 'Permission didnt created',
          data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
        }
      }
    } else {
      return {
        success: false,
        message: 'Permission already exists with this combination of parameters!',
        data: {},
      };
    }
  }

  // Update permission before save encrypt password
  async update(payload: UpdatePermissionDto): Promise<ResponseData> {
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
          updatedAt: moment().format(),
        })
        .where({ id: payload.id });
      return {
        success: true,
        message: 'Permission details updated successfully.',
        data: updatedPermission,
      };
    } else {
      return {
        success: true,
        message: 'No Permission found.',
        data: {},
      };
    }
  }

  // Delete user before save encrypt password
  async delete(payload): Promise<ResponseData> {
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
    } else {
      return {
        success: false,
        message: 'No Permission found.',
        data: {},
      };
    }
  }
}

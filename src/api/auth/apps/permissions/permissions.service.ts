import { Injectable, Inject, UseGuards } from '@nestjs/common';
import { PermissionModel } from 'src/database/models/permission.model';
import { UserModel } from 'src/database/models/user.model'
import { ModelClass } from 'objection';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@UseGuards(JwtAuthGuard)
@Injectable()
export class PermissionsService {
  constructor(
    @Inject('PermissionModel') private modelClass: ModelClass<PermissionModel>,
    @Inject('UserModel') private userModel: ModelClass<UserModel>
  ) {}

  // permission list with list of posts and comments on post
  async findAll(currentUser): Promise<ResponseData> {
    const permissions = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .withGraphFetched({
      user: {
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
  async findById(id: number, currentUser): Promise<ResponseData> {
    const permission = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})
      .findById(id)
      .withGraphFetched({
        user: {
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
  // find permissions info by userId with posts data
  async findByUser(userId: number,currentUser): Promise<ResponseData> {
    const permissions = await this.modelClass
      .query()
      .where({userId: userId, brandCode: currentUser.brandCode})
      .withGraphFetched({
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
  async create(payload: CreatePermissionDto, currentUser): Promise<ResponseData> {
    const userFnd = await this.userModel.query()
    .findById(payload.userId)
    if (!userFnd) {
      return {
        success: false,
        message: "user couldnt be found!",
        data: {}
      }
    }

    const newPermission:PermissionModel[] = await this.modelClass.query()
    .where({
      subject: payload.subject,
      action: payload.action,
      userId: payload?.userId || null,
      brandCode: currentUser.brandCode,
      createdBy: currentUser.username
    })
    // TODO: Add Role id checking before inserting to databse
    // let newPermissionByRoleId;
    // if (payload.roleId) {
    //   newPermissionByRoleId = await this.modelClass.query()
    //   .where({
    //     subject: payload.subject,
    //     resource: payload.resource,
    //     weight: payload.weight,
    //     action: payload.action,
    //     roleId: payload?.roleId || null
    //   })
    // }
    if (!newPermission.length) {
      try {
        payload['brandCode'] = currentUser.brandCode
        payload['createdBy'] = currentUser.username
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
  async update(payload: UpdatePermissionDto, currentUser): Promise<ResponseData> {
    const permission = await this.modelClass.query().findById(payload.id);
    if (permission) {
      if (payload.userId) {
        const userFnd = await this.userModel.query()
        .findOne({brandCode: currentUser.brandCode, id: payload.userId})
        if (!userFnd) {
          return {
            success: false,
            message: "user couldnt be found!",
            data: {}
          }
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
    } else {
      return {
        success: true,
        message: 'No Permission found.',
        data: {},
      };
    }
  }

  // Delete user before save encrypt password
  async delete(payload,currentUser): Promise<ResponseData> {
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
    } else {
      return {
        success: false,
        message: 'No Permission found.',
        data: {},
      };
    }
  }
}

import { Injectable, Inject, UseGuards } from '@nestjs/common';
import { RoleModel } from 'src/database/models/role.model';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@UseGuards(JwtAuthGuard)
@Injectable()
export class RolesService {
  constructor(@Inject('RoleModel') private modelClass: ModelClass<RoleModel>) {}

  // role list with list of posts and comments on post
  async findAll(): Promise<ResponseData> {
    const roles = await this.modelClass.query().withGraphFetched({
      clients: {
        clientContacts: {}
      },
      groups: {
        permissions: {
        }
      },
    });
    return {
      success: true,
      message: 'Role details fetch successfully.',
      data: roles,
    };
  }

  // find one role info by roleId with posts data
  async findById(id: number): Promise<ResponseData> {
    const role = await this.modelClass
      .query()
      // .where({subdomain: currentRole.subdomain})
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
    } else {
      return {
        success: true,
        message: 'No role details found.',
        data: {},
      };
    }
  }
  // find one role info by rolename with posts data
  async findByRolename(rolename: string): Promise<ResponseData> {
    const role = await this.modelClass
      .query()
      .findOne({name: rolename})
      .withGraphFetched({
        permissions: {
        },
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
    } else {
      return {
        success: true,
        message: 'No role details found.',
        data: {},
      };
    }
  }
  // find one role info by email with posts data
  // async findByEmail(email: string): Promise<ResponseData> {
  //   const role = await this.modelClass
  //     .query()
  //     .findOne({email: email})
  //     .withGraphFetched({
  //       clients: {
  //         role: true,
  //         clientContacts: true,
  //         meetings: true,
  //         socialMedias: true,
  //       },
  //       groups: {
  //         role: true,
  //         permissions: {
  //           role: true,
  //         }
  //       },
  //     });
  //   if (role) {
  //     return {
  //       success: true,
  //       message: 'Role details fetch successfully.',
  //       data: role,
  //     };
  //   } else {
  //     return {
  //       success: true,
  //       message: 'No role details found.',
  //       data: {},
  //     };
  //   }
  // }
  // Create role before save encrypt password
  async create(payload): Promise<ResponseData> {
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
        }
      } catch(err) {
        return {
          success: false,
          message: 'Role didnt created',
          data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
        }
      }
    } else {
      return {
        success: false,
        message: 'Role already exists with this rolename or email address!',
        data: {},
      };
    }
  }

  // Update role before save encrypt password
  async update(payload): Promise<ResponseData> {
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
    } else {
      return {
        success: true,
        message: 'No role found.',
        data: {},
      };
    }
  }

  // Delete role before save encrypt password
  async delete(payload): Promise<ResponseData> {
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
    } else {
      return {
        success: false,
        message: 'No role found.',
        data: {},
      };
    }
  }
}

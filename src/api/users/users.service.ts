import { Injectable, Inject, UseGuards } from '@nestjs/common';
import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@UseGuards(JwtAuthGuard)
@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}

  // user list with list of posts and comments on post
  async findAll(): Promise<ResponseData> {
    const users = await this.modelClass.query().withGraphFetched({
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
      message: 'User details fetch successfully.',
      data: users,
    };
  }

  // find one user info by userId with posts data
  async findById(id: number): Promise<ResponseData> {
    const user = await this.modelClass
      .query()
      // .where({subdomain: currentUser.subdomain})
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
    } else {
      return {
        success: true,
        message: 'No user details found.',
        data: {},
      };
    }
  }
  // find one user info by username with posts data
  async findByUsername(username: string): Promise<ResponseData> {
    const user = await this.modelClass
      .query()
      .findOne({username: username})
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
    } else {
      return {
        success: true,
        message: 'No user details found.',
        data: {},
      };
    }
  }
  // find one user info by email with posts data
  async findByEmail(email: string): Promise<ResponseData> {
    const user = await this.modelClass
      .query()
      .findOne({email: email})
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
    } else {
      return {
        success: true,
        message: 'No user details found.',
        data: {},
      };
    }
  }
  // Create user before save encrypt password
  async create(payload): Promise<ResponseData> {
    const newUser = await this.modelClass.query().where({
      email: payload.email
    }).orWhere({
      username: payload.username
    });
    if (!newUser.length) {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword
      try {

        const identifiers = await this.modelClass.query().insert(payload);
        const createUser = await this.modelClass.query().findById(identifiers.id);
        return {
          success: true,
          message: 'User created successfully.',
          data: createUser,
        }
      } catch(err) {
        return {
          success: false,
          message: 'User didnt created',
          data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
        }
      }
    } else {
      return {
        success: false,
        message: 'User already exists with this username or email address!',
        data: {},
      };
    }
  }

  // Update user before save encrypt password
  async update(payload): Promise<ResponseData> {
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
    } else {
      return {
        success: true,
        message: 'No user found.',
        data: {},
      };
    }
  }

  // Delete user before save encrypt password
  async delete(payload): Promise<ResponseData> {
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
    } else {
      return {
        success: false,
        message: 'No user found.',
        data: {},
      };
    }
  }
}

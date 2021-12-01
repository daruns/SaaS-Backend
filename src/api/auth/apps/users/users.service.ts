import { Injectable, Inject, UseGuards, Req } from '@nestjs/common';
import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { BrandsService } from 'src/api/brands/brands.service';
import {FileParamDto, FileUploadService} from "src/app/app.service"

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@UseGuards(JwtAuthGuard)
@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    private brandService: BrandsService,
    private fileUploadService: FileUploadService,
    ) {}

  // user list with list of posts and comments on post
  async allWithBrand(currentUser): Promise<ResponseData> {
    const users = await this.modelClass.query().where({brandCode: currentUser.brandCode})
    users.map(user => {
      delete user.password
      delete user.activationToken
      delete user.passwordResetToken
      delete user.passwordResetTokenExpire
      delete user.activationTokenExpire
    })
    return {
      success: true,
      message: 'User details fetch successfully.',
      data: users,
    };
  }

  async allWithBrandClients(currentUser): Promise<ResponseData> {
    const users = await this.modelClass.query().where({brandCode: currentUser.brandCode}).where({userType: "partner"})
    users.map(user => {
      delete user.password
      delete user.activationToken
      delete user.passwordResetToken
      delete user.passwordResetTokenExpire
      delete user.activationTokenExpire
    })
    return {
      success: true,
      message: 'User details fetch successfully.',
      data: users,
    };
  }

  async allWithBrandNoClients(currentUser): Promise<ResponseData> {
    const users = await this.modelClass.query().where({brandCode: currentUser.brandCode}).whereNot({userType: "partner"})
    users.map(user => {
      delete user.password
      delete user.activationToken
      delete user.passwordResetToken
      delete user.passwordResetTokenExpire
      delete user.activationTokenExpire
    })
    return {
      success: true,
      message: 'User details fetch successfully.',
      data: users,
    };
  }

  // user list with list of posts and comments on post
  async findAll(): Promise<ResponseData> {
    const users = await this.modelClass.query().withGraphFetched({
      clients: {
        clientContacts: {}
      },
      roles: {
        permissions: {
        }
      },
      permissions: {
      }
    });
    users.map(user => {
      delete user.password
      delete user.activationToken
      delete user.passwordResetToken
      delete user.passwordResetTokenExpire
      delete user.activationTokenExpire
    })
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
        brand:{},
        clients: {
          clientContacts: true,
        },
        roles: {
          permissions: true
        },
        permissions: {
        }
      });
    delete user.password
  
    if (user) {
      return {
        success: true,
        message: 'User details fetch successfully.',
        data: user,
      };
    } else {
      return {
        success: false,
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
        brand:{},
        clients: {
          user: true,
          clientContacts: true,
        },
        roles: {
          permissions: {
          }
        },
        permissions: {
        }
      });
    if (user) {
      return {
        success: true,
        message: 'User details fetch successfully.',
        data: user,
      };
    } else {
      return {
        success: false,
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
        brand:{},
        clients: {
          user: true,
          clientContacts: true,
          meetings: true,
          socialMedias: true,
        },
        roles: {
          permissions: {
          }
        },
        permissions: {
        }
      });
    if (user) {
      return {
        success: true,
        message: 'User details fetch successfully.',
        data: user,
      };
    } else {
      return {
        success: false,
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
      if (payload.avatar) {
        const avatarUploaded: FileParamDto = payload.avatar
        const fileUploaded = await this.fileUploadService.addFile(avatarUploaded, "avatars", {brandCode: payload.brandCode, username: payload.username})
        if (fileUploaded.success) {
          console.log(fileUploaded.data)
          payload.avatar = fileUploaded.data.url
        } else return fileUploaded
      }
      try {
        // const createBrandDto = {
        //   name: payload.brandCode,
        // }
    
        // const createBrand = await this.brandService.create(createBrandDto)
        // console.log(payload)
        // if (createBrand.success){
          const identifiers = await this.modelClass.query().insert(payload);
          const createUser = await this.modelClass.query().findById(identifiers.id);
          delete createUser.password
          return {
            success: true,
            message: 'User created successfully.',
            data: createUser,
          }
        // }else
        // {
        //   return createBrand
        // }
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
  async update(payload, currentUser): Promise<ResponseData> {
    const user = await this.modelClass.query().findById(payload.id);
    if (user) {
      if (payload.password) {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        payload.password = hashedPassword
      }
      if (payload.avatar) {
        const avatarUploaded = payload.avatar
        const fileUploaded = await this.fileUploadService.addFile(avatarUploaded, "avatars", currentUser)
        if (fileUploaded.success) {
          console.log(fileUploaded.data)
          payload.avatar = fileUploaded.data.url
        } else return fileUploaded
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
    } else {
      return {
        success: false,
        message: 'No user found.',
        data: {},
      };
    }
  }

  // Delete user before save encrypt password
  async delete(payload, currentUser): Promise<ResponseData> {
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
    } else {
      return {
        success: false,
        message: 'No user found.',
        data: {},
      };
    }
  }
}

import { Injectable, Inject, UseGuards, Req } from '@nestjs/common';
import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { BrandsService } from 'src/api/brands/brands.service';
import {FileParamDto, FileUploadService} from "src/app/app.service"
import { UserLayers } from '../../dto/user-layers.dto';
import { CreatePermissionDto } from '../permissions/dto/create-permission.dto';
import { CreateUserDto, PermissionType } from './dto/create-user.dto'
import PermissionModel from 'src/database/models/permission.model';
import { Subjects, SubjectsDto } from '../../can/enums/subjects.enum';
import { Action } from '../../can/enums/actions.enum';
import { Subject } from 'rxjs';

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
    @Inject('PermissionModel') private permissionClass: ModelClass<PermissionModel>,
    private brandService: BrandsService,
    private fileUploadService: FileUploadService,
    ) {}

  // user list with list of posts and comments on post
  async allWithBrand(currentUser): Promise<ResponseData> {
    const users = await this.modelClass.query().where({brandCode: currentUser.brandCode})
    .withGraphFetched({permissions: true,myEmployeeProfile: true})
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
    const users = await this.modelClass.query().where({brandCode: currentUser.brandCode}).where({userType: UserLayers.layerFour})
    .withGraphFetched({permissions: true,myEmployeeProfile: true})
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
    const users = await this.modelClass.query().where({brandCode: currentUser.brandCode}).whereNot({userType: UserLayers.layerFour})
    .withGraphFetched({permissions: true,myEmployeeProfile: true})
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
        },
        myEmployeeProfile: {
        }
      });
    if (user) {
      delete user.password
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
        },
        myEmployeeProfile: {
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
        },
        myEmployeeProfile: {
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
  async create(payload,currentUser=null): Promise<ResponseData> {
    const { permissions } = payload
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
      const trx = await this.modelClass.startTransaction()
      try {
        // const createBrandDto = {
        //   name: payload.brandCode,
        // }
    
        // const createBrand = await this.brandService.create(createBrandDto)
        // console.log(payload)
        // if (createBrand.success){
        const identifiers = await this.modelClass.query(trx).insert(payload);
        const createUser = await this.modelClass.query(trx).findById(identifiers.id);
        delete createUser.password
        if (permissions && Array.isArray(permissions)) {
          console.log("permissions: ", permissions)
          const permissionsParam: PermissionType = payload.permissions
          if (
            !permissionsParam
            ||
            permissionsParam.some(ee => {
              return ee.subjects.some(er => {
                // @ts-ignore
                return !Object.values(Subjects).includes(er)
              })
            })
          ) {
            return {
              success: false,
              message: `unexpected subjects inserted doesnt match the make sure its matching the following array.`,
              data: SubjectsDto,
            };
          }
          for (let eachperm of permissionsParam) {
            if (eachperm?.all === true || ( eachperm.create && eachperm.update && eachperm.delete)) {
              // @ts-ignore
              for (let sbjct of eachperm.subjects) {
                await this.permissionClass.query(trx).insert({
                  subject: sbjct,
                  action: `${Action.All}`,
                  userId: createUser.id,
                  brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                  createdBy: `${currentUser ? currentUser['username'] : ''}`,
                })
              }
            } else {
              for (let sbjct of eachperm.subjects) {
                if (eachperm.read || eachperm.create || eachperm.update || eachperm.delete) {
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Read}`,
                    userId: createUser.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
                }
                if (eachperm.create) {
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Create}`,
                    userId: createUser.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
                }
                if (eachperm.update) {
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Update}`,
                    userId: createUser.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
                }
                if (eachperm.delete) {
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Delete}`,
                    userId: createUser.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
                }
              }
            }
          }
        }
        await trx.commit()
        return {
          success: true,
          message: 'User created successfully.',
          data: createUser,
        }
        // } else {
        //   return createBrand
        // }
      } catch(err) {
        await trx.rollback()
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
  // implement permission for owner and other users to not be able change the user
  // Update user before save encrypt password
  async update(payload, currentUser): Promise<ResponseData> {
    const { permissions } = payload
    const user = await this.modelClass.query().findById(payload.id);
    if (user) {
      
      if (payload.password) {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        payload.password = hashedPassword
      }
      if (
        permissions
        &&
        permissions.some(ee => {
          return ee.subjects.some(er => {
            // @ts-ignore
            return !Object.values(Subjects).includes(er)
          })
        })
      ) {
        return {
          success: false,
          message: `unexpected subjects inserted doesnt match the make sure its matching the following array.`,
          data: SubjectsDto,
        };      
      }
      if (payload.avatar) {
        const avatarUploaded = payload.avatar
        const fileUploaded = await this.fileUploadService.addFile(avatarUploaded, "avatars", currentUser)
        if (fileUploaded.success) {
          console.log(fileUploaded.data)
          payload.avatar = fileUploaded.data.url
        } else return fileUploaded
      }
      const trx = await this.modelClass.startTransaction()
      try {
        if (permissions && Array.isArray(permissions)) {
          const permissionsParam: PermissionType = permissions
          await this.permissionClass.query(trx).where({userId: payload.id, brandCode: user.brandCode}).delete()
          for (let eachperm of permissionsParam) {
            if (eachperm?.all === true || ( eachperm.create && eachperm.update && eachperm.delete)) {
              // @ts-ignore
              for (let sbjct of eachperm.subjects) {
                const permFND = await this.permissionClass.query(trx).findOne({
                  userId: payload.id,
                  brandCode: currentUser?.brandCode,
                  subject: sbjct,
                  action: `${Action.All}`,
                })
                if (permFND) {
                  throw ['permission already exist!',permFND]
                }
                await this.permissionClass.query(trx).insert({
                  subject: sbjct,
                  action: `${Action.All}`,
                  userId: payload.id,
                  brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                  createdBy: `${currentUser ? currentUser['username'] : ''}`,
                })
              }
            } else {
              for (let sbjct of eachperm.subjects) {
                if (eachperm.read || eachperm.create || eachperm.update || eachperm.delete) {
                  const permFND = await this.permissionClass.query(trx).findOne({
                    userId: payload.id,
                    brandCode: currentUser?.brandCode,
                    subject: sbjct,
                    action: `${Action.Read}`,
                  })
                  if (permFND) {
                    throw ['permission already exist!',permFND]
                  }  
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Read}`,
                    userId: payload.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
                }
                if (eachperm.create) {
                  const permFND = await this.permissionClass.query(trx).findOne({
                    userId: payload.id,
                    brandCode: currentUser?.brandCode,
                    subject: sbjct,
                    action: `${Action.Create}`,
                  })
                  if (permFND) {
                    throw ['permission already exist!',permFND]
                  }  
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Create}`,
                    userId: payload.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
                }
                if (eachperm.update) {
                  const permFND = await this.permissionClass.query(trx).findOne({
                    userId: payload.id,
                    brandCode: currentUser?.brandCode,
                    subject: sbjct,
                    action: `${Action.Update}`,
                  })
                  if (permFND) {
                    throw ['permission already exist!',permFND]
                  }
  
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Update}`,
                    userId: payload.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
                }
                if (eachperm.delete) {
                  const permFND = await this.permissionClass.query(trx).findOne({
                    userId: payload.id,
                    brandCode: currentUser?.brandCode,
                    subject: sbjct,
                    action: `${Action.Delete}`,
                  })
                  if (permFND) {
                    throw ['permission already exist!',permFND]
                  }
  
                  // @ts-ignore
                  await this.permissionClass.query(trx).insert({
                    subject: sbjct,
                    action: `${Action.Delete}`,
                    userId: payload.id,
                    brandCode: `${currentUser ? currentUser['brandCode'] : ''}`,
                    createdBy: `${currentUser ? currentUser['username'] : ''}`,
                  })
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
        await trx.commit()
        return {
          success: true,
          message: 'User details updated successfully.',
          data: updatedUser,
        };
      } catch (err) {
        await trx.rollback()
        return {
          success: false,
          message: "something wnet wrong!",
          data: err,
        }
      }
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
      } else {
        return {
          success: false,
          message: 'No user found.',
          data: {},
        };
      }
    } catch(err) {
      return {
        success: false,
        message: 'something went wrong! while deleting user.',
        data: err,
      };
  }
  }
}

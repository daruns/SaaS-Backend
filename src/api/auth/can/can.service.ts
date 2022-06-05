import { Injectable, Inject, UseGuards, Req } from '@nestjs/common';
import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
import { UserLayers } from '../dto/user-layers.dto';
import PermissionModel from 'src/database/models/permission.model';
import { Subjects } from './enums/subjects.enum'
import { Action } from './enums/actions.enum';
@Injectable()
export class CanService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    @Inject('PermissionModel') private permissionClass: ModelClass<PermissionModel>,
  ) {}

  // user list with list of posts and comments on post
  async can(currentUser, action:string, subject:string): Promise<boolean> {
    if (subject === Subjects.EveryoneAllowed) return true
    if (currentUser.userType === UserLayers.layerOne) {
      if (subject === Subjects.MasterAllowed) return false
      return true
    }
    const permissionFnd = await this.permissionClass.query()
      .whereIn('action', [action, Action.All.toString()])
      .findOne({
        subject: subject, userId: currentUser.id, brandCode: currentUser.brandCode
      })
    console.log("lrjfnr: ",permissionFnd)
    if (permissionFnd) {
      return true
    }
    return false
  }
}

import { BaseModel } from './base.model';
import { UserModel } from './user.model';
// import { RoleModel } from './role.model';
import { Model } from 'objection';

const tbName = 'permissions'
export class PermissionModel extends BaseModel {
  static tableName = tbName;

  subject: string
  action: string
  // resource: string
  // weight: number
  userId: number
  // roleId: number
  brandCode: string
  createdBy: string

  user: UserModel;
  // role: RoleModel;
  static relationMappings = {
    // permission by user
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.userId`,
        to: 'users.id',
      },
    },
    // role detail on which permission made
    // role: {
    //   modelClass: `${__dirname}/role.model`,
    //   relation: Model.BelongsToOneRelation,
    //   join: {
    //     from: `${tbName}.roleId`,
    //     to: 'roles.id',
    //   },
    // },
  };
}

export default PermissionModel

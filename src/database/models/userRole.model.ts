import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { RoleModel } from './role.model';
import { Model } from 'objection';

const tbName = 'userRoles'
export class UserRoleModel extends BaseModel {
  static tableName = tbName;

  userId: number;
  roleId: number;

  user: UserModel;
  role: RoleModel;

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.userId`,
        to: 'users.id',
      },
    },

    role: {
      modelClass: `${__dirname}/role.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.roleId`,
        to: 'roles.id',
      },
    },
  };
}

export default UserRoleModel

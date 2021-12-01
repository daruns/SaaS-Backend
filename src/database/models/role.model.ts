import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { PermissionModel } from './permission.model';
import { Model } from 'objection';
import { UserRoleModel } from './userRole.model';

const tbName = 'roles'
export class RoleModel extends BaseModel {
  static tableName = tbName;

  name: string

  users: UserModel;
  permissions: PermissionModel[];
  userRoles: UserRoleModel[]

  static relationMappings = {
    // relationship with user
    users: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tbName}.id`,
        through: {
          from: 'userRoles.roleId',
          to: 'usersRoles.userId'
        },
        to: 'users.id',
      },
    },

    userRoles: {
      modelClass: `${__dirname}/userRole.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'userRoles.userId',
      },
    },

    // list out comment on current role
    permissions: {
      modelClass: `${__dirname}/permission.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'permissions.roleId',
      },
    },
  };
}

export default RoleModel

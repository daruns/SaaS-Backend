import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { PermissionModel } from './permission.model';
import { Model } from 'objection';

export class GroupModel extends BaseModel {
  static tableName = 'groups';

  name: string
  group: string
  userId: number;

  // get user details or group made by user info
  user: UserModel;
  // list of all permissions on present group
  permissions: PermissionModel[];

  static relationMappings = {
    // relationship with user
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'groups.userId',
        to: 'users.id',
      },
    },

    // list out comment on current group
    permissions: {
      modelClass: `${__dirname}/permission.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'groups.id',
        to: 'permissions.groupId',
      },
    },
  };
}

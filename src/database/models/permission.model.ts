import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { GroupModel } from './group.model';
import { Model } from 'objection';

export class PermissionModel extends BaseModel {
  static tableName = 'permissions';

  subject: string
  action: string
  resource: string
  weight: number
  userId: number
  groupId: number

  user: UserModel;
  group: GroupModel;

  static relationMappings = {
    // permission by user
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'permissions.userId',
        to: 'users.id',
      },
    },
    // group detail on which permission made
    group: {
      modelClass: `${__dirname}/group.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'permissions.groupId',
        to: 'groups.id',
      },
    },
  };
}

import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { GroupModel } from './group.model';
import { PermissionModel } from './permission.model';
import { Exclude } from "class-transformer";
export class UserModel extends BaseModel {
  static tableName = 'users';


  username: string
  email: string
  name: string
  @Exclude({ toPlainOnly: true })
  password: string
  phoneNumber: string
  website: string
  subdomain: string
  avatar: string
  userType: string
  department: string
  reportsTo: string

  clients: ClientModel[];
  groups: GroupModel[];
  permissions: PermissionModel[];

  static relationMappings = {
    // list of all client on current user
    clients: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'clients.userId',
      },
    },
    groups: {
      modelClass: `${__dirname}/group.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'groups.userId',
      },
    },
    permissions: {
      modelClass: `${__dirname}/permission.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'permissions.userId',
      },
    },
  };
}

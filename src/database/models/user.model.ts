import { BaseModel } from './base.model';
import { Model } from 'objection';
import { Exclude } from "class-transformer";
import { ClientModel } from './client.model';
import { RoleModel } from './role.model';
import { PermissionModel } from './permission.model';
import { UserRoleModel } from './userRole.model';
import { BrandModel } from './brand.model';

const tbName = 'users'
export class UserModel extends BaseModel {
  static tableName = tbName;
  username: string
  email: string
  @Exclude({ toPlainOnly: true })
  password: string
  name: string
  phoneNumber: string
  avatar: string
  userType: string
  department: string
  reportsTo: string
  activationToken: string
  activationTokenExpire: Date
  activatedAt: Date
  passwordResetToken: string
  passwordResetTokenExpire: Date
  lastResetAt: Date
  userId: string
  brandCode: string

  user: UserModel;
  users: UserModel[];
  brand: BrandModel;
  clients: ClientModel[];
  roles: RoleModel[];
  userRoles: UserRoleModel[];
  permissions: PermissionModel[];

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.userId`,
        to: `${tbName}.id`,
      },
    },
    users: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: `${tbName}.userId`,
      },
    },
    brand: {
      modelClass: `${__dirname}/brand.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.brandCode`,
        to: 'brands.brandCode',
      },
    },
    clients: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'clients.userId',
      },
    },
    roles: {
      modelClass: `${__dirname}/role.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tbName}.id`,
        through: {
          from: 'userRoles.userId',
          to: 'userRoles.roleId'
        },
        to: 'roles.id',
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
    permissions: {
      modelClass: `${__dirname}/permission.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'permissions.userId',
      },
    },
  };
}

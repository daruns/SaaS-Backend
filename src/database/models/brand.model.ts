import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import * as _ from "lodash";

const tableName = 'brands'
export class BrandModel extends BaseModel {
  static tableName = tableName;

  brandCode: string
  subdomain: string
  name: string
  logo: string
  companySize: number
  owner: string
  address: string
  announcedAt: Date
  branches: string
  occupation: string
  website: string
  phoneNumber: string
  email: string

  users: UserModel[];

  static relationMappings = {
    // list of all clientContacts on current user
    users: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.brandCode`,
        to: 'users.brandCode',
      },
    },
  };
}

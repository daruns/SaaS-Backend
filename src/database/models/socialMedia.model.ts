import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { UserModel } from './user.model';

export class SocialMediaModel extends BaseModel {
  static tableName = 'socialMedias';
  name: string
  linkAddress: string
  addressDomain: string
  clientId: number
  userId: number

  client: ClientModel;
  user: UserModel;

  static relationMappings = {
    // list of all client on current user
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'socialMedias.userId',
        to: 'users.id',
      },
    },
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'socialMedias.clientId',
        to: 'clients.id',
      },
    },
  };
}

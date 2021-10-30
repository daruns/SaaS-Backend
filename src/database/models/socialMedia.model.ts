import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';

export class SocialMediaModel extends BaseModel {
  static tableName = 'socialMedias';
  name: string
  linkAddress: string
  addressDomain: string
  clientId: number
  brandCode: string

  client: ClientModel;

  static relationMappings = {
    // list of all client on current user
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

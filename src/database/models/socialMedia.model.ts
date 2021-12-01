import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';

const tableName = 'socialMedias'
export class SocialMediaModel extends BaseModel {
  static tableName = tableName;
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
        from: `${tableName}.clientId`,
        to: 'clients.id',
      },
    },
  };
}

export default SocialMediaModel

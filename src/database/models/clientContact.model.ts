import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { UserModel } from './user.model';

export class ClientContactModel extends BaseModel {
  static tableName = 'clientContacts';

  name: string
  position: string
  businessPhoneNumber1: string
  businessPhoneNumber2: string
  email: string
  description: string
  department: string
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
        from: 'clientContacts.userId',
        to: 'users.id',
      },
    },
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'clientContacts.clientId',
        to: 'clients.id',
      },
    },
  };
}

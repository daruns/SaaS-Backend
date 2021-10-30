import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { ClientContactModel } from "./clientContact.model";
import { MeetingModel } from './meeting.model';
import { SocialMediaModel } from './socialMedia.model';

export class ClientModel extends BaseModel {
  static tableName = 'clients';

  name: string
  logo: string
  phoneNumbers: string
  clientType: string
  businessType: string
  email: string
  website: string
  address: string
  rate: number
  zipCode: string
  brandCode: string
  userId: number

  user: UserModel;
  clientContacts: ClientContactModel[];
  meetings: MeetingModel[];
  socialMedias: SocialMediaModel[];

  static relationMappings = {
    // list of all user on current user
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'clients.userId',
        to: 'users.id',
      },
    },
    // list of all clientContacts on current user
    clientContacts: {
      modelClass: `${__dirname}/clientContact.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'clients.id',
        to: 'clientContacts.clientId',
      },
    },
    // list of all clientContacts on current user
    meetings: {
      modelClass: `${__dirname}/meeting.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'clients.id',
        to: 'meetings.clientId',
      },
    },
    socialMedias: {
      modelClass: `${__dirname}/socialMedia.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'clients.id',
        to: 'socialMedias.clientId',
      },
    },
  };
}

import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { ClientContactModel } from "./clientContact.model";
import { MeetingModel } from './meeting.model';
import { SocialMediaModel } from './socialMedia.model';
import { InvoiceItemModel } from './invoiceItem.model';
import ProjectModel from './project.model';
import QuoteModel from './quote.model';

const tableName = 'clients'
export class ClientModel extends BaseModel {
  static tableName = tableName;

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
  invoices: InvoiceItemModel[];
  quotes: QuoteModel[];
  projects: ProjectModel[];

  static relationMappings = {
    // list of all user on current user
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.userId`,
        to: 'users.id',
      },
    },
    // list of all clientContacts on current user
    clientContacts: {
      modelClass: `${__dirname}/clientContact.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'clientContacts.clientId',
      },
    },
    // list of all clientContacts on current user
    meetings: {
      modelClass: `${__dirname}/meeting.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'meetings.clientId',
      },
    },
    socialMedias: {
      modelClass: `${__dirname}/socialMedia.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'socialMedias.clientId',
      },
    },
    invoices: {
      modelClass: `${__dirname}/invoice.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'invoices.clientId',
      },
    },
    quotes: {
      modelClass: `${__dirname}/quote.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'quotes.clientId',
      },
    },
    projects: {
      modelClass: `${__dirname}/project.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'projects.clientId',
      },
    },
  };
}

export default ClientModel

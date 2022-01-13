import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import MediaModel from './media.model';
import { SocialMediaStudioUserModel } from './socialMediaStudioUser.model';
import UserModel from './user.model';

const tableName = 'socialMediaStudios'
export class SocialMediaStudioModel extends BaseModel {
  static tableName = tableName;
  name: string
  brandCode: string
  clientId: number
  plannedStartDate: Date
  plannedEndDate: Date
  actualStartDate: Date
  actualdEndDate: Date
  schedule: Date
  stage: string
  priority: string
  clientApproval: boolean
  creatorId: number
  description: string

  client: ClientModel;
  users: UserModel[];
  medias: MediaModel[];
  socialMediaStudioUsers: SocialMediaStudioUserModel[];

  static relationMappings = {
    // list of all socialMediaStudio on current user
    medias: {
      modelClass: `${__dirname}/media.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'medias.id'
      }
    },
    // list of all client on current user
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.clientId`,
        to: 'clients.id',
      },
    },
    socialMediaStudioUsers: {
      modelClass: `${__dirname}/socialMediaStudioUser.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'socialMediaStudioUsers.socialMediaStudioId',
      }
    },
    users: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'socialMediaStudioUsers.socialMediaStudioId',
          to: 'socialMediaStudioUsers.userId'
        },
        to: 'users.id'
      }
    }
  };
}

export default SocialMediaStudioModel

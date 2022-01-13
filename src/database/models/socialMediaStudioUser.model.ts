import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { SocialMediaStudioModel } from './socialMediaStudio.model';
import { Model } from 'objection';

const tbName = 'socialMediaStudioUsers'
export class SocialMediaStudioUserModel extends BaseModel {
  static tableName = tbName;
  approved: boolean;
  canEdit: boolean;
  userId: number;
  socialMediaStudioId: number;

  user: UserModel;
  socialMediaStudio: SocialMediaStudioModel;

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.userId`,
        to: 'users.id',
      },
    },

    socialMediaStudio: {
      modelClass: `${__dirname}/socialMediaStudio.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.socialMediaStudioId`,
        to: 'socialMediaStudios.id',
      },
    },
  };
}

export default SocialMediaStudioUserModel

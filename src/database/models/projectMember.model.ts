import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
import { Model } from 'objection';

const tbName = 'projectMemberUsers'
export class ProjectMemberModel extends BaseModel {
  static tableName = tbName;

  memberId: number;
  projectId: number;

  user: UserModel;
  project: ProjectModel;

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.memberId`,
        to: 'users.id',
      },
    },

    project: {
      modelClass: `${__dirname}/project.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.projectId`,
        to: 'projects.id',
      },
    },
  };
}

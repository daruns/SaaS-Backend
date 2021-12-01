import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
import { Model } from 'objection';

const tbName = 'projectLeaderUsers'
export class ProjectLeaderModel extends BaseModel {
  static tableName = tbName;

  leaderId: number;
  projectId: number;

  user: UserModel;
  project: ProjectModel;

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.leaerId`,
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

export default ProjectLeaderModel

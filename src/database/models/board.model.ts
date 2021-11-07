import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ProjectModel } from './project.model';
import { BoardAttributeModel } from './boardAttribute.model';

const tableName = 'projectBoards'
export class BoardModel extends BaseModel {
  static tableName = tableName;

  name: string
  description: string
  brandCode: string
  projectId: number

  boardAttribute: BoardAttributeModel[];
  project: ProjectModel;

  static relationMappings = {
    // list of all client on current user
    boardAttribute: {
      modelClass: `${__dirname}/boardAttribute.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'boardAttributes.boardId',
      },
    },
    project: {
      modelClass: `${__dirname}/project.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.projectId`,
        to: 'projects.id',
      },
    },
  };
}

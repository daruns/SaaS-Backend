import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { TaskModel } from './task.model';
import { Model } from 'objection';

const tbName = 'taskMemberUsers'
export class TaskMemberModel extends BaseModel {
  static tableName = tbName;

  memberId: number;
  taskId: number;

  user: UserModel;
  task: TaskModel;

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.memberId`,
        to: 'users.id',
      },
    },

    task: {
      modelClass: `${__dirname}/task.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.taskId`,
        to: 'tasks.id',
      },
    },
  };
}

export default TaskMemberModel

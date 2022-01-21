import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { TaskModel } from './task.model';
export declare class TaskMemberModel extends BaseModel {
    static tableName: string;
    memberId: number;
    taskId: number;
    user: UserModel;
    task: TaskModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        task: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default TaskMemberModel;

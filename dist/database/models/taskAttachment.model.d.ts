import { BaseModel } from './base.model';
import { AttachmentModel } from './attachment.model';
import { TaskModel } from './task.model';
export declare class TaskAttachmentModel extends BaseModel {
    static tableName: string;
    attachmentId: number;
    taskId: number;
    task: TaskModel;
    attachment: AttachmentModel;
    static relationMappings: {
        task: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        attachment: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default TaskAttachmentModel;

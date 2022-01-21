import { BaseModel } from './base.model';
import { ProjectModel } from './project.model';
import { BoardModel } from './board.model';
export declare class TaskModel extends BaseModel {
    static tableName: string;
    name: string;
    brandCode: string;
    description: string;
    priority: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualdEndDate: Date;
    boardId: number;
    projectId: number;
    board: BoardModel;
    project: ProjectModel;
    static relationMappings: {
        board: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        project: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        members: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        memberUsers: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                through: {
                    from: string;
                    to: string;
                };
                to: string;
            };
        };
    };
}
export default TaskModel;

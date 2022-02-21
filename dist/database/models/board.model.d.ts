import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { BoardAttributeModel } from './boardAttribute.model';
import { TaskModel } from './task.model';
export declare class BoardModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    brandCode: string;
    userId: number;
    boardAttribute: BoardAttributeModel;
    user: UserModel;
    tasks: TaskModel[];
    static relationMappings: {
        tasks: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        boardAttribute: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default BoardModel;

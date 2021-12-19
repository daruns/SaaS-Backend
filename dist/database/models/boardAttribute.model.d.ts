import { BaseModel } from './base.model';
import { BoardModel } from './board.model';
import { UserModel } from './user.model';
export declare class BoardAttributeModel extends BaseModel {
    static tableName: string;
    color: string;
    position: number;
    brandCode: string;
    boardId: number;
    userId: number;
    board: BoardModel;
    user: UserModel;
    static relationMappings: {
        board: {
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
export default BoardAttributeModel;

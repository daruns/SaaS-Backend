import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import JoinedRoomModel from './joinedRoom.model';
import MessageModel from './message.model';
export declare class ConnectedUserModel extends BaseModel {
    static tableName: string;
    socketId: string;
    brandCode: string;
    userId: number;
    user: UserModel;
    joinedRooms: JoinedRoomModel[];
    messages: MessageModel[];
    static relationMappings: {
        joinedRooms: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        messages: {
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
export default ConnectedUserModel;

import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { RoomModel } from './room.model';
export declare class JoinedRoomModel extends BaseModel {
    static tableName: string;
    brandCode: string;
    name: string;
    socketId: string;
    userId: number;
    roomId: number;
    user: UserModel;
    room: RoomModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        room: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default JoinedRoomModel;

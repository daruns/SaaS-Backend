import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { JoinedRoomModel } from './joinedRoom.model';
import { MessageModel } from './message.model';
export declare class RoomModel extends BaseModel {
    static tableName: string;
    brandCode: string;
    name: string;
    description: string;
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
        users: {
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
export default RoomModel;

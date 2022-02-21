import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { RoomModel } from './room.model';
import AttachmentModel from './attachment.model';
export declare class MessageModel extends BaseModel {
    static tableName: string;
    brandCode: string;
    name: string;
    text: string;
    userId: number;
    roomId: number;
    user: UserModel;
    room: RoomModel;
    attachments: AttachmentModel[];
    static relationMappings: {
        attachments: {
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
export default MessageModel;

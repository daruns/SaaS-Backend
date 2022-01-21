import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
import { ProjectLeaderModel } from './projectLeader.model';
import { ProjectMemberModel } from './projectMember.model';
import { UserModel } from './user.model';
import { TaskModel } from './task.model';
import { ProjectAttachmentModel } from './projectAttachment.model';
import { AttachmentModel } from './attachment.model';
export declare class ProjectModel extends BaseModel {
    static tableName: string;
    name: string;
    brandCode: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualdEndDate: Date;
    rate: number;
    rateType: string;
    priority: string;
    description: string;
    clientId: number;
    client: ClientModel;
    leaders: ProjectLeaderModel[];
    members: ProjectMemberModel[];
    leaderUsers: UserModel[];
    memberUsers: UserModel[];
    tasks: TaskModel[];
    projectAttachments: ProjectAttachmentModel[];
    attachments: AttachmentModel[];
    static relationMappings: {
        client: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        leaders: {
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
        leaderUsers: {
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
        tasks: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        projectAttachments: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
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
    };
}
export default ProjectModel;

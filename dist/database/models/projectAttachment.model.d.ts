import { BaseModel } from './base.model';
import { AttachmentModel } from './attachment.model';
import { ProjectModel } from './project.model';
export declare class ProjectAttachmentModel extends BaseModel {
    static tableName: string;
    attachmentId: number;
    projectId: number;
    project: ProjectModel;
    attachment: AttachmentModel;
    static relationMappings: {
        project: {
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
export default ProjectAttachmentModel;

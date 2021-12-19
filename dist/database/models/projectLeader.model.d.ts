import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
export declare class ProjectLeaderModel extends BaseModel {
    static tableName: string;
    leaderId: number;
    projectId: number;
    user: UserModel;
    project: ProjectModel;
    static relationMappings: {
        user: {
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
    };
}
export default ProjectLeaderModel;

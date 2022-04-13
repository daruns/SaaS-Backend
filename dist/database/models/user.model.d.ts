import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
import { RoleModel } from './role.model';
import { PermissionModel } from './permission.model';
import { UserRoleModel } from './userRole.model';
import { BrandModel } from './brand.model';
import { ProjectLeaderModel } from './projectLeader.model';
import { ProjectMemberModel } from './projectMember.model';
import { ProjectModel } from './project.model';
import { BoardAttributeModel } from './boardAttribute.model';
import { TaskMemberModel } from './taskMember.model';
import { TaskModel } from './task.model';
import { BoardModel } from './board.model';
import EmployeeModel from './employee.model';
export declare class UserModel extends BaseModel {
    static tableName: string;
    username: string;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    avatar: string;
    userType: string;
    department: string;
    reportsTo: string;
    activationToken: string;
    activationTokenExpire: Date;
    activatedAt: Date;
    passwordResetToken: string;
    passwordResetTokenExpire: Date;
    lastResetAt: Date;
    userId: number;
    brandCode: string;
    user: UserModel;
    users: UserModel[];
    brand: BrandModel;
    clients: ClientModel[];
    roles: RoleModel[];
    userRoles: UserRoleModel[];
    permissions: PermissionModel[];
    projectLeaders: ProjectLeaderModel[];
    projectMembers: ProjectMemberModel[];
    projectsMemberUsers: ProjectModel[];
    projectsLeaderUsers: ProjectModel[];
    boardAttribute: BoardAttributeModel;
    taskMembers: TaskMemberModel[];
    tasksMemberUsers: TaskModel[];
    boards: BoardModel[];
    myEmployeeProfile: EmployeeModel;
    static relationMappings: {
        user: {
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
                to: string;
            };
        };
        brand: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        clients: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        roles: {
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
        userRoles: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        permissions: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        projectLeaders: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        projectMembers: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        projectsMemberUsers: {
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
        projectsLeaderUsers: {
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
        boardAttribute: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        boards: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        taskMembers: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        tasksMemberUsers: {
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
        myEmployeeProfile: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default UserModel;

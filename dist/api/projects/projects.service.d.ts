import { ProjectModel } from 'src/database/models/project.model';
import { ModelClass } from 'objection';
import { CreateProjectDto } from './dto/create-project.dto';
import { ClientsService } from '../clients/clients.service';
import { ProjectLeaderModel } from 'src/database/models/projectLeader.model';
import { ProjectMemberModel } from 'src/database/models/projectMember.model';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserModel } from 'src/database/models/user.model';
import { AddLeadersToProjectDto } from './dto/add-leadersToProject.dto';
import { AddMembersToProjectDto } from './dto/add-membersToProject.dto';
import { ProjectAttachmentModel } from 'src/database/models/projectAttachment.model';
import { AddFileDto, FileUploadService } from 'src/app/app.service';
import { AttachmentModel } from 'src/database/models/attachment.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ProjectsService {
    private modelClass;
    private leaderModelClass;
    private memberModelClass;
    private userModel;
    private projectAttachmentModel;
    private attachmentModel;
    private readonly clientsSerive;
    private readonly fileUploadService;
    constructor(modelClass: ModelClass<ProjectModel>, leaderModelClass: ModelClass<ProjectLeaderModel>, memberModelClass: ModelClass<ProjectMemberModel>, userModel: ModelClass<UserModel>, projectAttachmentModel: ModelClass<ProjectAttachmentModel>, attachmentModel: ModelClass<AttachmentModel>, clientsSerive: ClientsService, fileUploadService: FileUploadService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateProjectDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateProjectDto, currentUser: any): Promise<ResponseData>;
    addLeaders(payload: AddLeadersToProjectDto, currentUser: any): Promise<ResponseData>;
    addMembers(payload: AddMembersToProjectDto, currentUser: any): Promise<ResponseData>;
    removeLeaders(payload: AddLeadersToProjectDto, currentUser: any): Promise<ResponseData>;
    removeMembers(payload: AddMembersToProjectDto, currentUser: any): Promise<ResponseData>;
    removeFile(payload: {
        id: number;
        attachId: number;
    }, currentUser: any): Promise<ResponseData>;
    replaceFiles(payload: AddFileDto, currentUser: any): Promise<ResponseData>;
    addFile(payload: AddFileDto, currentUser: any): Promise<ResponseData>;
    deleteById(projectId: number, currentUser: any): Promise<ResponseData>;
}

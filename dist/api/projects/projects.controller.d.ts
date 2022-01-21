import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddLeadersToProjectDto } from './dto/add-leadersToProject.dto';
import { AddMembersToProjectDto } from './dto/add-membersToProject.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(req: any): Promise<import("./projects.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./projects.service").ResponseData>;
    create(project: CreateProjectDto, req: any): Promise<import("./projects.service").ResponseData>;
    addLeaders(payload: AddLeadersToProjectDto, req: any): Promise<import("./projects.service").ResponseData>;
    addMembers(payload: AddMembersToProjectDto, req: any): Promise<import("./projects.service").ResponseData>;
    removeLeaders(payload: AddLeadersToProjectDto, req: any): Promise<import("./projects.service").ResponseData>;
    removeMembers(payload: AddMembersToProjectDto, req: any): Promise<import("./projects.service").ResponseData>;
    addFile(id: number, files: any, req: any): Promise<import("./projects.service").ResponseData>;
    replaceFiles(id: number, files: any, req: any): Promise<import("./projects.service").ResponseData>;
    removeFile(body: {
        id: number;
        attachId: number;
    }, req: any): Promise<import("./projects.service").ResponseData>;
    update(payload: UpdateProjectDto, req: any): Promise<import("./projects.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./projects.service").ResponseData>;
}

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddLeadersToProjectDto } from './dto/add-leadersToProject.dto';
import { AddMembersToProjectDto } from './dto/add-membersToProject.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(req: any): Promise<any>;
    findOne(id: number, req: any): Promise<any>;
    create(project: CreateProjectDto, req: any): Promise<any>;
    addLeaders(payload: AddLeadersToProjectDto, req: any): Promise<any>;
    addMembers(payload: AddMembersToProjectDto, req: any): Promise<any>;
    removeLeaders(payload: AddLeadersToProjectDto, req: any): Promise<any>;
    removeMembers(payload: AddMembersToProjectDto, req: any): Promise<any>;
    addFile(id: number, files: any, req: any): Promise<any>;
    replaceFiles(id: number, files: any, req: any): Promise<any>;
    removeFile(body: {
        id: number;
        attachId: number;
    }, req: any): Promise<any>;
    update(payload: UpdateProjectDto, req: any): any;
    deleteById(payload: any, req: any): any;
}

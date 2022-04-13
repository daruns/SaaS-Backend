import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ChangeBoardDto, UpdateTaskDto } from './dto/update-task.dto';
import { AddMembersToTaskDto } from './dto/add-membersToTask.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(req: any): Promise<import("./tasks.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./tasks.service").ResponseData>;
    create(task: CreateTaskDto, req: any): Promise<import("./tasks.service").ResponseData>;
    addMembers(payload: AddMembersToTaskDto, req: any): Promise<import("./tasks.service").ResponseData>;
    removeMembers(payload: AddMembersToTaskDto, req: any): Promise<import("./tasks.service").ResponseData>;
    addFile(id: number, files: any, req: any): Promise<import("./tasks.service").ResponseData>;
    removeFile(body: {
        id: number;
        attachId: number;
    }, req: any): Promise<import("./tasks.service").ResponseData>;
    changeBoard(payload: ChangeBoardDto, req: any): Promise<import("./tasks.service").ResponseData>;
    update(payload: UpdateTaskDto, req: any): Promise<import("./tasks.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./tasks.service").ResponseData>;
}

import { TaskModel } from 'src/database/models/task.model';
import { ModelClass } from 'objection';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskMemberModel } from 'src/database/models/taskMember.model';
import { ChangeBoardDto, UpdateTaskDto } from './dto/update-task.dto';
import { UserModel } from 'src/database/models/user.model';
import { AddMembersToTaskDto } from './dto/add-membersToTask.dto';
import { BoardsService } from '../boards/boards.service';
import { BoardModel } from 'src/database/models/board.model';
import { AddFileDto, FileUploadService } from 'src/app/app.service';
import TaskAttachmentModel from 'src/database/models/taskAttachment.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class TasksService {
    private modelClass;
    private memberModelClass;
    private userModel;
    private boardModel;
    private taskAttachmentModel;
    private readonly boardsService;
    private readonly fileUploadService;
    constructor(modelClass: ModelClass<TaskModel>, memberModelClass: ModelClass<TaskMemberModel>, userModel: ModelClass<UserModel>, boardModel: ModelClass<BoardModel>, taskAttachmentModel: ModelClass<TaskAttachmentModel>, boardsService: BoardsService, fileUploadService: FileUploadService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateTaskDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateTaskDto, currentUser: any): Promise<ResponseData>;
    changeBoard(payload: ChangeBoardDto, currentUser: any): Promise<ResponseData>;
    removeFile(payload: {
        id: number;
        attachId: number;
    }, currentUser: any): Promise<ResponseData>;
    addFile(payload: AddFileDto, currentUser: any): Promise<ResponseData>;
    addMembers(payload: AddMembersToTaskDto, currentUser: any): Promise<ResponseData>;
    removeMembers(payload: AddMembersToTaskDto, currentUser: any): Promise<ResponseData>;
    deleteById(taskId: number, currentUser: any): Promise<ResponseData>;
}

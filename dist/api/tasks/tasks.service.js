"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const boards_service_1 = require("../boards/boards.service");
const app_service_1 = require("../../app/app.service");
let TasksService = class TasksService {
    constructor(modelClass, memberModelClass, userModel, boardModel, taskAttachmentModel, boardsService, fileUploadService) {
        this.modelClass = modelClass;
        this.memberModelClass = memberModelClass;
        this.userModel = userModel;
        this.boardModel = boardModel;
        this.taskAttachmentModel = taskAttachmentModel;
        this.boardsService = boardsService;
        this.fileUploadService = fileUploadService;
    }
    async findAll(currentUser) {
        const tasks = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({
            board: {
                boardAttribute: {}
            },
            project: {},
            attachments: {}
        })
            .withGraphFetched('memberUsers(selectNameAndId)')
            .modifiers({
            selectNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
                builder.select('taskMemberUsers.id as memberId');
            },
        });
        console.log(tasks);
        return {
            success: true,
            message: 'Task details fetch successfully.',
            data: tasks,
        };
    }
    async findById(id, currentUser) {
        const task = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({
            board: {
                boardAttribute: {}
            },
            project: {},
            attachments: {}
        })
            .withGraphFetched('memberUsers(selectNameAndId)')
            .modifiers({
            selectNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
                builder.select('taskMemberUsers.id as memberId');
            },
        });
        if (task) {
            return {
                success: true,
                message: 'Task details fetch successfully.',
                data: task,
            };
        }
        else {
            return {
                success: false,
                message: 'No task details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const taskPayload = payload;
        const taskFnd = await this.modelClass.query().findOne({ name: taskPayload.name, boardId: taskPayload.boardId, brandCode: currentUser.brandCode });
        if (taskFnd) {
            return {
                success: false,
                message: 'Task already exist with that name.',
                data: {},
            };
        }
        if (taskPayload.boardId) {
            const boardFnd = await this.boardsService.findById(taskPayload.boardId, currentUser);
            if (!boardFnd.success) {
                return {
                    success: false,
                    message: 'Task Error: Board doesnt exist.',
                    data: {},
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Task Error: boardId is required.',
                data: {},
            };
        }
        taskPayload['brandCode'] = currentUser.brandCode;
        taskPayload['createdBy'] = currentUser.username;
        const { members, ...taskParams } = taskPayload;
        console.log(members);
        console.log(taskParams);
        var result;
        const trx = await this.modelClass.startTransaction();
        try {
            const createdTask = await this.modelClass.query(trx).insert(taskParams);
            if (createdTask) {
                for (let member of members) {
                    const memberfnd = await this.userModel.query().findOne({ id: member, brandCode: currentUser.brandCode });
                    if (!memberfnd) {
                        return {
                            success: false,
                            message: 'Member Error: User ' + member + ' doesnt exist.',
                            data: {},
                        };
                    }
                    const membersParams = { memberId: member, taskId: createdTask.id };
                    let finishedInsert = await this.memberModelClass.query(trx).insert(membersParams);
                    if (!finishedInsert) {
                        throw finishedInsert;
                    }
                }
                result = await this.modelClass.query(trx).findById(createdTask.id).withGraphFetched({
                    members: {},
                });
                await trx.commit();
                return {
                    success: true,
                    message: 'Task created successfully.',
                    data: result,
                };
            }
        }
        catch (err) {
            trx.rollback();
            result = err;
            return {
                success: false,
                message: `Something went wrong. Task were not inserted.`,
                data: result,
            };
        }
    }
    async update(payload, currentUser) {
        const { members, ...taskPayload } = payload;
        const task = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(taskPayload.id);
        if (task) {
            if (taskPayload.boardId) {
                const boardFnd = await this.boardsService.findById(taskPayload.boardId, currentUser);
                console.log(boardFnd);
                if (!boardFnd.success) {
                    return {
                        success: false,
                        message: 'Task Error: Board doesnt exist.',
                        data: {},
                    };
                }
            }
            var result;
            const trx = await this.modelClass.startTransaction();
            try {
                const oldTaskMembers = this.memberModelClass.query(trx).where({ taskId: taskPayload.id });
                const deletedMembers = await oldTaskMembers.delete();
                console.log(await oldTaskMembers);
                if (deletedMembers || !(await oldTaskMembers)) {
                    for (let member of members) {
                        const memberfnd = await this.userModel.query().findOne({ id: member, brandCode: currentUser.brandCode });
                        if (!memberfnd) {
                            return {
                                success: false,
                                message: 'Member Error: User ' + member + ' doesnt exist.',
                                data: {},
                            };
                        }
                        const membersParams = { memberId: member, taskId: taskPayload.id };
                        let finishedInsert = await this.memberModelClass.query(trx).insert(membersParams);
                        if (!finishedInsert) {
                            throw finishedInsert;
                        }
                    }
                    await trx.commit();
                }
            }
            catch (err) {
                trx.rollback();
                result = err;
                return {
                    success: false,
                    message: `Something went wrong. Task were not inserted.`,
                    data: result,
                };
            }
            const updatedTask = await this.modelClass.query()
                .update({
                name: taskPayload.name ? taskPayload.name : task.name,
                description: taskPayload.description ? taskPayload.description : task.description,
                priority: taskPayload.priority ? taskPayload.priority : task.priority,
                plannedStartDate: taskPayload.plannedStartDate ? taskPayload.plannedStartDate : task.plannedStartDate,
                plannedEndDate: taskPayload.plannedEndDate ? taskPayload.plannedEndDate : task.plannedEndDate,
                actualStartDate: taskPayload.actualStartDate ? taskPayload.actualStartDate : task.actualStartDate,
                actualdEndDate: taskPayload.actualdEndDate ? taskPayload.actualdEndDate : task.actualdEndDate,
                boardId: taskPayload.boardId ? taskPayload.boardId : task.boardId,
                status: taskPayload.status ? taskPayload.status : task.status,
                deleted: taskPayload.deleted ? taskPayload.deleted : task.deleted,
                updatedBy: currentUser.username,
            })
                .where({ id: taskPayload.id });
            return {
                success: true,
                message: 'Task details updated successfully.',
                data: updatedTask,
            };
        }
        else {
            return {
                success: false,
                message: 'No task found.',
                data: {},
            };
        }
    }
    async changeBoard(payload, currentUser) {
        const task = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id);
        const boardFnd = await this.boardModel.query().findOne({ id: payload.boardId, brandCode: currentUser.brandCode });
        if (!boardFnd) {
            return {
                success: false,
                message: 'Task Error: Board doesnt exist.',
                data: {},
            };
        }
        if (task) {
            const updatedTask = await this.modelClass.query()
                .update({
                boardId: payload.boardId,
                updatedBy: currentUser.username,
            })
                .where({ id: payload.id });
            return {
                success: true,
                message: 'Task Board changed successfully.',
                data: updatedTask,
            };
        }
        else {
            return {
                success: false,
                message: 'No task found.',
                data: {},
            };
        }
    }
    async removeFile(payload, currentUser) {
        const task = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id)
            .withGraphFetched({ attachments: {} });
        if (!task) {
            return {
                success: false,
                message: "Task not found",
                data: {},
            };
        }
        const taskAttachment = await this.taskAttachmentModel.query()
            .findOne({ taskId: task.id, attachmentId: payload.attachId });
        if (!taskAttachment) {
            return {
                success: false,
                message: "attachment on this Task not found",
                data: {},
            };
        }
        await this.taskAttachmentModel.query()
            .delete()
            .where({ attachmentId: payload.attachId, taskId: payload.id });
        const deletedFileService = await this.fileUploadService.removeFile(payload.attachId, currentUser);
        if (!deletedFileService.success) {
            return deletedFileService;
        }
        return {
            success: true,
            message: 'Task Attachments removed successfully.',
            data: {},
        };
    }
    async addFile(payload, currentUser) {
        const { files, id } = payload;
        const task = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (!task) {
            return {
                success: false,
                message: "Task not found",
                data: {},
            };
        }
        const allFileIds = [];
        for (let file of files) {
            const prepFile = {
                originalname: file.originalname,
                buffer: file.buffer,
                mimetype: file.mimetype,
                size: file.size,
            };
            const uploadedFileService = await this.fileUploadService.addFile(prepFile, "tasks", currentUser);
            if (!uploadedFileService.success) {
                return {
                    success: false,
                    message: uploadedFileService.message,
                    data: uploadedFileService.data,
                };
            }
            allFileIds.push(uploadedFileService.data.id);
        }
        const trx = await this.modelClass.startTransaction();
        try {
            for (let attachId of allFileIds) {
                const insertedAttach = await this.taskAttachmentModel.query(trx)
                    .insert({
                    attachmentId: attachId,
                    taskId: task.id
                });
                if (!insertedAttach) {
                    throw {
                        message: "couldnt insert taskAttachment on task",
                        data: insertedAttach,
                    };
                }
            }
            await trx.commit();
            return {
                success: true,
                message: 'Task Attachments added successfully.',
                data: {},
            };
        }
        catch (err) {
            await trx.rollback();
            return {
                success: false,
                message: `Something went wrong. TaskAttachments were not inserted.`,
                data: err,
            };
        }
    }
    async addMembers(payload, currentUser) {
        const taskPayload = payload;
        console.log(payload);
        const task = await this.memberModelClass.query()
            .where({ taskId: taskPayload.id })
            .whereIn('memberId', taskPayload.members);
        if (!task.length) {
            const taskFnd = await this.modelClass.query().findById(taskPayload.id)
                .findOne({ brandCode: currentUser.brandCode });
            console.log(taskFnd);
            if (!taskFnd) {
                return {
                    success: false,
                    message: 'Task Add Members Error: task doesnt exist doesnt exist.',
                    data: {},
                };
            }
            for (let memberId of taskPayload.members) {
                const addMember = await this.memberModelClass.query()
                    .insert({ memberId: memberId, taskId: taskPayload.id });
                if (!addMember)
                    rxjs_1.throwError(addMember);
            }
            return {
                success: true,
                message: 'Member Added on the Task successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'Members are already exist on this task.',
                data: {},
            };
        }
    }
    async removeMembers(payload, currentUser) {
        const taskPayload = payload;
        console.log(payload);
        const task = await this.memberModelClass.query()
            .where({ taskId: taskPayload.id })
            .whereIn('memberId', taskPayload.members);
        if (task.length) {
            const taskFnd = await this.modelClass.query().findById(taskPayload.id)
                .findOne({ brandCode: currentUser.brandCode });
            console.log(taskFnd);
            if (!taskFnd) {
                return {
                    success: false,
                    message: 'Task Remove Members Error: task doesnt exist doesnt exist.',
                    data: {},
                };
            }
            const addMember = await this.memberModelClass.query()
                .delete()
                .where({ taskId: taskPayload.id })
                .whereIn('memberId', taskPayload.members);
            if (!addMember)
                rxjs_1.throwError(addMember);
            return {
                success: true,
                message: 'Members Deleted on the Task successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'Members doesnt exist on this Task.',
                data: {},
            };
        }
    }
    async deleteById(taskId, currentUser) {
        const tasks = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({ id: taskId })
            .delete();
        if (tasks) {
            return {
                success: true,
                message: 'Task deleted successfully.',
                data: tasks,
            };
        }
        else {
            return {
                success: false,
                message: 'No task found.',
                data: {},
            };
        }
    }
};
TasksService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('TaskModel')),
    __param(1, common_1.Inject('TaskMemberModel')),
    __param(2, common_1.Inject('UserModel')),
    __param(3, common_1.Inject('BoardModel')),
    __param(4, common_1.Inject('TaskAttachmentModel')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, boards_service_1.BoardsService,
        app_service_1.FileUploadService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map
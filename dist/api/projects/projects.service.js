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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const clients_service_1 = require("../clients/clients.service");
const app_service_1 = require("../../app/app.service");
let ProjectsService = class ProjectsService {
    constructor(modelClass, leaderModelClass, memberModelClass, userModel, projectAttachmentModel, attachmentModel, taskMemberModelClass, taskModelClass, clientsSerive, fileUploadService) {
        this.modelClass = modelClass;
        this.leaderModelClass = leaderModelClass;
        this.memberModelClass = memberModelClass;
        this.userModel = userModel;
        this.projectAttachmentModel = projectAttachmentModel;
        this.attachmentModel = attachmentModel;
        this.taskMemberModelClass = taskMemberModelClass;
        this.taskModelClass = taskModelClass;
        this.clientsSerive = clientsSerive;
        this.fileUploadService = fileUploadService;
    }
    async findAll(currentUser) {
        const assignedLeaders = await this.leaderModelClass.query().where({ leaderId: currentUser.id });
        const assignedMembers = await this.memberModelClass.query().where({ memberId: currentUser.id });
        const assignedTaskMembers = await this.taskMemberModelClass.query().where('memberId', currentUser.id);
        const assignedTasks = await this.taskModelClass.query().findByIds(assignedTaskMembers.map(e => e.taskId));
        const proIds = await this.modelClass.query().select('id')
            .orWhereIn('id', assignedLeaders.map(e => e.projectId))
            .orWhereIn('id', assignedMembers.map(e => e.projectId))
            .orWhereIn('id', assignedTasks.map(e => e.projectId))
            .orWhere('createdBy', currentUser.username);
        const projects = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .whereIn('id', proIds.map(e => e.id))
            .modifiers({
            selectMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectLeaderNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectTaskMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectAttachUrl(builder) {
                builder.select('attachments.id as attachId');
                builder.select('url');
            },
        })
            .withGraphFetched(`
        [
          client,
          memberUsers(selectMemberNameAndId),
          leaderUsers(selectLeaderNameAndId),
          tasks.[attachments(selectAttachUrl), memberUsers(selectTaskMemberNameAndId), board.[boardAttribute]],
          attachments(selectAttachUrl)
        ]
      `);
        return {
            success: true,
            message: 'Project details fetch successfully.',
            data: projects,
        };
    }
    async findAllClients(currentUser) {
        const ClientFnd = await this.clientsSerive.findAll(currentUser);
        return {
            success: true,
            message: "clients of projects successfully fetched!",
            data: ClientFnd
        };
    }
    async findAllUsers(currentUser) {
        const ClientFnd = await this.userModel.query().select('id').select('name').select('avatar').where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: "clients of projects successfully fetched!",
            data: ClientFnd
        };
    }
    async findById(id, currentUser) {
        const assignedLeaders = await this.leaderModelClass.query().where({ leaderId: currentUser.id, projectId: id });
        const assignedMembers = await this.memberModelClass.query().where({ memberId: currentUser.id, projectId: id });
        const assignedTasks = await this.taskModelClass.query().where({ projectId: id });
        const assignedTaskMembers = await this.taskMemberModelClass.query().where('memberId', currentUser.id).whereIn('taskId', assignedTasks.map(e => e.id));
        const proIds = await this.modelClass.query().select('id')
            .orWhereIn('id', assignedLeaders.map(e => e.projectId))
            .orWhereIn('id', assignedMembers.map(e => e.projectId))
            .orWhereIn('id', assignedTasks.map(e => e.projectId))
            .orWhere('createdBy', currentUser.username)
            .findById(id);
        let fillTaskIds = [];
        if (assignedTaskMembers.length > 0) {
            fillTaskIds = await this.taskModelClass.query().where({ projectId: id }).findByIds(assignedTaskMembers.map(e => e.taskId));
        }
        let passNext = false;
        if (assignedLeaders.length > 0 || assignedMembers.length > 0 || fillTaskIds.length > 0 || (proIds === null || proIds === void 0 ? void 0 : proIds.id) === id) {
            passNext = true;
        }
        const project = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .modifiers({
            selectMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectLeaderNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectTaskMemberNameAndId(builder) {
                builder.select('name');
                builder.select('avatar');
                builder.select('users.id as userId');
            },
            selectAttachUrl(builder) {
                builder.select('attachments.id as attachId');
                builder.select('url');
                builder.select('contentType');
            },
        })
            .withGraphFetched(`
          [
            client,
            memberUsers(selectMemberNameAndId),
            leaderUsers(selectLeaderNameAndId),
            tasks.[attachments(selectAttachUrl), memberUsers(selectTaskMemberNameAndId), board.[boardAttribute]],
            attachments(selectAttachUrl)
          ]
        `);
        if (project && passNext) {
            return {
                success: true,
                message: 'Project details fetch successfully.',
                data: project,
            };
        }
        else {
            return {
                success: false,
                message: 'No project details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const projectPayload = payload;
        const projectFnd = await this.modelClass.query().findOne({ name: projectPayload.name, brandCode: currentUser.brandCode });
        if (projectFnd) {
            return {
                success: false,
                message: 'Project Already exist.',
                data: {},
            };
        }
        if (projectPayload.clientId) {
            const clientFnd = await this.clientsSerive.findById(projectPayload.clientId, currentUser);
            if (!clientFnd.success) {
                return {
                    success: false,
                    message: 'Project Error: Client doesnt exist.',
                    data: {},
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Project Error: clieantId is required.',
                data: {},
            };
        }
        projectPayload['brandCode'] = currentUser.brandCode;
        projectPayload['createdBy'] = currentUser.username;
        const { leaders, members, ...projectParams } = projectPayload;
        var result;
        const trx = await this.modelClass.startTransaction();
        try {
            const createdProject = await this.modelClass.query(trx).insert(projectParams);
            if (createdProject) {
                for (let member of members) {
                    const memberfnd = await this.userModel.query().findOne({ id: member, brandCode: currentUser.brandCode });
                    if (!memberfnd) {
                        return {
                            success: false,
                            message: 'Member Error: User ' + member + ' doesnt exist.',
                            data: {},
                        };
                    }
                    const membersParams = { memberId: member, projectId: createdProject.id, createdBy: currentUser.username };
                    let finishedInsert = await this.memberModelClass.query(trx).insert(membersParams);
                    if (!finishedInsert) {
                        throw finishedInsert;
                    }
                }
                for (let leader of leaders) {
                    const leaderfnd = await this.userModel.query().findOne({ id: leader, brandCode: currentUser.brandCode });
                    if (!leaderfnd) {
                        return {
                            success: false,
                            message: 'Leader Error: User ' + leader + ' doesnt exist.',
                            data: {},
                        };
                    }
                    const leadersParams = { leaderId: leader, projectId: createdProject.id, createdBy: currentUser.username };
                    let finishedInsert = await this.leaderModelClass.query(trx).insert(leadersParams);
                    if (!finishedInsert) {
                        throw finishedInsert;
                    }
                }
                result = await this.modelClass.query(trx).findById(createdProject.id);
                await trx.commit();
                return {
                    success: true,
                    message: 'Project created successfully.',
                    data: result,
                };
            }
        }
        catch (err) {
            trx.rollback();
            result = err;
            return {
                success: false,
                message: `Something went wrong. Project were not inserted.`,
                data: result,
            };
        }
    }
    async update(payload, currentUser) {
        const { members, leaders, ...projectPayload } = payload;
        const project = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(projectPayload.id);
        if (project) {
            if (projectPayload.clientId) {
                const clientFnd = await this.clientsSerive.findById(projectPayload.clientId, currentUser);
                console.log(clientFnd);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'Project Error: Client doesnt exist.',
                        data: {},
                    };
                }
            }
            var result;
            const trx = await this.modelClass.startTransaction();
            try {
                const oldProjectLeaders = this.leaderModelClass.query(trx).where({ projectId: projectPayload.id });
                const oldProjectMembers = this.memberModelClass.query(trx).where({ projectId: projectPayload.id });
                const deletedLeaders = await oldProjectLeaders.delete();
                const deletedMembers = await oldProjectMembers.delete();
                if ((deletedLeaders || !(await oldProjectLeaders))) {
                    for (let leader of leaders) {
                        const leaderfnd = await this.userModel.query().findOne({ id: leader, brandCode: currentUser.brandCode });
                        if (!leaderfnd) {
                            return {
                                success: false,
                                message: 'Member Error: User ' + leader + ' doesnt exist.',
                                data: {},
                            };
                        }
                        const leadersParams = { leaderId: leader, projectId: projectPayload.id };
                        let finishedInsert = await this.leaderModelClass.query(trx).insert(leadersParams);
                        if (!finishedInsert) {
                            throw finishedInsert;
                        }
                    }
                }
                if ((deletedMembers || !(await oldProjectMembers))) {
                    for (let member of members) {
                        const memberfnd = await this.userModel.query().findOne({ id: member, brandCode: currentUser.brandCode });
                        if (!memberfnd) {
                            return {
                                success: false,
                                message: 'Member Error: User ' + member + ' doesnt exist.',
                                data: {},
                            };
                        }
                        const membersParams = { memberId: member, projectId: projectPayload.id };
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
            const updatedProject = await this.modelClass.query()
                .update({
                name: projectPayload.name ? projectPayload.name : project.name,
                actualStartDate: projectPayload.actualStartDate ? projectPayload.actualStartDate : project.actualStartDate,
                actualdEndDate: projectPayload.actualdEndDate ? projectPayload.actualdEndDate : project.actualdEndDate,
                plannedEndDate: projectPayload.plannedEndDate ? projectPayload.plannedEndDate : project.plannedEndDate,
                plannedStartDate: projectPayload.plannedStartDate ? projectPayload.plannedStartDate : project.plannedStartDate,
                rate: projectPayload.rate ? projectPayload.rate : project.rate,
                rateType: projectPayload.rateType ? projectPayload.rateType : project.rateType,
                priority: projectPayload.priority ? projectPayload.priority : project.priority,
                description: projectPayload.description ? projectPayload.description : project.description,
                status: projectPayload.status ? projectPayload.status : project.status,
                deleted: projectPayload.deleted ? projectPayload.deleted : project.deleted,
                clientId: projectPayload.clientId ? projectPayload.clientId : project.clientId,
                updatedBy: currentUser.username,
            })
                .where({ id: projectPayload.id });
            return {
                success: true,
                message: 'Project details updated successfully.',
                data: updatedProject,
            };
        }
        else {
            return {
                success: false,
                message: 'No project found.',
                data: {},
            };
        }
    }
    async addLeaders(payload, currentUser) {
        const projectPayload = payload;
        console.log(payload);
        const project = await this.leaderModelClass.query()
            .where({ projectId: projectPayload.id })
            .whereIn('leaderId', projectPayload.leaders);
        if (!project.length) {
            const projectFnd = await this.modelClass.query().findById(projectPayload.id)
                .findOne({ brandCode: currentUser.brandCode });
            console.log(projectFnd);
            if (!projectFnd) {
                return {
                    success: false,
                    message: 'Project Add Leaders Error: project doesnt exist doesnt exist.',
                    data: {},
                };
            }
            for (let leaderId of projectPayload.leaders) {
                const addLeader = await this.leaderModelClass.query()
                    .insert({ "leaderId": leaderId, projectId: projectPayload.id });
                if (!addLeader)
                    rxjs_1.throwError(addLeader);
            }
            return {
                success: true,
                message: 'Leader Added on the Project successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'Leaders are already exist on this project.',
                data: {},
            };
        }
    }
    async addMembers(payload, currentUser) {
        const projectPayload = payload;
        console.log(payload);
        const project = await this.memberModelClass.query()
            .where({ projectId: projectPayload.id })
            .whereIn('memberId', projectPayload.members);
        if (!project.length) {
            const projectFnd = await this.modelClass.query().findById(projectPayload.id)
                .findOne({ brandCode: currentUser.brandCode });
            console.log(projectFnd);
            if (!projectFnd) {
                return {
                    success: false,
                    message: 'Project Add Members Error: project doesnt exist doesnt exist.',
                    data: {},
                };
            }
            for (let memberId of projectPayload.members) {
                const addMember = await this.memberModelClass.query()
                    .insert({ "memberId": memberId, projectId: projectPayload.id });
                if (!addMember)
                    rxjs_1.throwError(addMember);
            }
            return {
                success: true,
                message: 'Member Added on the Project successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'Members are already exist on this project.',
                data: {},
            };
        }
    }
    async removeLeaders(payload, currentUser) {
        const projectPayload = payload;
        console.log(payload);
        const project = await this.leaderModelClass.query()
            .where({ projectId: projectPayload.id })
            .whereIn('leaderId', projectPayload.leaders);
        if (project.length) {
            const projectFnd = await this.modelClass.query().findById(projectPayload.id)
                .findOne({ brandCode: currentUser.brandCode });
            console.log(projectFnd);
            if (!projectFnd) {
                return {
                    success: false,
                    message: 'Project Remove Leaders Error: project doesnt exist doesnt exist.',
                    data: {},
                };
            }
            const addLeader = await this.leaderModelClass.query()
                .delete()
                .where({ projectId: projectPayload.id })
                .whereIn('leaderId', projectPayload.leaders);
            if (!addLeader)
                rxjs_1.throwError(addLeader);
            return {
                success: true,
                message: 'Leaders Deleted on the Project successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'Leaders doesnt exist on this project.',
                data: {},
            };
        }
    }
    async removeMembers(payload, currentUser) {
        const projectPayload = payload;
        console.log(payload);
        const project = await this.memberModelClass.query()
            .where({ projectId: projectPayload.id })
            .whereIn('memberId', projectPayload.members);
        if (project.length) {
            const projectFnd = await this.modelClass.query().findById(projectPayload.id)
                .findOne({ brandCode: currentUser.brandCode });
            console.log(projectFnd);
            if (!projectFnd) {
                return {
                    success: false,
                    message: 'Project Remove Members Error: project doesnt exist doesnt exist.',
                    data: {},
                };
            }
            const addMember = await this.memberModelClass.query()
                .delete()
                .where({ projectId: projectPayload.id })
                .whereIn('memberId', projectPayload.members);
            if (!addMember)
                rxjs_1.throwError(addMember);
            return {
                success: true,
                message: 'Members Deleted on the Project successfully.',
                data: {},
            };
        }
        else {
            return {
                success: false,
                message: 'Members doesnt exist on this project.',
                data: {},
            };
        }
    }
    async removeFile(payload, currentUser) {
        const project = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id)
            .withGraphFetched({ attachments: {} });
        if (!project) {
            return {
                success: false,
                message: "Project not found",
                data: {},
            };
        }
        const projectAttachment = await this.projectAttachmentModel.query()
            .findOne({ projectId: project.id, attachmentId: payload.attachId });
        if (!projectAttachment) {
            return {
                success: false,
                message: "attachment on this Project not found",
                data: {},
            };
        }
        await this.projectAttachmentModel.query()
            .delete()
            .where({ attachmentId: payload.attachId, projectId: payload.id });
        const deletedFileService = await this.fileUploadService.removeFile(payload.attachId, currentUser);
        if (!deletedFileService.success) {
            return deletedFileService;
        }
        return {
            success: true,
            message: 'Project Attachments removed successfully.',
            data: {},
        };
    }
    async replaceFiles(payload, currentUser) {
        var _a;
        const { files, id } = payload;
        const project = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({ attachments: {} });
        if (!project) {
            return {
                success: false,
                message: "Project not found",
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
            const uploadedFileService = await this.fileUploadService.addFile(prepFile, "projects", currentUser);
            if (!uploadedFileService.success) {
                return {
                    success: false,
                    message: uploadedFileService.message,
                    data: uploadedFileService.data,
                };
            }
            allFileIds.push(uploadedFileService.data.id);
        }
        for (let attId of project.attachments) {
            this.fileUploadService.removeFile(attId.id, currentUser);
        }
        const trx = await this.modelClass.startTransaction();
        try {
            this.projectAttachmentModel.query(trx)
                .delete()
                .where({ projectId: id });
            this.attachmentModel.query(trx)
                .delete()
                .findByIds((_a = project.attachments) === null || _a === void 0 ? void 0 : _a.map(e => e.id));
            for (let attachId of allFileIds) {
                const insertedAttach = await this.projectAttachmentModel.query(trx)
                    .insert({
                    attachmentId: attachId,
                    projectId: project.id
                });
                if (!insertedAttach) {
                    throw {
                        message: "couldnt insert projectAttachment on project",
                        reason: insertedAttach,
                    };
                }
            }
            await trx.commit();
            return {
                success: true,
                message: 'Project Attachments replaced successfully.',
                data: {},
            };
        }
        catch (err) {
            await trx.rollback();
            return {
                success: false,
                message: `Something went wrong. ProjectAttachments were not replaced.`,
                data: err,
            };
        }
    }
    async addFile(payload, currentUser) {
        const { files, id } = payload;
        const project = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (!project) {
            return {
                success: false,
                message: "Project not found",
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
            const uploadedFileService = await this.fileUploadService.addFile(prepFile, "projects", currentUser);
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
                const insertedAttach = await this.projectAttachmentModel.query(trx)
                    .insert({
                    attachmentId: attachId,
                    projectId: project.id
                });
                if (!insertedAttach) {
                    throw {
                        message: "couldnt insert projectAttachment on project",
                        data: insertedAttach,
                    };
                }
            }
            await trx.commit();
            return {
                success: true,
                message: 'Project Attachments added successfully.',
                data: {},
            };
        }
        catch (err) {
            await trx.rollback();
            return {
                success: false,
                message: `Something went wrong. ProjectAttachments were not inserted.`,
                data: err,
            };
        }
    }
    async deleteById(projectId, currentUser) {
        const projects = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .where({ id: projectId })
            .delete();
        if (projects) {
            return {
                success: true,
                message: 'Project deleted successfully.',
                data: projects,
            };
        }
        else {
            return {
                success: false,
                message: 'No project found.',
                data: {},
            };
        }
    }
};
ProjectsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ProjectModel')),
    __param(1, common_1.Inject('ProjectLeaderModel')),
    __param(2, common_1.Inject('ProjectMemberModel')),
    __param(3, common_1.Inject('UserModel')),
    __param(4, common_1.Inject('ProjectAttachmentModel')),
    __param(5, common_1.Inject('AttachmentModel')),
    __param(6, common_1.Inject('TaskMemberModel')),
    __param(7, common_1.Inject('TaskModel')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, clients_service_1.ClientsService,
        app_service_1.FileUploadService])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map
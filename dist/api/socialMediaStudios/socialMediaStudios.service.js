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
exports.SocialMediaStudiosService = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../clients/clients.service");
const _ = require("lodash");
const app_service_1 = require("../../app/app.service");
const moment = require("moment");
let SocialMediaStudiosService = class SocialMediaStudiosService {
    constructor(modelClass, socialMediaStudioUserModel, mediaModel, mediaAttachmentModel, userModel, clientSerive, fileUploadService) {
        this.modelClass = modelClass;
        this.socialMediaStudioUserModel = socialMediaStudioUserModel;
        this.mediaModel = mediaModel;
        this.mediaAttachmentModel = mediaAttachmentModel;
        this.userModel = userModel;
        this.clientSerive = clientSerive;
        this.fileUploadService = fileUploadService;
    }
    async findAll(currentUser) {
        const creatorFnd = await this.modelClass
            .query()
            .select('id')
            .where('brandCode', currentUser.brandCode)
            .where('creator_id', currentUser.id);
        const memberFnd = await this.socialMediaStudioUserModel
            .query()
            .select('socialMediaStudios.id')
            .join('social_media_studios', 'social_media_studio_users.social_media_studio_id', '=', 'social_media_studios.id')
            .whereIn('social_media_studios.stage', ['production', 'review', 'completed'])
            .where('social_media_studios.brand_code', currentUser.brandCode)
            .where('social_media_studio_users.user_id', currentUser.id)
            .whereNot('social_media_studios.creator_id', currentUser.id);
        if (creatorFnd.length || memberFnd.length) {
            let finalIds = creatorFnd.map(e => e.id);
            finalIds = _.uniq(finalIds);
            console.log("final ids: ", finalIds);
            const socialMediaStudio = await this.modelClass
                .query()
                .select('social_media_studios.id')
                .select('social_media_studios.name')
                .select('social_media_studios.client_id')
                .select('social_media_studios.planned_start_date')
                .select('social_media_studios.planned_end_date')
                .select('social_media_studios.actual_start_date')
                .select('social_media_studios.actuald_end_date')
                .select('social_media_studios.stage')
                .select('social_media_studios.priority')
                .select('social_media_studios.clientApproval')
                .select('social_media_studios.creator_id')
                .select('social_media_studios.description')
                .findByIds(finalIds)
                .where('brandCode', currentUser.brandCode)
                .modifiers({
                selectClientParams(builder) {
                    builder.select('clients.id');
                    builder.select('clients.name');
                    builder.select('clients.logo');
                    builder.select('clients.phoneNumbers');
                    builder.select('clients.clientType');
                    builder.select('clients.businessType');
                    builder.select('clients.email');
                },
                selectMediaParams(builder) {
                    builder.select('medias.id');
                    builder.select('medias.name');
                    builder.select('medias.priority');
                    builder.select('medias.title');
                    builder.select('medias.caption');
                    builder.select('medias.textOnDesign');
                    builder.select('medias.designSize');
                    builder.select('medias.type');
                    builder.select('medias.plannedStartDate');
                    builder.select('medias.plannedEndDate');
                    builder.select('medias.actualStartDate');
                    builder.select('medias.actualdEndDate');
                },
                selectAttachmentParams(builder) {
                    builder.select('attachments.url');
                    builder.select('attachments.size');
                    builder.select('attachments.contentType');
                },
                selectSocialMediaUsersParams(builder) {
                    builder.select('socialMediaStudioUsers.id');
                    builder.select('socialMediaStudioUsers.approved');
                    builder.select('socialMediaStudioUsers.canEdit');
                },
                selectUsersParams(builder) {
                    builder.select('users.id');
                    builder.select('users.name');
                    builder.select('users.username');
                    builder.select('users.email');
                    builder.select('users.avatar');
                    builder.select('users.userType');
                },
            })
                .withGraphFetched(`
          [
            client(selectClientParams),
            medias(selectMediaParams).[attachments(selectAttachmentParams)],
            creator(selectUsersParams),
            socialMediaStudioUsers(selectSocialMediaUsersParams).[user(selectUsersParams)],
          ]
        `);
            if (socialMediaStudio) {
                return {
                    success: true,
                    message: 'SocialMediaStudio details fetch successfully.',
                    data: socialMediaStudio,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'No socialMediaStudios details found.',
                data: [],
            };
        }
    }
    async findById(id, currentUser) {
        const creatorFnd = await this.modelClass
            .query()
            .select('id')
            .whereIn('stage', ['draft', 'production', 'review', 'completed'])
            .where('brandCode', currentUser.brandCode)
            .findOne('creator_id', currentUser.id)
            .findById(id);
        const memberFnd = await this.socialMediaStudioUserModel
            .query()
            .select('socialMediaStudios.id')
            .join('social_media_studios', 'social_media_studio_users.social_media_studio_id', '=', 'social_media_studios.id')
            .whereIn('social_media_studios.stage', ['production', 'review', 'completed'])
            .where('social_media_studios.brand_code', currentUser.brandCode)
            .where('social_media_studio_users.user_id', currentUser.id)
            .findOne('social_media_studios.id', id);
        if (creatorFnd || memberFnd) {
            const socialMediaStudio = await this.modelClass
                .query()
                .select('social_media_studios.id')
                .select('social_media_studios.name')
                .select('social_media_studios.client_id')
                .select('social_media_studios.planned_start_date')
                .select('social_media_studios.planned_end_date')
                .select('social_media_studios.actual_start_date')
                .select('social_media_studios.actuald_end_date')
                .select('social_media_studios.stage')
                .select('social_media_studios.priority')
                .select('social_media_studios.clientApproval')
                .select('social_media_studios.creator_id')
                .select('social_media_studios.description')
                .findById(id)
                .modifiers({
                selectClientParams(builder) {
                    builder.select('clients.id');
                    builder.select('clients.name');
                    builder.select('clients.logo');
                    builder.select('clients.phoneNumbers');
                    builder.select('clients.clientType');
                    builder.select('clients.businessType');
                    builder.select('clients.email');
                },
                selectMediaParams(builder) {
                    builder.select('medias.id');
                    builder.select('medias.name');
                    builder.select('medias.priority');
                    builder.select('medias.title');
                    builder.select('medias.caption');
                    builder.select('medias.textOnDesign');
                    builder.select('medias.designSize');
                    builder.select('medias.type');
                    builder.select('medias.plannedStartDate');
                    builder.select('medias.plannedEndDate');
                    builder.select('medias.actualStartDate');
                    builder.select('medias.actualdEndDate');
                },
                selectAttachmentParams(builder) {
                    builder.select('attachments.url');
                    builder.select('attachments.size');
                    builder.select('attachments.contentType');
                },
                selectSocialMediaUsersParams(builder) {
                    builder.select('socialMediaStudioUsers.id');
                    builder.select('socialMediaStudioUsers.approved');
                    builder.select('socialMediaStudioUsers.canEdit');
                },
                selectUsersParams(builder) {
                    builder.select('users.id');
                    builder.select('users.name');
                    builder.select('users.username');
                    builder.select('users.email');
                    builder.select('users.avatar');
                    builder.select('users.userType');
                },
            })
                .withGraphFetched(`
            [
              client(selectClientParams),
              medias(selectMediaParams).[attachments(selectAttachmentParams)],
              creator(selectUsersParams),
              socialMediaStudioUsers(selectSocialMediaUsersParams).[user(selectUsersParams)],
            ]
          `);
            if (socialMediaStudio) {
                return {
                    success: true,
                    message: 'SocialMediaStudio details fetch successfully.',
                    data: socialMediaStudio,
                };
            }
        }
        return {
            success: false,
            message: 'No socialMediaStudio details found.',
            data: {},
        };
    }
    async findByStage(stage, currentUser) {
        const creatorFnd = await this.modelClass
            .query()
            .select('id')
            .where('stage', stage)
            .where('brandCode', currentUser.brandCode)
            .where('creator_id', currentUser.id);
        const memberFnd = await this.socialMediaStudioUserModel
            .query()
            .select('socialMediaStudios.id')
            .join('social_media_studios', 'social_media_studio_users.social_media_studio_id', '=', 'social_media_studios.id')
            .whereIn('social_media_studios.stage', ['production', 'review', 'completed'])
            .where('social_media_studios.brand_code', currentUser.brandCode)
            .where('social_media_studio_users.user_id', currentUser.id)
            .where('social_media_studios.stage', stage);
        if (creatorFnd.length || memberFnd.length) {
            let finalIds = creatorFnd.map(e => e.id);
            if (stage !== 'draft') {
                finalIds.concat(memberFnd.map(e => e.id));
            }
            finalIds = _.uniq(finalIds);
            const socialMediaStudio = await this.modelClass
                .query()
                .select('social_media_studios.id')
                .select('social_media_studios.name')
                .select('social_media_studios.client_id')
                .select('social_media_studios.planned_start_date')
                .select('social_media_studios.planned_end_date')
                .select('social_media_studios.actual_start_date')
                .select('social_media_studios.actuald_end_date')
                .select('social_media_studios.stage')
                .select('social_media_studios.priority')
                .select('social_media_studios.clientApproval')
                .select('social_media_studios.creator_id')
                .select('social_media_studios.description')
                .where('stage', stage)
                .whereIn('social_media_studios.id', finalIds)
                .where('brandCode', currentUser.brandCode)
                .modifiers({
                selectClientParams(builder) {
                    builder.select('clients.id');
                    builder.select('clients.name');
                    builder.select('clients.logo');
                    builder.select('clients.phoneNumbers');
                    builder.select('clients.clientType');
                    builder.select('clients.businessType');
                    builder.select('clients.email');
                },
                selectMediaParams(builder) {
                    builder.select('medias.id');
                    builder.select('medias.name');
                    builder.select('medias.priority');
                    builder.select('medias.title');
                    builder.select('medias.caption');
                    builder.select('medias.textOnDesign');
                    builder.select('medias.designSize');
                    builder.select('medias.type');
                    builder.select('medias.plannedStartDate');
                    builder.select('medias.plannedEndDate');
                    builder.select('medias.actualStartDate');
                    builder.select('medias.actualdEndDate');
                },
                selectAttachmentParams(builder) {
                    builder.select('attachments.url');
                    builder.select('attachments.size');
                    builder.select('attachments.contentType');
                },
                selectSocialMediaUsersParams(builder) {
                    builder.select('socialMediaStudioUsers.id');
                    builder.select('socialMediaStudioUsers.approved');
                    builder.select('socialMediaStudioUsers.canEdit');
                },
                selectUsersParams(builder) {
                    builder.select('users.id');
                    builder.select('users.name');
                    builder.select('users.username');
                    builder.select('users.email');
                    builder.select('users.avatar');
                    builder.select('users.userType');
                },
            })
                .withGraphFetched(`
          [
            client(selectClientParams),
            medias(selectMediaParams).[attachments(selectAttachmentParams)],
            creator(selectUsersParams),
            socialMediaStudioUsers(selectSocialMediaUsersParams).[user(selectUsersParams)],
          ]
        `);
            if (socialMediaStudio) {
                return {
                    success: true,
                    message: 'SocialMediaStudio details fetch successfully.',
                    data: socialMediaStudio,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'No socialMediaStudio details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const socialMediaStudioPayload = payload;
        if (currentUser.userType === "client") {
            return {
                success: false,
                message: 'Not Authorized.',
                data: {},
            };
        }
        if (socialMediaStudioPayload.clientId) {
            const clientFnd = await this.clientSerive.findById(socialMediaStudioPayload.clientId, currentUser);
            if (!clientFnd.success) {
                return {
                    success: false,
                    message: 'SocialMediaStudio Error: Client doesnt exist.',
                    data: {},
                };
            }
        }
        socialMediaStudioPayload['creatorId'] = currentUser.id;
        socialMediaStudioPayload['brandCode'] = currentUser.brandCode;
        socialMediaStudioPayload['createdBy'] = currentUser.username;
        socialMediaStudioPayload['status'] = 'pending';
        const { users, mineApproved, ...socialMediaStudioParams } = socialMediaStudioPayload;
        var result;
        let insertedId;
        const trx = await this.modelClass.startTransaction();
        try {
            const createdSocialMediaStudio = await this.modelClass.query(trx).insert(socialMediaStudioParams);
            if (createdSocialMediaStudio) {
                let usersUnify;
                if (users.length !== 0) {
                    usersUnify = users;
                    usersUnify = _.uniqBy(usersUnify, 'userId');
                    usersUnify = usersUnify.filter(tr => { return tr.userId !== currentUser.id; });
                    let userIds = usersUnify.map(e => e.userId);
                    const userfnd = await this.userModel.query(trx)
                        .select('id')
                        .whereIn('id', userIds)
                        .whereNot({ userType: 'partner' })
                        .where({ brandCode: currentUser.brandCode });
                    if (!userfnd.length || userfnd.length !== userIds.length) {
                        throw 'User Error: A user doesnt exist.';
                    }
                }
                usersUnify.push({ userId: currentUser.id, canEdit: true, approved: mineApproved });
                for (let item of usersUnify) {
                    let smsUser = item;
                    const usersParams = {
                        userId: smsUser.userId,
                        socialMediaStudioId: createdSocialMediaStudio.id,
                        canEdit: smsUser.canEdit === true ? true : false,
                        approved: smsUser.approved === true ? true : false,
                        brandCode: currentUser.brandCode,
                        createdBy: currentUser.username
                    };
                    let finishedInsert = await this.socialMediaStudioUserModel.query(trx).insert(usersParams);
                    if (!finishedInsert) {
                        throw finishedInsert;
                    }
                }
                await trx.commit();
                insertedId = createdSocialMediaStudio.id;
            }
        }
        catch (err) {
            trx.rollback();
            result = err;
            return {
                success: false,
                message: `Something went wrong. SocialMediaStudio were not inserted.`,
                data: result,
            };
        }
        result = await this.modelClass
            .query()
            .select('id')
            .select('social_media_studios.name')
            .select('social_media_studios.client_id')
            .select('social_media_studios.planned_start_date')
            .select('social_media_studios.planned_end_date')
            .select('social_media_studios.actual_start_date')
            .select('social_media_studios.actuald_end_date')
            .select('social_media_studios.stage')
            .select('social_media_studios.priority')
            .select('social_media_studios.clientApproval')
            .select('social_media_studios.creator_id')
            .select('social_media_studios.description')
            .findById(insertedId);
        console.log("result", result);
        return {
            success: true,
            message: 'SocialMediaStudio created successfully.',
            data: result,
        };
    }
    async addUsers(payload, currentUser) {
        const { id, ...userss } = payload;
        const users = (_.uniqBy(userss.users, 'userId')).filter(e => { return e.userId !== currentUser.id; });
        const usersIds = users.map(e => e.userId);
        const socialMediaStudios = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode, creatorId: currentUser.id })
            .findById(id);
        if (!socialMediaStudios) {
            return {
                success: false,
                message: 'No socialMediaStudio found.',
                data: {},
            };
        }
        const usersFnd = await this.userModel.query()
            .where({ brandCode: currentUser.brandCode })
            .whereNot({ userType: 'partner' })
            .findByIds(usersIds);
        if (usersFnd.length !== usersIds.length) {
            return {
                success: false,
                message: 'No users found.',
                data: {},
            };
        }
        const SMUsersFnd = await this.socialMediaStudioUserModel.query()
            .where({ socialMediaStudioId: socialMediaStudios.id })
            .whereIn('userId', usersIds)
            .whereNot({ userId: socialMediaStudios.creatorId });
        if (SMUsersFnd.length) {
            return {
                success: false,
                message: 'No socialMediaStudio users found.',
                data: {},
            };
        }
        const trx = await this.modelClass.startTransaction();
        try {
            for (let user of users) {
                const insertedSM = await this.socialMediaStudioUserModel.query(trx).insert(user);
                if (!insertedSM) {
                    throw insertedSM;
                }
            }
            await trx.commit();
        }
        catch (err) {
            await trx.rollback();
            return {
                success: false,
                message: "Something went wrong during adding users!",
                data: err,
            };
        }
        const newSMUsersFnd = await this.socialMediaStudioUserModel.query()
            .where({ socialMediaStudioId: socialMediaStudios.id })
            .whereIn('userId', usersIds)
            .whereNot({ userId: socialMediaStudios.creatorId });
        if (newSMUsersFnd.length == users.length) {
            return {
                success: true,
                message: 'SocialMediaStudio Users added successfully.',
                data: socialMediaStudios,
            };
        }
        else {
            return {
                success: false,
                message: 'SocialMediaStudio Users not inserted properly!.',
                data: socialMediaStudios
            };
        }
    }
    async createMedia(payload, currentUser) {
        const mediaPayload = payload;
        const SMSFND = await this.modelClass.query()
            .findById(mediaPayload.socialMediaStudioId)
            .where({ creatorId: currentUser.id, brandCode: currentUser.brandCode });
        if (!SMSFND) {
            return {
                success: false,
                message: 'SocialMediaStudio doesnt exist.',
                data: {},
            };
        }
        const { attachments, ...mediaParams } = mediaPayload;
        mediaParams['brandCode'] = currentUser.brandCode;
        mediaParams['createdBy'] = currentUser.username;
        console.log("mediaParams: ", mediaParams);
        const createdMedia = await this.mediaModel.query().insert(mediaParams);
        if (createdMedia) {
            if (attachments === null || attachments === void 0 ? void 0 : attachments.length) {
                await attachments.forEach(async (attachment) => {
                    const prepFile = {
                        originalname: attachment.originalname,
                        buffer: attachment.buffer,
                        mimetype: attachment.mimetype,
                        size: attachment.size,
                    };
                    const attachmentUploaded = await this.fileUploadService.addFile(prepFile, "SocialMediaStudioAttachments", currentUser);
                    if (attachmentUploaded.success) {
                        await SMSFND.$relatedQuery('attachments').relate(attachmentUploaded.data.id);
                    }
                    else
                        return attachmentUploaded;
                });
            }
        }
        else {
            return {
                success: false,
                message: 'couldnt create media',
                data: createdMedia,
            };
        }
    }
    async addAttachments(payload, currentUser) {
        const { files, id } = payload;
        const mediaFnd = await this.mediaModel.query()
            .join('socialMediaStudios', 'socialMediaStudios.id', '=', 'medias.socialMediaStudioId')
            .where('socialMediaStudios.brandCode', currentUser.brandCode)
            .findById(id)
            .withGraphFetched({ socialMediaStudio: {} });
        if (!mediaFnd) {
            return {
                success: false,
                message: 'Media doesnt exist.',
                data: {},
            };
        }
        const creatorFnd = await this.modelClass
            .query()
            .select('id')
            .findOne('id', mediaFnd.socialMediaStudioId)
            .where('brandCode', currentUser.brandCode)
            .where('creatorId', currentUser.id);
        const memberFnd = await this.socialMediaStudioUserModel
            .query()
            .select('social_media_studios.id')
            .join('social_media_studios', 'social_media_studio_users.social_media_studio_id', '=', 'social_media_studios.id')
            .whereIn('social_media_studios.stage', ['production', 'review', 'completed'])
            .where('social_media_studios.brand_code', currentUser.brandCode)
            .where('social_media_studio_users.user_id', currentUser.id)
            .findOne('social_media_studios.id', id);
        if (!creatorFnd || !memberFnd) {
            return {
                success: false,
                message: "Media not found",
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
            const uploadedFileService = await this.fileUploadService.addFile(prepFile, "socialMedias", currentUser);
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
                const insertedAttach = await this.mediaAttachmentModel.query(trx)
                    .insert({
                    attachmentId: attachId,
                    mediaId: mediaFnd.id
                });
                if (!insertedAttach) {
                    throw {
                        message: "couldnt insert mediaAttachment on media",
                        data: insertedAttach,
                    };
                }
            }
            await trx.commit();
            return {
                success: true,
                message: 'Media Attachments added successfully.',
                data: {},
            };
        }
        catch (err) {
            await trx.rollback();
            return {
                success: false,
                message: `Something went wrong. MediaAttachments were not inserted.`,
                data: err,
            };
        }
    }
    async update(payload, currentUser) {
        const { users, ...socialMediaStudioPayload } = payload;
        const socialMediaStudio = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(socialMediaStudioPayload.id)
            .withGraphFetched({ client: {} });
        if (socialMediaStudio) {
            let finalParams = {};
            if (socialMediaStudio.creatorId === currentUser.id) {
                if (socialMediaStudioPayload.stage === 'completed') {
                    finalParams['actualdEndDate'] = moment().format('YYYY-MM-DD HH:mm:ss').toString();
                    finalParams['stage'] = 'completed';
                    finalParams['status'] = 'done';
                }
                if (socialMediaStudioPayload.stage === 'production') {
                    finalParams['actualStartDate'] = moment().format('YYYY-MM-DD HH:mm:ss').toString();
                }
                if (socialMediaStudioPayload.stage === 'rejected') {
                    finalParams['status'] = 'rejected';
                }
                if (socialMediaStudioPayload.clientId) {
                    const clientFnd = await this.clientSerive.findById(socialMediaStudioPayload.clientId, currentUser);
                    console.log(clientFnd);
                    if (!clientFnd.success) {
                        return {
                            success: false,
                            message: 'SocialMediaStudio Error: Client doesnt exist.',
                            data: {},
                        };
                    }
                }
                finalParams['actualdEndDate'] = socialMediaStudioPayload['actualdEndDate'] ? socialMediaStudioPayload['actualdEndDate'] : socialMediaStudio.actualdEndDate;
                finalParams['id'] = socialMediaStudioPayload.id ? socialMediaStudioPayload.id : socialMediaStudio.id;
                finalParams['name'] = socialMediaStudioPayload.name ? socialMediaStudioPayload.name : socialMediaStudio.name;
                finalParams['status'] = socialMediaStudioPayload.status ? socialMediaStudioPayload.status : socialMediaStudio.status;
                finalParams['plannedStartDate'] = socialMediaStudioPayload.plannedStartDate ? socialMediaStudioPayload.plannedStartDate : socialMediaStudio.plannedStartDate;
                finalParams['plannedEndDate'] = socialMediaStudioPayload.plannedEndDate ? socialMediaStudioPayload.plannedEndDate : socialMediaStudio.plannedEndDate;
                finalParams['schedule'] = socialMediaStudioPayload.schedule ? socialMediaStudioPayload.schedule : socialMediaStudio.schedule;
                finalParams['clientApproval'] = socialMediaStudioPayload.clientApproval ? socialMediaStudioPayload.clientApproval : socialMediaStudio.clientApproval;
                finalParams['priority'] = socialMediaStudioPayload.priority ? socialMediaStudioPayload.priority : socialMediaStudio.priority;
                finalParams['description'] = socialMediaStudioPayload.description ? socialMediaStudioPayload.description : socialMediaStudio.description;
                finalParams['clientId'] = socialMediaStudioPayload.clientId ? socialMediaStudioPayload.clientId : socialMediaStudio.clientId;
                finalParams['updatedBy'] = currentUser.username;
            }
            else {
                return {
                    success: false,
                    message: 'No socialMediaStudio found.',
                    data: {},
                };
            }
            const updatedSocialMediaStudio = await this.modelClass.query()
                .update(finalParams)
                .where({ id: socialMediaStudioPayload.id });
            return {
                success: true,
                message: 'SocialMediaStudio details updated successfully.',
                data: updatedSocialMediaStudio,
            };
        }
        else {
            return {
                success: false,
                message: 'No socialMediaStudio found.',
                data: {},
            };
        }
    }
    async updateMedia(payload, currentUser) {
        const { attachments, ...mediaPayload } = payload;
        const mediaFnd = await this.mediaModel.query()
            .join('socialMediaStudios', 'socialMediaStudios.id', '=', 'medias.socialMediaStudioId')
            .where('socialMediaStudios.brandCode', currentUser.brandCode)
            .findById(mediaPayload.id);
        if (!mediaFnd) {
            return {
                success: false,
                message: 'Media doesnt exist.',
                data: {},
            };
        }
        const creatorFnd = await this.modelClass
            .query()
            .select('id')
            .findOne('id', mediaFnd.socialMediaStudioId)
            .where('brandCode', currentUser.brandCode)
            .where('creatorId', currentUser.id);
        const memberFnd = await this.socialMediaStudioUserModel
            .query()
            .select('social_media_studios.id')
            .select('social_media_studio_users.can_edit')
            .join('social_media_studios', 'social_media_studio_users.social_media_studio_id', '=', 'social_media_studios.id')
            .whereIn('social_media_studios.stage', ['production', 'review', 'completed'])
            .where('social_media_studios.brand_code', currentUser.brandCode)
            .where('social_media_studio_users.user_id', currentUser.id)
            .findOne('social_media_studios.id', mediaPayload.id);
        if (!creatorFnd || !memberFnd) {
            return {
                success: false,
                message: "Media not found",
                data: {},
            };
        }
        if (memberFnd.approved) {
            return {
                success: false,
                message: "Already approved and cant edit",
                data: {},
            };
        }
        if (!creatorFnd && memberFnd.userId === currentUser.id && !memberFnd.canEdit) {
            return {
                success: false,
                message: "Not Allowed to edit",
                data: {},
            };
        }
        const updatedMedia = await this.mediaModel.query()
            .where({ brandCode: currentUser.brandCode })
            .where({ id: mediaPayload.id })
            .update({
            id: mediaPayload.id ? mediaPayload.id : mediaFnd.id,
            name: mediaPayload.name ? mediaPayload.name : mediaFnd.name,
            type: mediaPayload.type ? mediaPayload.type : mediaFnd.type,
            designSize: mediaPayload.designSize ? mediaPayload.designSize : mediaFnd.designSize,
            plannedStartDate: mediaPayload.plannedStartDate ? mediaPayload.plannedStartDate : mediaFnd.plannedStartDate,
            plannedEndDate: mediaPayload.plannedEndDate ? mediaPayload.plannedEndDate : mediaFnd.plannedEndDate,
            priority: mediaPayload.priority ? mediaPayload.priority : mediaFnd.priority,
            title: mediaPayload.title ? mediaPayload.title : mediaFnd.title,
            caption: mediaPayload.caption ? mediaPayload.caption : mediaFnd.caption,
            textOnDesign: mediaPayload.textOnDesign ? mediaPayload.textOnDesign : mediaFnd.textOnDesign,
            updatedBy: currentUser.id
        });
        return {
            success: true,
            message: 'Media details updated successfully.',
            data: updatedMedia,
        };
    }
    async approve(id, currentUser) {
        const memberFnd = await this.socialMediaStudioUserModel
            .query()
            .select('social_media_studio_users.id')
            .join('social_media_studios', 'social_media_studio_users.social_media_studio_id', '=', 'social_media_studios.id')
            .where('social_media_studios.stage', 'production')
            .where('social_media_studio_users.approved', false)
            .where('social_media_studio_users.canEdit', true)
            .where('social_media_studios.brand_code', currentUser.brandCode)
            .findOne('social_media_studio_users.user_id', currentUser.id)
            .findOne('social_media_studios.id', id);
        if (!memberFnd) {
            return {
                success: false,
                message: "SocialMediaStudio not found",
                data: {}
            };
        }
        const approved = await this.socialMediaStudioUserModel.query()
            .findById(memberFnd.id)
            .where({ userId: currentUser.id })
            .update({ approved: true });
        return {
            success: true,
            message: "Approved Successfully",
            data: approved
        };
    }
    async removeAttachment(payload, currentUser) {
        const mediaFnd = await this.mediaModel.query()
            .join('socialMediaStudios', 'socialMediaStudios.id', '=', 'medias.socialMediaStudioId')
            .where('socialMediaStudios.brandCode', currentUser.brandCode)
            .findById(payload.id)
            .withGraphFetched({ socialMediaStudio: {} });
        if (!mediaFnd) {
            return {
                success: false,
                message: 'Media doesnt exist.',
                data: {},
            };
        }
        const creatorFnd = await this.modelClass
            .query()
            .select('id')
            .findOne('id', mediaFnd.socialMediaStudioId)
            .where('brandCode', currentUser.brandCode)
            .where('creatorId', currentUser.id);
        const memberFnd = await this.socialMediaStudioUserModel
            .query()
            .select('social_media_studios.id')
            .join('social_media_studios', 'social_media_studio_users.social_media_studio_id', '=', 'social_media_studios.id')
            .whereIn('social_media_studios.stage', ['production', 'review', 'completed'])
            .where('social_media_studios.brand_code', currentUser.brandCode)
            .where('social_media_studio_users.user_id', currentUser.id)
            .findOne('social_media_studios.id', payload.id);
        if (!creatorFnd || !memberFnd) {
            return {
                success: false,
                message: "Media not found",
                data: {},
            };
        }
        const mediaAttachment = await this.mediaAttachmentModel.query()
            .findOne({ mediaId: mediaFnd.id, attachmentId: payload.attachId });
        if (!mediaAttachment) {
            return {
                success: false,
                message: "attachment on this Project not found",
                data: {},
            };
        }
        await this.mediaAttachmentModel.query()
            .delete()
            .where({ attachmentId: payload.attachId, mediaId: payload.id });
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
    async deleteById(socialMediaStudioId, currentUser) {
        const socialMediaStudios = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .delete()
            .where({ id: socialMediaStudioId, creatorId: currentUser.id });
        if (socialMediaStudios) {
            return {
                success: true,
                message: 'SocialMediaStudio deleted successfully.',
                data: socialMediaStudios,
            };
        }
        else {
            return {
                success: false,
                message: 'No socialMediaStudio found.',
                data: {},
            };
        }
    }
    async removeUsers(payload, currentUser) {
        const socialMediaStudios = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode, creatorId: currentUser.id })
            .findById(payload.id);
        if (!socialMediaStudios) {
            return {
                success: false,
                message: 'No socialMediaStudio found.',
                data: {},
            };
        }
        const SMUsersFnd = await this.socialMediaStudioUserModel.query()
            .where({ socialMediaStudioId: socialMediaStudios.id })
            .whereIn('userId', payload.users)
            .whereNot({ userId: socialMediaStudios.creatorId });
        if (SMUsersFnd.length) {
            return {
                success: false,
                message: 'No socialMediaStudio users found.',
                data: {},
            };
        }
        const deletedSM = await this.socialMediaStudioUserModel.query()
            .whereIn('userId', SMUsersFnd.map(e => e.userId))
            .where({ socialMediaStudioId: socialMediaStudios.id })
            .delete();
        if (deletedSM) {
            return {
                success: true,
                message: 'SocialMediaStudio Users deleted successfully.',
                data: socialMediaStudios,
            };
        }
        else {
            return {
                success: false,
                message: 'SocialMediaStudio Users not deleted!.',
                data: socialMediaStudios
            };
        }
    }
    async deleteMediaById(mediaId, currentUser) {
        const medias = await this.mediaModel
            .query()
            .join('social_media_studios', 'media.social_media_studio_id', '=', 'social_media_studios.id')
            .where('social_media_studios.creator_id', currentUser.id)
            .where({ brandCode: currentUser.brandCode })
            .delete()
            .where({ id: mediaId });
        if (medias) {
            return {
                success: true,
                message: 'Media deleted successfully.',
                data: medias,
            };
        }
        else {
            return {
                success: false,
                message: 'No Media found.',
                data: {},
            };
        }
    }
};
SocialMediaStudiosService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SocialMediaStudioModel')),
    __param(1, common_1.Inject('SocialMediaStudioUserModel')),
    __param(2, common_1.Inject('MediaModel')),
    __param(3, common_1.Inject('MediaAttachmentModel')),
    __param(4, common_1.Inject('UserModel')),
    __param(5, common_1.Inject('ClientsService')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, clients_service_1.ClientsService,
        app_service_1.FileUploadService])
], SocialMediaStudiosService);
exports.SocialMediaStudiosService = SocialMediaStudiosService;
//# sourceMappingURL=socialMediaStudios.service.js.map
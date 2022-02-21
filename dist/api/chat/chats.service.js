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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../app/app.service");
let ChatsService = class ChatsService {
    constructor(modelClass, fileUploadService) {
        this.modelClass = modelClass;
        this.fileUploadService = fileUploadService;
    }
    async removeFiles(payload, currentUser) {
        const message = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(payload.id)
            .withGraphFetched({ attachments: {} });
        if (!message) {
            return {
                success: false,
                message: "Message not found",
                data: {},
            };
        }
        for (let attId of payload.attachmentIds) {
            this.fileUploadService.removeFile(attId, currentUser);
        }
        const attIds = message.attachments.map(e => e.id);
        message.$relatedQuery('attachments')
            .unrelate()
            .whereIn("attachments.id", attIds);
        return {
            success: true,
            message: 'Message Attachments removed successfully.',
            data: {},
        };
    }
    async addFiles(payload, currentUser) {
        const allFilesUploaded = [];
        for (let file of payload) {
            const prepFile = {
                originalname: file.originalname,
                buffer: file.buffer,
                mimetype: file.mimetype,
                size: file.size,
            };
            const uploadedFileService = await this.fileUploadService.addFile(prepFile, "messages", currentUser);
            if (!uploadedFileService.success) {
                return {
                    success: false,
                    message: uploadedFileService.message,
                    data: uploadedFileService.data,
                };
            }
            allFilesUploaded.push(uploadedFileService.data);
        }
        return {
            success: true,
            message: 'Message Attachments added successfully.',
            data: allFilesUploaded,
        };
    }
};
ChatsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('MessageModel')),
    __metadata("design:paramtypes", [Object, app_service_1.FileUploadService])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map
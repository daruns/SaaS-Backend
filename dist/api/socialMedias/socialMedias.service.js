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
const common_1 = require("@nestjs/common");
const socialMedia_model_1 = require("../../database/models/socialMedia.model");
const clients_service_1 = require("../clients/clients.service");
let SocialMediasService = class SocialMediasService {
    constructor(modelClass, clientSerive) {
        this.modelClass = modelClass;
        this.clientSerive = clientSerive;
    }
    async findAll(currentUser) {
        const socialMedias = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'SocialMedia details fetch successfully.',
            data: socialMedias,
        };
    }
    async findById(id, currentUser) {
        const socialMedia = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (socialMedia) {
            return {
                success: true,
                message: 'SocialMedia details fetch successfully.',
                data: socialMedia,
            };
        }
        else {
            return {
                success: false,
                message: 'No socialMedia details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const socialMediaPayload = payload;
        const newSocialMedia = await this.modelClass.query()
            .findOne({
            brandCode: currentUser.brandCode,
            linkAddress: socialMediaPayload.linkAddress,
            clientId: socialMediaPayload.clientId
        });
        if (!newSocialMedia) {
            if (socialMediaPayload.clientId) {
                const clientFnd = await this.clientSerive.findById(socialMediaPayload.clientId, currentUser);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'Client doesnt exist.',
                        data: {},
                    };
                }
            }
            socialMediaPayload.createdBy = currentUser.username;
            socialMediaPayload.brandCode = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(socialMediaPayload);
            const createSocialMedia = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'SocialMedia created successfully.',
                data: createSocialMedia,
            };
        }
        else {
            return {
                success: false,
                message: 'SocialMedia already exists with this link address address!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const socialMediaPayload = payload;
        const socialMedia = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(socialMediaPayload.id);
        if (socialMedia) {
            if (socialMediaPayload.clientId) {
                const clientFnd = await this.clientSerive.findById(socialMediaPayload.clientId, currentUser);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'Client doesnt exist.',
                        data: {},
                    };
                }
            }
            const updatedSocialMedia = await this.modelClass
                .query()
                .update({
                name: socialMediaPayload.name ? socialMediaPayload.name : socialMedia.name,
                linkAddress: socialMediaPayload.linkAddress ? socialMediaPayload.linkAddress : socialMedia.linkAddress,
                addressDomain: socialMediaPayload.addressDomain ? socialMediaPayload.addressDomain : socialMedia.addressDomain,
                status: socialMediaPayload.status ? socialMediaPayload.status : socialMedia.status,
                deleted: socialMediaPayload.deleted ? socialMediaPayload.deleted : socialMedia.deleted,
                updatedBy: currentUser.username,
                clientId: socialMediaPayload.clientId ? socialMediaPayload.clientId : socialMedia.clientId,
            })
                .where({ id: socialMediaPayload.id });
            return {
                success: true,
                message: 'SocialMedia details updated successfully.',
                data: updatedSocialMedia,
            };
        }
        else {
            return {
                success: false,
                message: 'No socialMedia found.',
                data: {},
            };
        }
    }
    async deleteById(socialMediaId, currentUser) {
        const socialMedias = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .delete()
            .where({ id: socialMediaId });
        if (socialMedias) {
            return {
                success: true,
                message: 'SocialMedia deleted successfully.',
                data: socialMedias,
            };
        }
        else {
            return {
                success: false,
                message: 'No socialMedia found.',
                data: {},
            };
        }
    }
};
SocialMediasService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SocialMediaModel')),
    __param(1, common_1.Inject('ClientsService')),
    __metadata("design:paramtypes", [Object, clients_service_1.ClientsService])
], SocialMediasService);
exports.SocialMediasService = SocialMediasService;
//# sourceMappingURL=socialMedias.service.js.map
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
exports.MeetingsService = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../clients/clients.service");
const moment = require("moment");
let MeetingsService = class MeetingsService {
    constructor(modelClass, clientSerive) {
        this.modelClass = modelClass;
        this.clientSerive = clientSerive;
    }
    async findAll(currentUser) {
        const meetings = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'Meeting details fetch successfully.',
            data: meetings,
        };
    }
    async findById(id, currentUser) {
        const meeting = await this.modelClass
            .query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (meeting) {
            return {
                success: true,
                message: 'Meeting details fetch successfully.',
                data: meeting,
            };
        }
        else {
            return {
                success: false,
                message: 'No meeting details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const meetingPayload = payload;
        if (meetingPayload.clientId) {
            const clientFnd = await this.clientSerive.findById(meetingPayload.clientId, currentUser);
            if (!clientFnd.success) {
                return {
                    success: false,
                    message: 'Client doesnt exist.',
                    data: {},
                };
            }
        }
        meetingPayload.date = moment(meetingPayload.date).format('YYYY-MM-DD HH:mm:ss').toString();
        meetingPayload.nextMeetingDate = moment(meetingPayload.nextMeetingDate).format('YYYY-MM-DD HH:mm:ss').toString();
        meetingPayload.createdBy = currentUser.username;
        meetingPayload.brandCode = currentUser.brandCode;
        const identifiers = await this.modelClass.query().insert(meetingPayload);
        const createMeeting = await this.modelClass.query().findById(identifiers.id);
        return {
            success: true,
            message: 'Meeting created successfully.',
            data: createMeeting,
        };
    }
    async update(payload, currentUser) {
        const meetingPayload = payload;
        const meeting = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(meetingPayload.id);
        if (meeting) {
            if (meetingPayload.clientId) {
                const clientFnd = await this.clientSerive.findById(meetingPayload.clientId, currentUser);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'Client doesnt exist.',
                        data: {},
                    };
                }
            }
            meetingPayload.date = meetingPayload.date ? moment(meetingPayload.date).format('YYYY-MM-DD HH:mm:ss').toString() : meeting.date;
            meetingPayload.nextMeetingDate = meetingPayload.nextMeetingDate ? moment(meetingPayload.nextMeetingDate).format('YYYY-MM-DD HH:mm:ss').toString() : meeting.nextMeetingDate;
            const updatedMeeting = await this.modelClass
                .query()
                .update({
                date: meetingPayload.date ? meetingPayload.date : meeting.date,
                duration: meetingPayload.duration ? meetingPayload.duration : meeting.duration,
                type: meetingPayload.type ? meetingPayload.type : meeting.type,
                details: meetingPayload.details ? meetingPayload.details : meeting.details,
                serviceRequirements: meetingPayload.serviceRequirements ? meetingPayload.serviceRequirements : meeting.serviceRequirements,
                nextMeetingDate: meetingPayload.nextMeetingDate ? meetingPayload.nextMeetingDate : meeting.nextMeetingDate,
                currentServiceProvider: meetingPayload.currentServiceProvider ? meetingPayload.currentServiceProvider : meeting.currentServiceProvider,
                clientId: meetingPayload.clientId ? meetingPayload.clientId : meeting.clientId,
                updatedBy: currentUser.username,
            })
                .where({ id: meetingPayload.id });
            return {
                success: true,
                message: 'Meeting details updated successfully.',
                data: updatedMeeting,
            };
        }
        else {
            return {
                success: false,
                message: 'No meeting found.',
                data: {},
            };
        }
    }
    async deleteById(meetingId, currentUser) {
        const meetings = await this.modelClass.query()
            .delete()
            .where({
            brandCode: currentUser.brandCode,
            id: meetingId
        });
        if (meetings) {
            return {
                success: true,
                message: 'Meeting deleted successfully.',
                data: meetings,
            };
        }
        else {
            return {
                success: false,
                message: 'No meeting found.',
                data: {},
            };
        }
    }
};
MeetingsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('MeetingModel')),
    __metadata("design:paramtypes", [Object, clients_service_1.ClientsService])
], MeetingsService);
exports.MeetingsService = MeetingsService;
//# sourceMappingURL=meetings.service.js.map
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
const meeting_model_1 = require("../../database/models/meeting.model");
let MeetingsService = class MeetingsService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const meetings = await this.modelClass.query();
        return {
            success: true,
            message: 'Meeting details fetch successfully.',
            data: meetings,
        };
    }
    async findById(id, currentUser) {
        const meeting = await this.modelClass
            .query()
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
                success: true,
                message: 'No meeting details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        let meetingPayload = payload;
        const newMeeting = await this.modelClass.query();
        if (!newMeeting.length) {
            meetingPayload.createdBy = currentUser.username;
            delete meetingPayload.date;
            delete meetingPayload.nextMeetingDate;
            const identifiers = await this.modelClass.query().insert(meetingPayload);
            const createMeeting = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'Meeting created successfully.',
                data: createMeeting,
            };
        }
        else {
            return {
                success: false,
                message: 'Meeting already exists with this email address!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        let meetingPayload = payload;
        const meeting = await this.modelClass.query().findById(meetingPayload.id);
        if (meeting) {
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
                success: true,
                message: 'No meeting found.',
                data: {},
            };
        }
    }
    async deleteById(meetingId, currentUser) {
        const meetings = await this.modelClass
            .query()
            .delete()
            .where({ id: meetingId });
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
    __metadata("design:paramtypes", [Object])
], MeetingsService);
exports.MeetingsService = MeetingsService;
//# sourceMappingURL=meetings.service.js.map
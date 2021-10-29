import { Injectable, Inject } from '@nestjs/common';
import { MeetingModel } from 'src/database/models/meeting.model';
import { ModelClass } from 'objection';
import { ClientsService } from '../clients/clients.service';
import * as moment from 'moment'
export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class MeetingsService {
  constructor(
    @Inject('MeetingModel') private modelClass: ModelClass<MeetingModel>,
    private clientSerive: ClientsService,
  ) {}

  // meeting list
  async findAll(currentUser): Promise<ResponseData> {
    const meetings = await this.modelClass.query()
    return {
      success: true,
      message: 'Meeting details fetch successfully.',
      data: meetings,
    };
  }

  // find one meeting info by meetingId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const meeting = await this.modelClass
      .query()
      .findById(id)
    if (meeting) {
      return {
        success: true,
        message: 'Meeting details fetch successfully.',
        data: meeting,
      };
    } else {
      return {
        success: true,
        message: 'No meeting details found.',
        data: {},
      };
    }
  }
  // Create meeting before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    let meetingPayload = payload
    if (meetingPayload.clientId) {
      const clientFnd = await this.clientSerive.findById(meetingPayload.clientId,currentUser)
      if (!clientFnd.data.id) {
        return {
          success: false,
          message: 'Client doesnt exist.',
          data: {},
        };
      }
    }

    meetingPayload.userId = meetingPayload.userId ? meetingPayload.userId : currentUser.id
    meetingPayload.date = moment(meetingPayload.date).format('YYYY-MM-DD HH:mm:ss').toString()
    meetingPayload.nextMeetingDate = moment(meetingPayload.nextMeetingDate).format('YYYY-MM-DD HH:mm:ss').toString()
    meetingPayload.createdBy = currentUser.username
    // delete meetingPayload.date
    // delete meetingPayload.nextMeetingDate
    const identifiers = await this.modelClass.query().insert(meetingPayload);
    const createMeeting = await this.modelClass.query().findById(identifiers.id);
    return {
      success: true,
      message: 'Meeting created successfully.',
      data: createMeeting,
    };
  }
  async update(payload, currentUser): Promise<ResponseData> {
    let meetingPayload = payload
    const meeting = await this.modelClass.query().findById(meetingPayload.id);
    if (meeting) {
      if (meetingPayload.clientId) {
        const clientFnd = await this.clientSerive.findById(meetingPayload.clientId,currentUser)
        if (!clientFnd.data.id) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: {},
          };
        }
      }
      meetingPayload.date = moment(meetingPayload.date).format('YYYY-MM-DD HH:mm:ss').toString()
      meetingPayload.nextMeetingDate = moment(meetingPayload.nextMeetingDate).format('YYYY-MM-DD HH:mm:ss').toString()
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
    } else {
      return {
        success: true,
        message: 'No meeting found.',
        data: {},
      };
    }
  }
  // Delete meeting
  async deleteById(meetingId: number, currentUser): Promise<ResponseData> {
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
    } else {
      return {
        success: false,
        message: 'No meeting found.',
        data: {},
      };
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { LeaveTypeModel } from 'src/database/models/leaveType.model';
import { ModelClass } from 'objection';
import { CreateLeaveTypeDto } from './dto/create-leaveType.dto';
import { UpdateLeaveTypeDto } from './dto/update-leaveType.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class LeaveTypesService {
  constructor(
    @Inject('LeaveTypeModel') private modelClass: ModelClass<LeaveTypeModel>,
  ) {}

  // leaveType list
  async findAll(currentUser): Promise<ResponseData> {
    const leaveTypes = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'Leave Types details fetch successfully.',
      data: leaveTypes,
    };
  }

  // find one leaveType info by leaveTypeId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const leaveType = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (leaveType) {
      return {
        success: true,
        message: 'LeaveType details fetch successfully.',
        data: leaveType,
      };
    } else {
      return {
        success: false,
        message: 'No leaveType details found.',
        data: {},
      };
    }
  }

  // Create leaveType before save encrypt password
  async create(payload: CreateLeaveTypeDto, currentUser): Promise<ResponseData> {
    const leaveTypePayload = payload
    const newLeaveType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: leaveTypePayload.name
    })
    if (!newLeaveType) {
      leaveTypePayload['createdBy'] = currentUser.username
      leaveTypePayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(leaveTypePayload);
      const createLeaveType = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'LeaveType created successfully.',
        data: createLeaveType,
      };
    } else {
      return {
        success: false,
        message: 'LeaveType already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateLeaveTypeDto, currentUser): Promise<ResponseData> {
    const leaveTypePayload = payload
    const leaveType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(leaveTypePayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (leaveType) {
      const updatedLeaveType = await this.modelClass
        .query()
        .update({
          name: leaveTypePayload.name ? leaveTypePayload.name : leaveType.name,
          fund: leaveTypePayload.fund ? leaveTypePayload.fund : leaveType.fund,
          days: leaveTypePayload.days ? leaveTypePayload.days : leaveType.days,
          hours: leaveTypePayload.hours ? leaveTypePayload.hours : leaveType.hours,
          durationType: leaveTypePayload.durationType ? leaveTypePayload.durationType : leaveType.durationType,
          urgent: typeof payload.urgent === 'boolean' ? payload.urgent : leaveType.urgent,
          updatedBy: currentUser.username,
        })
        .where({ id: leaveTypePayload.id });
      return {
        success: true,
        message: 'LeaveType details updated successfully.',
        data: updatedLeaveType,
      };
    } else {
      return {
        success: false,
        message: 'No leaveType found.',
        data: {},
      };
    }
  }

  // Delete leaveType
  async deleteById(leaveTypeId: number, currentUser): Promise<ResponseData> {
    const leaveTypes = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: leaveTypeId
      })
      .delete()
    if (leaveTypes) {
      return {
        success: true,
        message: 'LeaveType deleted successfully.',
        data: leaveTypes,
      };
    } else {
      return {
        success: false,
        message: 'No leaveType found.',
        data: {},
      };
    }
  }
}

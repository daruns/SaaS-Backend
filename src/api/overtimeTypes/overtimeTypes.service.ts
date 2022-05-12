import { Injectable, Inject } from '@nestjs/common';
import { OvertimeTypeModel } from 'src/database/models/overtimeType.model';
import { ModelClass } from 'objection';
import { CreateOvertimeTypeDto } from './dto/create-overtimeType.dto';
import { UpdateOvertimeTypeDto } from './dto/update-overtimeType.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class OvertimeTypesService {
  constructor(
    @Inject('OvertimeTypeModel') private modelClass: ModelClass<OvertimeTypeModel>,
  ) {}

  // overtimeType list
  async findAll(currentUser): Promise<ResponseData> {
    const overtimeTypes = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'Overtime Types details fetch successfully.',
      data: overtimeTypes,
    };
  }

  // find one overtimeType info by overtimeTypeId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const overtimeType = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (overtimeType) {
      return {
        success: true,
        message: 'OvertimeType details fetch successfully.',
        data: overtimeType,
      };
    } else {
      return {
        success: false,
        message: 'No overtimeType details found.',
        data: {},
      };
    }
  }

  // Create overtimeType before save encrypt password
  async create(payload: CreateOvertimeTypeDto, currentUser): Promise<ResponseData> {
    const overtimeTypePayload = payload
    const newOvertimeType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: overtimeTypePayload.name
    })
    if (!newOvertimeType) {
      overtimeTypePayload['createdBy'] = currentUser.username
      overtimeTypePayload['brandCode'] = currentUser.brandCode
      overtimeTypePayload.durationType = 'hours'
      const identifiers = await this.modelClass.query().insert(overtimeTypePayload);
      const createOvertimeType = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'OvertimeType created successfully.',
        data: createOvertimeType,
      };
    } else {
      return {
        success: false,
        message: 'OvertimeType already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateOvertimeTypeDto, currentUser): Promise<ResponseData> {
    const overtimeTypePayload = payload
    const overtimeType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(overtimeTypePayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (overtimeType) {
      const updatedOvertimeType = await this.modelClass
        .query()
        .update({
          name: overtimeTypePayload.name ? overtimeTypePayload.name : overtimeType.name,
          fund: overtimeTypePayload.fund ? overtimeTypePayload.fund : overtimeType.fund,
          days: overtimeTypePayload.days ? overtimeTypePayload.days : overtimeType.days,
          hours: overtimeTypePayload.hours ? overtimeTypePayload.hours : overtimeType.hours,
          updatedBy: currentUser.username,
        })
        .where({ id: overtimeTypePayload.id });
      return {
        success: true,
        message: 'OvertimeType details updated successfully.',
        data: updatedOvertimeType,
      };
    } else {
      return {
        success: false,
        message: 'No overtimeType found.',
        data: {},
      };
    }
  }

  // Delete overtimeType
  async deleteById(overtimeTypeId: number, currentUser): Promise<ResponseData> {
    const overtimeTypes = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: overtimeTypeId
      })
      .delete()
    if (overtimeTypes) {
      return {
        success: true,
        message: 'OvertimeType deleted successfully.',
        data: overtimeTypes,
      };
    } else {
      return {
        success: false,
        message: 'No overtimeType found.',
        data: {},
      };
    }
  }
}

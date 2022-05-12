import { Injectable, Inject } from '@nestjs/common';
import { EarningTypeModel } from 'src/database/models/earningType.model';
import { ModelClass } from 'objection';
import { CreateEarningTypeDto } from './dto/create-earningType.dto';
import { UpdateEarningTypeDto } from './dto/update-earningType.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class EarningTypesService {
  constructor(
    @Inject('EarningTypeModel') private modelClass: ModelClass<EarningTypeModel>,
  ) {}

  // earningType list
  async findAll(currentUser): Promise<ResponseData> {
    const earningTypes = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'Earning Types details fetch successfully.',
      data: earningTypes,
    };
  }

  // find one earningType info by earningTypeId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const earningType = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (earningType) {
      return {
        success: true,
        message: 'EarningType details fetch successfully.',
        data: earningType,
      };
    } else {
      return {
        success: false,
        message: 'No earningType details found.',
        data: {},
      };
    }
  }

  // Create earningType before save encrypt password
  async create(payload: CreateEarningTypeDto, currentUser): Promise<ResponseData> {
    const earningTypePayload = payload
    const newEarningType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({ name: earningTypePayload.name })
    if (!newEarningType) {
      earningTypePayload['createdBy'] = currentUser.username
      earningTypePayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(earningTypePayload);
      const createEarningType = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'EarningType created successfully.',
        data: createEarningType,
      };
    } else {
      return {
        success: false,
        message: 'EarningType already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateEarningTypeDto, currentUser): Promise<ResponseData> {
    const earningTypePayload = payload
    const earningType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(earningTypePayload.id);

    if (earningType) {
      const updatedEarningType = await this.modelClass
        .query()
        .update({
          name: earningTypePayload.name ? earningTypePayload.name : earningType.name,
          type: earningTypePayload.type ? earningTypePayload.type : earningType.type,
          fund: earningTypePayload.fund ? earningTypePayload.fund : earningType.fund,
          rate: earningTypePayload.rate ? earningTypePayload.rate : earningType.rate,
          durationType: earningTypePayload.durationType ? earningTypePayload.durationType : earningType.durationType,
          brandCode: earningTypePayload.brandCode ? earningTypePayload.brandCode : earningType.brandCode,
          updatedBy: currentUser.username,
        })
        .where({ id: earningTypePayload.id });
      return {
        success: true,
        message: 'EarningType details updated successfully.',
        data: updatedEarningType,
      };
    } else {
      return {
        success: false,
        message: 'No earningType found.',
        data: {},
      };
    }
  }

  // Delete earningType
  async deleteById(earningTypeId: number, currentUser): Promise<ResponseData> {
    const earningTypes = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: earningTypeId
      })
      .delete()
    if (earningTypes) {
      return {
        success: true,
        message: 'EarningType deleted successfully.',
        data: earningTypes,
      };
    } else {
      return {
        success: false,
        message: 'No earningType found.',
        data: {},
      };
    }
  }
}

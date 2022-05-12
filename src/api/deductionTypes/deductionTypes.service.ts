import { Injectable, Inject } from '@nestjs/common';
import { DeductionTypeModel } from 'src/database/models/deductionType.model';
import { ModelClass } from 'objection';
import { CreateDeductionTypeDto } from './dto/create-deductionType.dto';
import { UpdateDeductionTypeDto } from './dto/update-deductionType.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class DeductionTypesService {
  constructor(
    @Inject('DeductionTypeModel') private modelClass: ModelClass<DeductionTypeModel>,
  ) {}

  // deductionType list
  async findAll(currentUser): Promise<ResponseData> {
    const deductionTypes = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'Deduction Types details fetch successfully.',
      data: deductionTypes,
    };
  }

  // find one deductionType info by deductionTypeId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const deductionType = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (deductionType) {
      return {
        success: true,
        message: 'DeductionType details fetch successfully.',
        data: deductionType,
      };
    } else {
      return {
        success: false,
        message: 'No deductionType details found.',
        data: {},
      };
    }
  }

  // Create deductionType before save encrypt password
  async create(payload: CreateDeductionTypeDto, currentUser): Promise<ResponseData> {
    const deductionTypePayload = payload
    const newDeductionType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: deductionTypePayload.name
    })
    if (!newDeductionType) {
      deductionTypePayload['createdBy'] = currentUser.username
      deductionTypePayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(deductionTypePayload);
      const createDeductionType = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'DeductionType created successfully.',
        data: createDeductionType,
      };
    } else {
      return {
        success: false,
        message: 'DeductionType already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateDeductionTypeDto, currentUser): Promise<ResponseData> {
    const deductionTypePayload = payload
    const deductionType = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(deductionTypePayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (deductionType) {
      const updatedDeductionType = await this.modelClass
        .query()
        .update({
          name: deductionTypePayload.name ? deductionTypePayload.name : deductionType.name,
          type: deductionTypePayload.type ? deductionTypePayload.type : deductionType.type,
          fund: deductionTypePayload.fund ? deductionTypePayload.fund : deductionType.fund,
          rate: deductionTypePayload.rate ? deductionTypePayload.rate : deductionType.rate,
          durationType: deductionTypePayload.durationType ? deductionTypePayload.durationType : deductionType.durationType,
          brandCode: deductionTypePayload.brandCode ? deductionTypePayload.brandCode : deductionType.brandCode,
          updatedBy: currentUser.username,
        })
        .where({ id: deductionTypePayload.id });
      return {
        success: true,
        message: 'DeductionType details updated successfully.',
        data: updatedDeductionType,
      };
    } else {
      return {
        success: false,
        message: 'No deductionType found.',
        data: {},
      };
    }
  }

  // Delete deductionType
  async deleteById(deductionTypeId: number, currentUser): Promise<ResponseData> {
    const deductionTypes = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: deductionTypeId
      })
      .delete()
    if (deductionTypes) {
      return {
        success: true,
        message: 'DeductionType deleted successfully.',
        data: deductionTypes,
      };
    } else {
      return {
        success: false,
        message: 'No deductionType found.',
        data: {},
      };
    }
  }
}

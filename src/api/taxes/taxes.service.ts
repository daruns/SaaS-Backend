import { Injectable, Inject } from '@nestjs/common';
import { TaxModel } from 'src/database/models/tax.model';
import { ModelClass } from 'objection';
import { CreateUserDto } from '../auth/apps/users/dto/create-user.dto';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class TaxesService {
  constructor(
    @Inject('TaxModel') private modelClass: ModelClass<TaxModel>,
  ) {}

  // tax list
  async findAll(currentUser): Promise<ResponseData> {
    const taxes = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'Taxes details fetch successfully.',
      data: taxes,
    };
  }

  // find one tax info by taxId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const tax = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (tax) {
      return {
        success: true,
        message: 'Tax details fetch successfully.',
        data: tax,
      };
    } else {
      return {
        success: false,
        message: 'No tax details found.',
        data: {},
      };
    }
  }

  // Create tax before save encrypt password
  async create(payload: CreateTaxDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const taxPayload = payload
    const newTax = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: taxPayload.name
    })
    if (!newTax) {
      taxPayload['createdBy'] = currentUser.username
      taxPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(taxPayload);
      const createTax = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'Tax created successfully.',
        data: createTax,
      };
    } else {
      return {
        success: false,
        message: 'Tax already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateTaxDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const taxPayload = payload
    const tax = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(taxPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (tax) {
      const updatedTax = await this.modelClass
        .query()
        .update({
          name: taxPayload.name ? taxPayload.name : tax.name,
          type: taxPayload.type ? taxPayload.type : tax.type,
          rate: taxPayload.rate ? taxPayload.rate : tax.rate,
          description: taxPayload.description ? taxPayload.description : tax.description,
          // status: taxPayload.status ? taxPayload.status : tax.status,
          // deleted: taxPayload.deleted ? taxPayload.deleted : tax.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: taxPayload.id });
      return {
        success: true,
        message: 'Tax details updated successfully.',
        data: updatedTax,
      };
    } else {
      return {
        success: false,
        message: 'No tax found.',
        data: {},
      };
    }
  }

  // Delete tax
  async deleteById(taxId: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const taxes = await this.modelClass.query()
      .where({
        brandCode: CUser.brandCode,
        id: taxId
      })
      .delete()
    if (taxes) {
      return {
        success: true,
        message: 'Tax deleted successfully.',
        data: taxes,
      };
    } else {
      return {
        success: false,
        message: 'No tax found.',
        data: {},
      };
    }
  }
}

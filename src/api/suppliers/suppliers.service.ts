import { Injectable, Inject } from '@nestjs/common';
import { SupplierModel } from 'src/database/models/supplier.model';
import { ModelClass } from 'objection';
import { CreateUserDto } from '../auth/apps/users/dto/create-user.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class SuppliersService {
  constructor(
    @Inject('SupplierModel') private modelClass: ModelClass<SupplierModel>,
  ) {}

  // supplier list
  async findAll(currentUser): Promise<ResponseData> {
    const suppliers = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'Suppliers details fetch successfully.',
      data: suppliers,
    };
  }

  // find one supplier info by supplierId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const supplier = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (supplier) {
      return {
        success: true,
        message: 'Supplier details fetch successfully.',
        data: supplier,
      };
    } else {
      return {
        success: false,
        message: 'No supplier details found.',
        data: {},
      };
    }
  }

  // Create supplier before save encrypt password
  async create(payload: CreateSupplierDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const supplierPayload = payload
    const newSupplier = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: supplierPayload.name
    })
    if (!newSupplier) {
      supplierPayload['createdBy'] = currentUser.username
      supplierPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(supplierPayload);
      const createSupplier = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'Supplier created successfully.',
        data: createSupplier,
      };
    } else {
      return {
        success: false,
        message: 'Supplier already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateSupplierDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const supplierPayload = payload
    const supplier = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(supplierPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (supplier) {
      const updatedSupplier = await this.modelClass
        .query()
        .update({          
          name: supplierPayload.name ? supplierPayload.name : supplier.name,
          logo: supplierPayload.logo ? supplierPayload.logo : supplier.logo,
          phoneNumbers: supplierPayload.phoneNumbers ? supplierPayload.phoneNumbers : supplier.phoneNumbers,
          supplierType: supplierPayload.supplierType ? supplierPayload.supplierType : supplier.supplierType,
          businessType: supplierPayload.businessType ? supplierPayload.businessType : supplier.businessType,
          email: supplierPayload.email ? supplierPayload.email : supplier.email,
          website: supplierPayload.website ? supplierPayload.website : supplier.website,
          address: supplierPayload.address ? supplierPayload.address : supplier.address,
          rate: supplierPayload.rate ? supplierPayload.rate : supplier.rate,
          zipCode: supplierPayload.zipCode ? supplierPayload.zipCode : supplier.zipCode,
          status: supplierPayload.status ? supplierPayload.status : supplier.status,
          // deleted: supplierPayload.deleted ? supplierPayload.deleted : supplier.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: supplierPayload.id });
      return {
        success: true,
        message: 'Supplier details updated successfully.',
        data: updatedSupplier,
      };
    } else {
      return {
        success: false,
        message: 'No supplier found.',
        data: {},
      };
    }
  }

  // Delete supplier
  async deleteById(supplierId: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const suppliers = await this.modelClass.query()
      .where({
        brandCode: CUser.brandCode,
        id: supplierId
      })
      .delete()
    if (suppliers) {
      return {
        success: true,
        message: 'Supplier deleted successfully.',
        data: suppliers,
      };
    } else {
      return {
        success: false,
        message: 'No supplier found.',
        data: {},
      };
    }
  }
}

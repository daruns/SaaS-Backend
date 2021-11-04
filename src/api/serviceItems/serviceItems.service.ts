import { Injectable, Inject } from '@nestjs/common';
import { ServiceItemModel } from 'src/database/models/serviceItem.model';
import { ModelClass } from 'objection';
import { CreateUserDto } from '../auth/apps/users/dto/create-user.dto';
import { CreateServiceItemDto } from './dto/create-serviceItem.dto';
import { UpdateServiceItemDto } from './dto/update-serviceItem.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ServiceItemsService {
  constructor(
    @Inject('ServiceItemModel') private modelClass: ModelClass<ServiceItemModel>,
  ) {}

  // serviceItem list
  async findAll(currentUser): Promise<ResponseData> {
    const serviceItems = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: serviceItems,
    };
  }

  // find one serviceItem info by serviceItemId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const serviceItem = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (serviceItem) {
      return {
        success: true,
        message: 'ServiceItem details fetch successfully.',
        data: serviceItem,
      };
    } else {
      return {
        success: false,
        message: 'No serviceItem details found.',
        data: {},
      };
    }
  }

  // Create serviceItem before save encrypt password
  async create(payload: CreateServiceItemDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const serviceItemPayload = payload
    const newServiceItem = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: serviceItemPayload.name
    })
    if (!newServiceItem) {
      serviceItemPayload['createdBy'] = currentUser.username
      serviceItemPayload['brandCode'] = currentUser.brandCode
      serviceItemPayload['qty'] = 1
      const identifiers = await this.modelClass.query().insert(serviceItemPayload);
      const createServiceItem = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'ServiceItem created successfully.',
        data: createServiceItem,
      };
    } else {
      return {
        success: false,
        message: 'ServiceItem already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateServiceItemDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const serviceItemPayload = payload
    const serviceItem = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(serviceItemPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (serviceItem) {
      const updatedServiceItem = await this.modelClass
        .query()
        .update({
          name: serviceItemPayload.name ? serviceItemPayload.name : serviceItem.name,
          description: serviceItemPayload.description ? serviceItemPayload.description : serviceItem.description,
          unitPrice: serviceItemPayload.unitPrice ? serviceItemPayload.unitPrice : serviceItem.unitPrice,
          purchasedAt: serviceItemPayload.purchasedAt ? serviceItemPayload.purchasedAt : serviceItem.purchasedAt,
          expireDate: serviceItemPayload.expireDate ? serviceItemPayload.expireDate : serviceItem.expireDate,
          supplier: serviceItemPayload.supplier ? serviceItemPayload.supplier : serviceItem.supplier,
          // status: serviceItemPayload.status ? serviceItemPayload.status : serviceItem.status,
          // deleted: serviceItemPayload.deleted ? serviceItemPayload.deleted : serviceItem.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: serviceItemPayload.id });
      return {
        success: true,
        message: 'ServiceItem details updated successfully.',
        data: updatedServiceItem,
      };
    } else {
      return {
        success: false,
        message: 'No serviceItem found.',
        data: {},
      };
    }
  }

  // Delete serviceItem
  async deleteById(serviceItemId: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const serviceItems = await this.modelClass.query()
      .where({
        brandCode: CUser.brandCode,
        id: serviceItemId
      })
      .delete()
    if (serviceItems) {
      return {
        success: true,
        message: 'ServiceItem deleted successfully.',
        data: serviceItems,
      };
    } else {
      return {
        success: false,
        message: 'No serviceItem found.',
        data: {},
      };
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { SubServiceItemModel } from 'src/database/models/subServiceItem.model';
import { ModelClass } from 'objection';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class SubServiceItemsService {
  constructor(
    @Inject('SubServiceItemModel') private modelClass: ModelClass<SubServiceItemModel>,
    private serviceItemService: ServiceItemsService,
  ) {}

  // subServiceItem list
  async findAll(currentUser): Promise<ResponseData> {
    const subServiceItems = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: subServiceItems,
    };
  }

  // find one subServiceItem info by subServiceItemId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const subServiceItem = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
    if (subServiceItem) {
      return {
        success: true,
        message: 'ServiceItem details fetch successfully.',
        data: subServiceItem,
      };
    } else {
      return {
        success: false,
        message: 'No subServiceItem details found.',
        data: {},
      };
    }
  }

  // Create subServiceItem before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    const subServiceItemPayload = payload
    const newServiceItem = await this.modelClass.query()
    .findOne({
      brandCode: currentUser.brandCode,
      name: subServiceItemPayload.name
    })
    if (!newServiceItem) {
      if (subServiceItemPayload.serviceItemId) {
        const clientFnd = await this.serviceItemService.findById(subServiceItemPayload.serviceItemId,currentUser)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'ServiceItem doesnt exist.',
            data: {},
          };
        }
      }

      subServiceItemPayload.createdBy = currentUser.username
      subServiceItemPayload.brandCode = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(subServiceItemPayload);
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

  async update(payload, currentUser): Promise<ResponseData> {
    const subServiceItemPayload = payload
    const subServiceItem = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(subServiceItemPayload.id);
    if (subServiceItem) {
      const updatedServiceItem = await this.modelClass.query()
        .update({
          name: payload.name ? payload.name : subServiceItem.name,
          serviceItemId: subServiceItemPayload.serviceItemId ? subServiceItemPayload.serviceItemId : subServiceItem.serviceItemId,
          status: subServiceItemPayload.status ? subServiceItemPayload.status : subServiceItem.status,
          deleted: subServiceItemPayload.deleted ? subServiceItemPayload.deleted : subServiceItem.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: subServiceItemPayload.id });
      return {
        success: true,
        message: 'ServiceItem details updated successfully.',
        data: updatedServiceItem,
      };
    } else {
      return {
        success: false,
        message: 'No subServiceItem found.',
        data: {},
      };
    }
  }

  // Delete subServiceItem
  async deleteById(subServiceItemId: number, currentUser): Promise<ResponseData> {
    const subServiceItems = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .delete()
      .where({ id: subServiceItemId });
    if (subServiceItems) {
      return {
        success: true,
        message: 'ServiceItem deleted successfully.',
        data: subServiceItems,
      };
    } else {
      return {
        success: false,
        message: 'No subServiceItem found.',
        data: {},
      };
    }
  }
}

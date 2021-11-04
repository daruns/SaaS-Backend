import { Injectable, Inject } from '@nestjs/common';
import { NonInventoryItemModel } from 'src/database/models/nonInventoryItem.model';
import { ModelClass } from 'objection';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class NonInventoryItemsService {
  constructor(
    @Inject('NonInventoryItemModel') private modelClass: ModelClass<NonInventoryItemModel>,
  ) {}

  // nonInventoryItem list
  async findAll(currentUser): Promise<ResponseData> {
    const nonInventoryItems = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'NonInventoryItem details fetch successfully.',
      data: nonInventoryItems,
    };
  }

  // find one nonInventoryItem info by nonInventoryItemId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const nonInventoryItem = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(id)
    if (nonInventoryItem) {
      return {
        success: true,
        message: 'NonInventoryItem details fetch successfully.',
        data: nonInventoryItem,
      };
    } else {
      return {
        success: false,
        message: 'No nonInventoryItem details found.',
        data: {},
      };
    }
  }

  // Create nonInventoryItem before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    const nonInventoryItemPayload = payload
    const newNonInventoryItem = await this.modelClass.query()
    .findOne({
      brandCode: currentUser.brandCode,
      name: nonInventoryItemPayload.name
    })
    if (!newNonInventoryItem) {
      nonInventoryItemPayload.qty = 1
      nonInventoryItemPayload.createdBy = currentUser.username
      nonInventoryItemPayload.brandCode = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(nonInventoryItemPayload);
      const createNonInventoryItem = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'NonInventoryItem created successfully.',
        data: createNonInventoryItem,
      };
    } else {
      return {
        success: false,
        message: 'NonInventoryItem already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const nonInventoryItemPayload = payload
    const nonInventoryItem = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(nonInventoryItemPayload.id);
    if (nonInventoryItem) {
      const updatedNonInventoryItem = await this.modelClass
        .query()
        .update({
          name: nonInventoryItemPayload.name ? nonInventoryItemPayload.name : nonInventoryItem.name,
          description: nonInventoryItemPayload.description ? nonInventoryItemPayload.description : nonInventoryItem.description,
          unitPrice: nonInventoryItemPayload.unitPrice ? nonInventoryItemPayload.unitPrice : nonInventoryItem.unitPrice,
          // qty: nonInventoryItemPayload.qty ? nonInventoryItemPayload.qty : nonInventoryItem.qty,
          purchasedAt: nonInventoryItemPayload.purchasedAt ? nonInventoryItemPayload.purchasedAt : nonInventoryItem.purchasedAt,
          expireDate: nonInventoryItemPayload.expireDate ? nonInventoryItemPayload.expireDate : nonInventoryItem.expireDate,
          supplier: nonInventoryItemPayload.supplier ? nonInventoryItemPayload.supplier : nonInventoryItem.supplier,
          status: nonInventoryItemPayload.status ? nonInventoryItemPayload.status : nonInventoryItem.status,
          deleted: nonInventoryItemPayload.deleted ? nonInventoryItemPayload.deleted : nonInventoryItem.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: nonInventoryItemPayload.id });
      return {
        success: true,
        message: 'NonInventoryItem details updated successfully.',
        data: updatedNonInventoryItem,
      };
    } else {
      return {
        success: false,
        message: 'No nonInventoryItem found.',
        data: {},
      };
    }
  }

  // Delete nonInventoryItem
  async deleteById(nonInventoryItemId: number, currentUser): Promise<ResponseData> {
    const nonInventoryItems = await this.modelClass.query()
      .delete()
      .where({
        brandCode: currentUser.brandCode,
        id: nonInventoryItemId
      });
    if (nonInventoryItems) {
      return {
        success: true,
        message: 'NonInventoryItem deleted successfully.',
        data: nonInventoryItems,
      };
    } else {
      return {
        success: false,
        message: 'No nonInventoryItem found.',
        data: {},
      };
    }
  }
}

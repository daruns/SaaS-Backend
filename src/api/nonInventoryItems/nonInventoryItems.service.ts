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

  // inventoryItem list
  async findAll(currentUser): Promise<ResponseData> {
    const nonInventoryItems = await this.modelClass.query()
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: nonInventoryItems,
    };
  }

  // find one inventoryItem info by inventoryItemId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const inventoryItem = await this.modelClass
      .query()
      .findById(id)
    if (inventoryItem) {
      return {
        success: true,
        message: 'NonInventoryItem details fetch successfully.',
        data: inventoryItem,
      };
    } else {
      return {
        success: true,
        message: 'No inventoryItem details found.',
        data: {},
      };
    }
  }

  // Create inventoryItem before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    let inventoryItemPayload = payload
    const newNonInventoryItem = await this.modelClass.query()
    .where({
      name: inventoryItemPayload.name
    })
    .withGraphFetched({
    })
    if (!newNonInventoryItem.length) {
      inventoryItemPayload.createdBy = currentUser.username
      inventoryItemPayload.userId = currentUser.id
      const identifiers = await this.modelClass.query().insert(inventoryItemPayload);
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
    let inventoryItemPayload = payload
    const inventoryItem = await this.modelClass.query().findById(inventoryItemPayload.id);
    if (inventoryItem) {
      const updatedNonInventoryItem = await this.modelClass
        .query()
        .update({
          id: payload.id ? payload.id : inventoryItem.id,
          name: payload.name ? payload.name : inventoryItem.name,
          description: payload.description ? payload.description : inventoryItem.description,
          unitPrice: payload.unitPrice ? payload.unitPrice : inventoryItem.unitPrice,
          qty: payload.qty ? payload.qty : inventoryItem.qty,
          purchasedAt: payload.purchasedAt ? payload.purchasedAt : inventoryItem.purchasedAt,
          expireDate: payload.expireDate ? payload.expireDate : inventoryItem.expireDate,
          supplier: payload.supplier ? payload.supplier : inventoryItem.supplier,
          status: inventoryItemPayload.status ? inventoryItemPayload.status : inventoryItem.status,
          deleted: inventoryItemPayload.deleted ? inventoryItemPayload.deleted : inventoryItem.deleted,
          updatedBy: currentUser.username,
          userId: inventoryItemPayload.userId ? inventoryItemPayload.userId : inventoryItem.userId,
        })
        .where({ id: inventoryItemPayload.id });
      return {
        success: true,
        message: 'NonInventoryItem details updated successfully.',
        data: updatedNonInventoryItem,
      };
    } else {
      return {
        success: true,
        message: 'No inventoryItem found.',
        data: {},
      };
    }
  }

  // Delete inventoryItem
  async deleteById(inventoryItemId: number, currentUser): Promise<ResponseData> {
    const nonInventoryItems = await this.modelClass
      .query()
      .delete()
      .where({ id: inventoryItemId });
    if (nonInventoryItems) {
      return {
        success: true,
        message: 'NonInventoryItem deleted successfully.',
        data: nonInventoryItems,
      };
    } else {
      return {
        success: false,
        message: 'No inventoryItem found.',
        data: {},
      };
    }
  }
}

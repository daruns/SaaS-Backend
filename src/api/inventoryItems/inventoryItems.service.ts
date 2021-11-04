import { Injectable, Inject } from '@nestjs/common';
import { InventoryItemModel } from 'src/database/models/inventoryItem.model';
import { ModelClass } from 'objection';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class InventoryItemsService {
  constructor(
    @Inject('InventoryItemModel') private modelClass: ModelClass<InventoryItemModel>,
  ) {}

  // inventoryItem list
  async findAll(currentUser): Promise<ResponseData> {
    const inventoryItems = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: inventoryItems,
    };
  }

  // find one inventoryItem info by inventoryItemId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const inventoryItem = await this.modelClass
      .query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (inventoryItem) {
      return {
        success: true,
        message: 'InventoryItem details fetch successfully.',
        data: inventoryItem,
      };
    } else {
      return {
        success: false,
        message: 'No inventoryItem details found.',
        data: {},
      };
    }
  }
  // Create inventoryItem before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    let inventoryItemPayload = payload
    const newInventoryItem = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: inventoryItemPayload.name
    })
    if (!newInventoryItem) {
      inventoryItemPayload.createdBy = currentUser.username
      inventoryItemPayload.brandCode = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(inventoryItemPayload);
      const createInventoryItem = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'InventoryItem created successfully.',
        data: createInventoryItem,
      };
    } else {
      return {
        success: false,
        message: 'InventoryItem already exists with this name!!!',
        data: {},
      };
    }
  }

  async reduceItemQty(item: {qty: number, id: number}, currentUser): Promise<ResponseData> {
    
    let inventoryItemPayload = item
    const inventoryItem = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(inventoryItemPayload.id);
    if (inventoryItem) {
      if (inventoryItem.qty <= 0) {
        return {
          success: false,
          message: 'Couldnt Reduce the quantity of inventoryItem',
          data: {msg: "This Item is running out of quantity."},
        }
      }
      if (!(inventoryItem.qty >= item.qty)) {
        return {
          success: false,
          message: 'Couldnt Reduce the quantity of inventoryItem',
          data: {msg: "New Quantity is larger than current Quantity."},
        }
      }
        const updatedInventoryItem = await this.modelClass
        .query()
        .update({
          qty: inventoryItem.qty - item.qty,
          updatedBy: currentUser.username,
        })
        .where({ id: inventoryItemPayload.id });
        if (updatedInventoryItem) {
          return {
            success: true,
            message: 'InventoryItem details updated successfully.',
            data: updatedInventoryItem,
          };
        } else {
          return {
            success: false,
            message: 'InventoryItem details did not updated.',
            data: updatedInventoryItem,
          };
        }
    } else {
      return {
        success: false,
        message: 'No inventoryItem found.',
        data: {},
      };
    }
  }

  async update(payload, currentUser): Promise<ResponseData> {
    let inventoryItemPayload = payload
    const inventoryItem = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(inventoryItemPayload.id);
    if (inventoryItem) {
      const updatedInventoryItem = await this.modelClass
        .query()
        .update({
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
        })
        .where({ id: inventoryItemPayload.id });
      return {
        success: true,
        message: 'InventoryItem details updated successfully.',
        data: updatedInventoryItem,
      };
    } else {
      return {
        success: false,
        message: 'No inventoryItem found.',
        data: {},
      };
    }
  }
  // Delete inventoryItem
  async deleteById(inventoryItemId: number, currentUser): Promise<ResponseData> {
    const inventoryItems = await this.modelClass
      .query()
      .delete()
      .where({
        brandCode: currentUser.brandCode,
        id: inventoryItemId
      });
    if (inventoryItems) {
      return {
        success: true,
        message: 'InventoryItem deleted successfully.',
        data: inventoryItems,
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

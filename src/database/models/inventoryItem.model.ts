import { BaseModel } from './base.model';
import { Model } from 'objection';

const tbName = 'inventoryItems'
export class InventoryItemModel extends BaseModel {
  static tableName = tbName;

  name: string
  description: string
  unitPrice: number
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
  brandCode: string

  static relationMappings = {
  };
}

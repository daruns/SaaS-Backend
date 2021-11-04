import { Injectable, Inject } from '@nestjs/common';
import { InventoryItemModel } from 'src/database/models/inventoryItem.model';
import { ModelClass } from 'objection';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class CurrenciesService {
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
}

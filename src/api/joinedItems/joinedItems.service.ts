import { Injectable, Inject } from '@nestjs/common';
import { ServiceItemModel } from 'src/database/models/serviceItem.model';
import { SubServiceItemModel } from 'src/database/models/subServiceItem.model';
import { InventoryItemModel } from 'src/database/models/inventoryItem.model';
import { NonInventoryItemModel } from 'src/database/models/nonInventoryItem.model';
import { ModelClass } from 'objection';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class JoinedItemsService {
  constructor(
    @Inject('NonInventoryItemModel') private nonInventoryItemClass: ModelClass<NonInventoryItemModel>,
    @Inject('InventoryItemModel') private inventoryItemModelClass: ModelClass<InventoryItemModel>,
    @Inject('SubServiceItemModel') private subServiceItemModelClass: ModelClass<SubServiceItemModel>,
    @Inject('ServiceItemModel') private serviceItemModelClass: ModelClass<ServiceItemModel>,
  ) {}

  async findAll(currentUser) {
    let result = []
    const inventoryItems = await this.inventoryItemModelClass.query()
    .select('name','id','description','unitPrice','qty')
    .where({ brandCode: currentUser.brandCode })
    const nonInventoryItems = await this.nonInventoryItemClass.query()
    .select('name','id','description','unitPrice','qty')
    .where({ brandCode: currentUser.brandCode })
    const serviceItems = await this.serviceItemModelClass.query()
    .select('name','id','description','unitPrice','qty')
    .where({ brandCode: currentUser.brandCode })
    .withGraphFetched(
      'subServiceItems(selectName)'
    )
    .modifiers({
      selectName(builder) {
        builder.select('name','id','description','unitPrice','qty');
      },
    });

    serviceItems.forEach(serv => {
      result.push({
        id: serv.id,
        name: serv.name,
        description: serv.description,
        unitePrice: serv.unitPrice,
        qty: 0,
        category: "serviceItem",
      })
      serv.subServiceItems.forEach(subServ => {
        result.push({
          id: serv.id,
          name: serv.name + ", " + subServ.name,
          description: serv.description,
          unitePrice: serv.unitPrice,
          qty: 0,
          category: "subServiceItem",
        })
  
      })
    })

    // return inventoryItems
    result = result.concat(inventoryItems.map(e => {
      return {
        id: e.id,
        name: e.name,
        unitePrice: e.unitPrice,
        qty: e.qty,
        category: "inventoryItem",
      }
    }))
    result = result.concat(nonInventoryItems.map(e => {
      return {
        id: e.id,
        name: e.name,
        unitePrice: e.unitPrice,
        qty: e.qty,
        category: "nonInventoryItem",
      }
    }))
    return {
      success: true,
      message: 'JoinedItem details of InventoryItems and NonInventoryItems and Services and SubServices fetch successfully.',
      data: result,
    };
  }
}

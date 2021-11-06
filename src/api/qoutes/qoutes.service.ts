import { Injectable, Inject } from '@nestjs/common';
import { QouteModel } from 'src/database/models/qoute.model';
import { QouteItemModel } from 'src/database/models/qouteItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { map } from 'rxjs/operators';
import { isIdentifier } from 'typescript';
import { CreateQouteDto, CreateQouteItemDto } from './dto/create-qoute.dto';
import { PassCreateQouteDto, PassCreateQouteItemDto } from './dto/passCreate-qoute.dto';
import { stringify } from 'querystring';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { throwError } from 'rxjs';
import { ClientsService } from '../clients/clients.service';
import { ClientContactsService } from '../clientContacts/clientContacts.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class QoutesService {
  constructor(
    @Inject('QouteModel') private modelClass: ModelClass<QouteModel>,
    // @Inject('QouteItemModel') private qouteItemModel: ModelClass<QouteItemModel>,
    private readonly inventoryItemsService: InventoryItemsService,
    private readonly nonInventoryItemsService: NonInventoryItemsService,
    private readonly serviceItemsService: ServiceItemsService,
    private readonly clientsSerive: ClientsService,
    private readonly clientContactsSerive: ClientContactsService,
  ) {}

  // qoute list
  async findAll(currentUser): Promise<ResponseData> {
    const qoutes = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .withGraphFetched({
      client: {},
      clientContact: {},
      qouteItems: {},
    });
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: qoutes,
    };
  }

  // find one qoute info by qouteId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const qoute = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
      .withGraphFetched({
        client: {},
        clientContact: {},
        qouteItems: {},
      });
    if (qoute) {
      return {
        success: true,
        message: 'Qoute details fetch successfully.',
        data: qoute,
      };
    } else {
      return {
        success: false,
        message: 'No qoute details found.',
        data: {},
      };
    }
  }

  // Create qoute before save encrypt password
  async create(payload, items: Array<CreateQouteItemDto>, currentUser): Promise<ResponseData> {
    const qoutePayload: PassCreateQouteDto = payload
    const qouteItemsPayload: CreateQouteItemDto[] = items
    if (!qouteItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }

    let result : any

    const trx = await this.modelClass.startTransaction()
    try {
      qoutePayload.qouteNumber = `QOUTE_${Number(new Date())}`
      qoutePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
      qoutePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
      qoutePayload.brandCode = currentUser.brandCode
      qoutePayload.createdBy = currentUser.username
      var subTotalAmount = 0
      const qouteItemsPayloadFinal = []
      for (let item of qouteItemsPayload) {
        var finalItem = {}
        let newItem: CreateQouteItemDto
        let id: number
        // check if the recieved items are belong to user or not,
        // and all categories are available?
        // this will reduce user missuses 
        if (item.category === "inventoryItem") {
          const found = await this.inventoryItemsService
          .findById(item.itemId,currentUser)
          if (!found.success) {
            throw "inventoryItem category not exist."
          } else {
            newItem = found.data
            id = found.data.id
            newItem.category = 'inventoryItem'
            if (typeof item.qty === "number") {
              newItem.qty = item.qty
            } else {
              throw 'quantity of qoute Item is required'
            }
          }
        } else if (item.category === "nonInventoryItem") {
          const found = await this.nonInventoryItemsService
          .findById(item.itemId,currentUser)
          if (!found.success) {
            throw "nonInventoryItem category not exist."
          } else {
            newItem = found.data
            id = found.data.id
            newItem.category = 'nonInventoryItem'
            newItem.qty = 1
          }
        } else if (item.category === "serviceItem") {
          const found = await this.serviceItemsService
          .findById(item.itemId,currentUser)
          if (!found.success) {
            throw "serviceItem category not exist."
          } else {
            newItem = found.data
            id = found.data.id
            newItem.category = 'serviceItem'
            newItem.qty = 1
          }
        } else {
          throw item.category.toString() + "item category is not valid."
        }
        
        finalItem['itemId'] = id
        finalItem['name'] = newItem.name
        finalItem['category'] = newItem.category
        finalItem['description'] = item.description ? item.description : newItem.description
        finalItem['brandCode'] = currentUser.brandCode
        finalItem['createdBy'] = currentUser.username
        finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : newItem.unitPrice
        finalItem['unitPrice'] = newItem.unitPrice
        finalItem['qty'] = newItem.qty
        finalItem['purchasedAt'] = newItem.purchasedAt
        finalItem['expireDate'] = newItem.expireDate
        finalItem['supplier'] = newItem.supplier
      
        subTotalAmount = subTotalAmount + (newItem.qty * newItem.unitPrice) // we avoid quantity in nonInventory and services Items
        qouteItemsPayloadFinal.push(finalItem)
      }
      var taxRate:number = subTotalAmount * qoutePayload.taxRate
      var discount:number = subTotalAmount * qoutePayload.discount
      qoutePayload.subTotalAmount = subTotalAmount
      qoutePayload.totalAmount = Number(parseFloat((subTotalAmount + taxRate - discount).toString()).toFixed(2))
      // start operation for adding qoutes and qouteItems with relatedQuery depending on parent
      const createdQoute = await this.modelClass.query(trx).insert(qoutePayload);
      for (let itemNoType of qouteItemsPayloadFinal) {
        const item: CreateQouteItemDto = itemNoType
        item.qouteId = createdQoute.id
        const insertedQouteItem = await createdQoute.$relatedQuery('qouteItems',trx)
        .insert(item)
        if (insertedQouteItem) {
          
          const invservnonItem = {qty: item.qty, id: item.itemId}
          if (item.category === "inventoryItem") {
            const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser)
            if (!reducedInventoryItem.success) throw reducedInventoryItem
          }
        } else {
            return {
              success: false,
              message: "couldnt insert qouteItem on incoice",
              data: insertedQouteItem,
            }
          }
      }
      
      await trx.commit();
      result = await this.modelClass.query()
      .findById(createdQoute.id)
      .withGraphFetched({
        client: {},
        clientContact: {},
        qouteItems: {},
      });
      return {
        success: true,
        message: 'Qoute created successfully.',
        data: result,
      };  
    } catch (err) {
      await trx.rollback();
      result = err
      return {
        success: false,
        message: `Something went wrong. Neither Qoute nor QouteItems were inserted.`,
        data: result,
      };
    }
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const qoutePayload = payload
    const qoute = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(qoutePayload.id);
    if (qoute) {
      if (qoutePayload.clientId) {
        const clientFnd = await this.clientsSerive.findById(qoutePayload.clientId,currentUser)
        console.log(clientFnd)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: {},
          };
        }
      }
      if (qoutePayload.clientContactId) {
        const clientContactFnd = await this.clientContactsSerive.findById(qoutePayload.clientId,currentUser)
        console.log(clientContactFnd)
        if (!clientContactFnd.success) {
          return {
            success: false,
            message: 'Client contact doesnt exist.',
            data: {},
          };
        }
      }

      const subTotalAmount = qoute.subTotalAmount
      const taxRate: number = qoutePayload.taxRate ? qoutePayload.taxRate : qoute.taxRate
      const discount: number = qoutePayload.discount ? qoutePayload.discount : qoute.discount
      console.log(subTotalAmount, taxRate, discount)
      const newTotalAmount: number = subTotalAmount + ( subTotalAmount * taxRate ) - ( subTotalAmount * discount )
      console.log(newTotalAmount)

      const updatedQoute = await this.modelClass.query()
        .update({
          dueDate: qoutePayload.dueDate ? qoutePayload.dueDate : qoute.dueDate,
          exchangeRate: qoutePayload.exchangeRate ? qoutePayload.exchangeRate : qoute.exchangeRate,
          taxRate: taxRate,
          discount: discount,
          totalAmount: Number(parseFloat(newTotalAmount.toString()).toFixed(2)),
          billingAddress: qoutePayload.billingAddress ? qoutePayload.billingAddress : qoute.billingAddress,
          clientId: qoutePayload.clientId ? qoutePayload.clientId : qoute.clientId,
          clientContactId: qoutePayload.clientContactId ? qoutePayload.clientContactId : qoute.clientContactId,
          description: qoutePayload.description ? qoutePayload.description : qoute.description,
          paymentMethod: qoutePayload.paymentMethod ? qoutePayload.paymentMethod : qoute.paymentMethod,
          currencyCode: qoutePayload.currencyCode ? qoutePayload.currencyCode : qoute.currencyCode,
          status: qoutePayload.status ? qoutePayload.status : qoute.status,
          deleted: qoutePayload.deleted ? qoutePayload.deleted : qoute.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: qoutePayload.id });
      return {
        success: true,
        message: 'Qoute details updated successfully.',
        data: updatedQoute,
      };
    } else {
      return {
        success: false,
        message: 'No qoute found.',
        data: {},
      };
    }
  }

  // Delete qoute
  async deleteById(qouteId: number, currentUser): Promise<ResponseData> {
    const qoutes = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .where({ id: qouteId })
      .delete()
    if (qoutes) {
      return {
        success: true,
        message: 'Qoute deleted successfully.',
        data: qoutes,
      };
    } else {
      return {
        success: false,
        message: 'No qoute found.',
        data: {},
      };
    }
  }
}

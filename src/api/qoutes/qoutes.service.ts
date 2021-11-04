import { Injectable, Inject } from '@nestjs/common';
import { QouteModel } from 'src/database/models/qoute.model';
import { QouteItemModel } from 'src/database/models/qouteItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { map } from 'rxjs/operators';
import { isIdentifier } from 'typescript';
import { CreateQouteDto, CreateQouteItemDto } from './dto/create-qoute.dto';
import { PassCreateQouteDto } from './dto/passCreate-qoute.dto';
import { stringify } from 'querystring';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { throwError } from 'rxjs';

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
      message: 'Qoute details fetch successfully.',
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
      qoutePayload.qouteNumber = `INVOICE_${Number(new Date())}`
      qoutePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
      qoutePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
      qoutePayload.brandCode = currentUser.brandCode
      qoutePayload.createdBy = currentUser.username
      var subTotalAmount = 0
      for (let item of qouteItemsPayload) {
        const typedItem: CreateQouteItemDto = item
        typedItem.purchasedAt = moment(typedItem.purchasedAt).toDate()
        typedItem.expireDate = moment(typedItem.expireDate).toDate()
        typedItem['createdBy'] = currentUser.username
        typedItem.brandCode = currentUser.brandCode
        typedItem.qouteId = 0
        console.log("typedItem")
        console.log(typedItem)
        // check if the recieved items are belong to user or not,
        // and all categories are available?
        // this will reduce user missuses 
        if (typedItem.category === "inventoryItem") {
          console.log(typedItem.qty)  
          const found = await this.inventoryItemsService
          .findById(typedItem.itemId,currentUser)
          if (!found.success) {
            throw "inventoryItem category not exist."
          }
          subTotalAmount = subTotalAmount + (typedItem.qty * typedItem.unitPrice)
        } else if (typedItem.category === "nonInventoryItem") {
          const found = await this.nonInventoryItemsService
          .findById(typedItem.itemId,currentUser)
          if (!found.success) {
            throw "nonInventoryItem category not exist."
          }
          subTotalAmount = subTotalAmount + typedItem.unitPrice // we avoid quantity in nonInventory and services Items
        } else if (typedItem.category === "serviceItem") {
          const found = await this.serviceItemsService
          .findById(typedItem.itemId,currentUser)
          if (!found.success) {
            throw "serviceItem category not exist."
          }
          subTotalAmount = subTotalAmount + typedItem.unitPrice // we avoid quantity in nonInventory and services Items
        } else {
          console.log("notfound")
          throw typedItem.category.toString() + "item category is not valid."
        }
        console.log(typedItem.unitPrice,subTotalAmount)
      }
      console.log(subTotalAmount)
      var taxRate:number = subTotalAmount * qoutePayload.taxRate
      var discount:number = subTotalAmount * qoutePayload.discount
      console.log(taxRate, discount)
      qoutePayload.totalAmount = (subTotalAmount + taxRate) + (subTotalAmount - discount)
      
      // start operation for adding qoutes and qouteItems with relatedQuery depending on parent
      const promises = []
      const createdQoute = await this.modelClass.query(trx).insert(qoutePayload);
      for (let itemNoType of qouteItemsPayload) {
        const item: CreateQouteItemDto = itemNoType
        item.qouteId = createdQoute.id
        const insertedQouteItem = await createdQoute.$relatedQuery('qouteItems',trx)
        .insert(item)
        if (insertedQouteItem) {
          
          const invservnonItem = {qty: item.qty, id: item.itemId}
          if (item.category === "inventoryItem") {
            console.log("invservnonItem")
            console.log(invservnonItem)
            const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser)
            console.log("reducedInventoryItem")  
            console.log(reducedInventoryItem)  
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
      const oldTotalamount = qoute.totalAmount
      const taxRate: number = qoutePayload.taxRate ? qoutePayload.taxRate : qoute.taxRate
      const discount: number = qoutePayload.discount ? qoutePayload.discount : qoute.discount
      const oldSubTotalAmount: number = oldTotalamount - (( oldTotalamount / qoute.taxRate ) - ( oldTotalamount / qoute.taxRate ))
      const newTotalAmount: number = oldSubTotalAmount + (( oldSubTotalAmount * taxRate ) - ( oldSubTotalAmount * discount ))
      const updatedQoute = await this.modelClass.query()
        .update({
          dueDate: qoutePayload.dueDate ? qoutePayload.dueDate : qoute.dueDate,
          exchangeRate: qoutePayload.exchangeRate ? qoutePayload.exchangeRate : qoute.exchangeRate,
          taxRate: taxRate,
          discount: discount,
          totalAmount: newTotalAmount,
          billingAddress: qoutePayload.billingAddress ? qoutePayload.billingAddress : qoute.billingAddress,
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

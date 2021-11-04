import { Injectable, Inject } from '@nestjs/common';
import { InvoiceModel } from 'src/database/models/invoice.model';
import { InvoiceItemModel } from 'src/database/models/invoiceItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { map } from 'rxjs/operators';
import { isIdentifier } from 'typescript';
import { CreateInvoiceDto, CreateInvoiceItemDto } from './dto/create-invoice.dto';
import { PassCreateInvoiceDto } from './dto/passCreate-invoice.dto';
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
export class InvoicesService {
  constructor(
    @Inject('InvoiceModel') private modelClass: ModelClass<InvoiceModel>,
    // @Inject('InvoiceItemModel') private invoiceItemModel: ModelClass<InvoiceItemModel>,
    private readonly inventoryItemsService: InventoryItemsService,
    private readonly nonInventoryItemsService: NonInventoryItemsService,
    private readonly serviceItemsService: ServiceItemsService,
  ) {}

  // invoice list
  async findAll(currentUser): Promise<ResponseData> {
    const invoices = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .withGraphFetched({
      client: {},
      clientContact: {},
      invoiceItems: {},
    });
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: invoices,
    };
  }

  // find one invoice info by invoiceId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const invoice = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
      .withGraphFetched({
        client: {},
        clientContact: {},
        invoiceItems: {},
      });
    if (invoice) {
      return {
        success: true,
        message: 'Invoice details fetch successfully.',
        data: invoice,
      };
    } else {
      return {
        success: false,
        message: 'No invoice details found.',
        data: {},
      };
    }
  }

  // Create invoice before save encrypt password
  async create(payload, items: Array<CreateInvoiceItemDto>, currentUser): Promise<ResponseData> {
    const invoicePayload: PassCreateInvoiceDto = payload
    const invoiceItemsPayload: CreateInvoiceItemDto[] = items
    if (!invoiceItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }

    let result : any

    const trx = await this.modelClass.startTransaction()
    try {
      invoicePayload.invoiceNumber = `INVOICE_${Number(new Date())}`
      invoicePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
      invoicePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
      invoicePayload.brandCode = currentUser.brandCode
      invoicePayload.createdBy = currentUser.username
      var subTotalAmount = 0
      for (let item of invoiceItemsPayload) {
        const typedItem: CreateInvoiceItemDto = item
        typedItem.purchasedAt = moment(typedItem.purchasedAt).toDate()
        typedItem.expireDate = moment(typedItem.expireDate).toDate()
        typedItem['createdBy'] = currentUser.username
        typedItem.brandCode = currentUser.brandCode
        typedItem.invoiceId = 0
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
      var taxRate:number = subTotalAmount * invoicePayload.taxRate
      var discount:number = subTotalAmount * invoicePayload.discount
      console.log(taxRate, discount)
      invoicePayload.totalAmount = (subTotalAmount + taxRate) + (subTotalAmount - discount)
      
      // start operation for adding invoices and invoiceItems with relatedQuery depending on parent
      const promises = []
      const createdInvoice = await this.modelClass.query(trx).insert(invoicePayload);
      for (let itemNoType of invoiceItemsPayload) {
        const item: CreateInvoiceItemDto = itemNoType
        item.invoiceId = createdInvoice.id
        const insertedInvoiceItem = await createdInvoice.$relatedQuery('invoiceItems',trx)
        .insert(item)
        if (insertedInvoiceItem) {
          
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
              message: "couldnt insert invoiceItem on incoice",
              data: insertedInvoiceItem,
            }
          }
      }
      
      await trx.commit();
      result = await this.modelClass.query()
      .findById(createdInvoice.id)
      .withGraphFetched({
        client: {},
        clientContact: {},
        invoiceItems: {},
      });
      return {
        success: true,
        message: 'Invoice created successfully.',
        data: result,
      };  
    } catch (err) {
      await trx.rollback();
      result = err
      return {
        success: false,
        message: `Something went wrong. Neither Invoice nor InvoiceItems were inserted.`,
        data: result,
      };
    }
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const invoicePayload = payload
    const invoice = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(invoicePayload.id);
    if (invoice) {
      const updatedInvoice = await this.modelClass.query()
        .update({
          dueDate: invoicePayload.dueDate ? invoicePayload.dueDate : invoice.dueDate,
          exchangeRate: invoicePayload.exchangeRate ? invoicePayload.exchangeRate : invoice.exchangeRate,
          taxRate: invoicePayload.taxRate ? invoicePayload.taxRate : invoice.taxRate,
          billingAddress: invoicePayload.billingAddress ? invoicePayload.billingAddress : invoice.billingAddress,
          description: invoicePayload.description ? invoicePayload.description : invoice.description,
          paymentMethod: invoicePayload.paymentMethod ? invoicePayload.paymentMethod : invoice.paymentMethod,
          currencyCode: invoicePayload.currencyCode ? invoicePayload.currencyCode : invoice.currencyCode,
          status: invoicePayload.status ? invoicePayload.status : invoice.status,
          deleted: invoicePayload.deleted ? invoicePayload.deleted : invoice.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: invoicePayload.id });
      return {
        success: true,
        message: 'Invoice details updated successfully.',
        data: updatedInvoice,
      };
    } else {
      return {
        success: false,
        message: 'No invoice found.',
        data: {},
      };
    }
  }

  // Delete invoice
  async deleteById(invoiceId: number, currentUser): Promise<ResponseData> {
    const invoices = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .where({ id: invoiceId })
      .delete()
    if (invoices) {
      return {
        success: true,
        message: 'Invoice deleted successfully.',
        data: invoices,
      };
    } else {
      return {
        success: false,
        message: 'No invoice found.',
        data: {},
      };
    }
  }
}

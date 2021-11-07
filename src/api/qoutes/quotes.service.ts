import { Injectable, Inject } from '@nestjs/common';
import { QuoteModel } from 'src/database/models/quote.model';
import { QuoteItemModel } from 'src/database/models/quoteItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { map } from 'rxjs/operators';
import { isIdentifier } from 'typescript';
import { CreateQuoteDto, CreateQuoteItemDto } from './dto/create-quote.dto';
import { PassCreateQuoteDto, PassCreateQuoteItemDto } from './dto/passCreate-quote.dto';
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
export class QuotesService {
  constructor(
    @Inject('QuoteModel') private modelClass: ModelClass<QuoteModel>,
    // @Inject('QuoteItemModel') private quoteItemModel: ModelClass<QuoteItemModel>,
    private readonly inventoryItemsService: InventoryItemsService,
    private readonly nonInventoryItemsService: NonInventoryItemsService,
    private readonly serviceItemsService: ServiceItemsService,
    private readonly clientsSerive: ClientsService,
    private readonly clientContactsSerive: ClientContactsService,
  ) {}

  // quote list
  async findAll(currentUser): Promise<ResponseData> {
    const quotes = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .withGraphFetched({
      client: {},
      clientContact: {},
      quoteItems: {},
    });
    return {
      success: true,
      message: 'Quotes details fetch successfully.',
      data: quotes,
    };
  }

  // find one quote info by quoteId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const quote = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
      .withGraphFetched({
        client: {},
        clientContact: {},
        quoteItems: {},
      });
    if (quote) {
      return {
        success: true,
        message: 'Quote details fetch successfully.',
        data: quote,
      };
    } else {
      return {
        success: false,
        message: 'No quote details found.',
        data: {},
      };
    }
  }

  // Create quote before save encrypt password
  async create(payload, items: Array<CreateQuoteItemDto>, currentUser): Promise<ResponseData> {
    const quotePayload: PassCreateQuoteDto = payload
    const quoteItemsPayload: CreateQuoteItemDto[] = items
    if (!quoteItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }

    let result : any

    const trx = await this.modelClass.startTransaction()
    try {
      quotePayload.quoteNumber = `QUOTE_${Number(new Date())}`
      quotePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
      quotePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
      quotePayload.brandCode = currentUser.brandCode
      quotePayload.createdBy = currentUser.username
      var subTotalAmount = 0
      const quoteItemsPayloadFinal = []
      for (let item of quoteItemsPayload) {
        var finalItem = {}
        let newItem: CreateQuoteItemDto
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
              throw 'quantity of quote Item is required'
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
        quoteItemsPayloadFinal.push(finalItem)
      }
      var taxRate:number = subTotalAmount * quotePayload.taxRate
      var discount:number = subTotalAmount * quotePayload.discount
      quotePayload.subTotalAmount = subTotalAmount
      quotePayload.totalAmount = Number(parseFloat((subTotalAmount + taxRate - discount).toString()).toFixed(2))
      // start operation for adding quotes and quoteItems with relatedQuery depending on parent
      const createdQuote = await this.modelClass.query(trx).insert(quotePayload);
      for (let itemNoType of quoteItemsPayloadFinal) {
        const item: CreateQuoteItemDto = itemNoType
        item.quoteId = createdQuote.id
        const insertedQuoteItem = await createdQuote.$relatedQuery('quoteItems',trx)
        .insert(item)
        if (insertedQuoteItem) {
          
          const invservnonItem = {qty: item.qty, id: item.itemId}
          if (item.category === "inventoryItem") {
            const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser)
            if (!reducedInventoryItem.success) throw reducedInventoryItem
          }
        } else {
            return {
              success: false,
              message: "couldnt insert quoteItem on incoice",
              data: insertedQuoteItem,
            }
          }
      }
      
      await trx.commit();
      result = await this.modelClass.query()
      .findById(createdQuote.id)
      .withGraphFetched({
        client: {},
        clientContact: {},
        quoteItems: {},
      });
      return {
        success: true,
        message: 'Quote created successfully.',
        data: result,
      };  
    } catch (err) {
      await trx.rollback();
      result = err
      return {
        success: false,
        message: `Something went wrong. Neither Quote nor QuoteItems were inserted.`,
        data: result,
      };
    }
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const quotePayload = payload
    const quote = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(quotePayload.id);
    if (quote) {
      if (quotePayload.clientId) {
        const clientFnd = await this.clientsSerive.findById(quotePayload.clientId,currentUser)
        console.log(clientFnd)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: {},
          };
        }
      }
      if (quotePayload.clientContactId) {
        const clientContactFnd = await this.clientContactsSerive.findById(quotePayload.clientId,currentUser)
        console.log(clientContactFnd)
        if (!clientContactFnd.success) {
          return {
            success: false,
            message: 'Client contact doesnt exist.',
            data: {},
          };
        }
      }

      const subTotalAmount = quote.subTotalAmount
      const taxRate: number = quotePayload.taxRate ? quotePayload.taxRate : quote.taxRate
      const discount: number = quotePayload.discount ? quotePayload.discount : quote.discount
      console.log(subTotalAmount, taxRate, discount)
      const newTotalAmount: number = subTotalAmount + ( subTotalAmount * taxRate ) - ( subTotalAmount * discount )
      console.log(newTotalAmount)

      const updatedQuote = await this.modelClass.query()
        .update({
          dueDate: quotePayload.dueDate ? quotePayload.dueDate : quote.dueDate,
          exchangeRate: quotePayload.exchangeRate ? quotePayload.exchangeRate : quote.exchangeRate,
          taxRate: taxRate,
          discount: discount,
          totalAmount: Number(parseFloat(newTotalAmount.toString()).toFixed(2)),
          billingAddress: quotePayload.billingAddress ? quotePayload.billingAddress : quote.billingAddress,
          clientId: quotePayload.clientId ? quotePayload.clientId : quote.clientId,
          clientContactId: quotePayload.clientContactId ? quotePayload.clientContactId : quote.clientContactId,
          description: quotePayload.description ? quotePayload.description : quote.description,
          paymentMethod: quotePayload.paymentMethod ? quotePayload.paymentMethod : quote.paymentMethod,
          currencyCode: quotePayload.currencyCode ? quotePayload.currencyCode : quote.currencyCode,
          status: quotePayload.status ? quotePayload.status : quote.status,
          deleted: quotePayload.deleted ? quotePayload.deleted : quote.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: quotePayload.id });
      return {
        success: true,
        message: 'Quote details updated successfully.',
        data: updatedQuote,
      };
    } else {
      return {
        success: false,
        message: 'No quote found.',
        data: {},
      };
    }
  }

  // Delete quote
  async deleteById(quoteId: number, currentUser): Promise<ResponseData> {
    const quotes = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .where({ id: quoteId })
      .delete()
    if (quotes) {
      return {
        success: true,
        message: 'Quote deleted successfully.',
        data: quotes,
      };
    } else {
      return {
        success: false,
        message: 'No quote found.',
        data: {},
      };
    }
  }
}

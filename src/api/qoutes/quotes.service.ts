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
import { SubServiceItemsService } from '../subServiceItems/subServiceItems.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class QuotesService {
  constructor(
    @Inject('QuoteModel') private modelClass: ModelClass<QuoteModel>,
    @Inject('QuoteItemModel') private quoteItemModel: ModelClass<QuoteItemModel>,
    private readonly inventoryItemsService: InventoryItemsService,
    private readonly nonInventoryItemsService: NonInventoryItemsService,
    private readonly serviceItemsService: ServiceItemsService,
    private readonly subServiceItemsService: SubServiceItemsService,
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
    quotePayload.quoteNumber = `INVOICE_${Number(new Date())}`
    quotePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
    quotePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
    quotePayload.brandCode = currentUser.brandCode
    quotePayload.createdBy = currentUser.username
    quotePayload.exchangeRate = quotePayload.exchangeRate | 1
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
          return {
            success: false,
            message: "inventoryItem category not exist.",
            data: {},
          }
        } else {
          newItem = found.data
          id = found.data.id
          newItem.category = 'inventoryItem'
          if (typeof item.qty === "number") {
            newItem.qty = item.qty
          } else {
            return {
              success: false,
              message: 'quantity of quote Item is required',
              data: {},
            }
          }
        }
      } else if (item.category === "nonInventoryItem") {
        const found = await this.nonInventoryItemsService
        .findById(item.itemId,currentUser)
        if (!found.success) {
          return {
            success: false,
            message: "nonInventoryItem category not exist.",
            data: {},
          }
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
          return {
            success: false,
            message: "serviceItem category not exist.",
            data: {},
          }
        } else {
          newItem = found.data
          id = found.data.id
          newItem.category = 'serviceItem'
          newItem.qty = 1
        }
      } else if (item.category === "subServiceItem") {
        const found = await this.subServiceItemsService
        .findById(item.itemId,currentUser)
        if (!found.success) {
          return {
            success: false,
            message: "subServiceItem category not exist.",
            data: {},
          }
        } else {
          newItem = found.data
          id = found.data.id
          newItem.category = 'subServiceItem'
          newItem.qty = 1
        }
      } else {
        return {
          success: false,
          message: item.category.toString() + "item category is not valid.",
          data: {},
        }
      }

      finalItem['itemId'] = id
      finalItem['name'] = newItem.name
      finalItem['category'] = newItem.category
      finalItem['description'] = item.description ? item.description : newItem.description
      finalItem['brandCode'] = currentUser.brandCode
      finalItem['createdBy'] = currentUser.username
      finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : newItem.unitPrice
      finalItem['qty'] = newItem.qty | 1
      finalItem['purchasedAt'] = newItem.purchasedAt
      finalItem['expireDate'] = newItem.expireDate
      finalItem['supplier'] = newItem.supplier

      subTotalAmount = Number(subTotalAmount) + Number(finalItem['qty'] * finalItem['unitPrice']) // we avoid quantity in nonInventory and services Items and subService items
      quoteItemsPayloadFinal.push(finalItem)
    }
    var taxRate:number = subTotalAmount * quotePayload.taxRate
    var discount:number = subTotalAmount * quotePayload.discount
    quotePayload.subTotalAmount = subTotalAmount
    let grandTotal = Number(subTotalAmount) + Number(taxRate)
    grandTotal = Number(grandTotal) - Number(discount)

    quotePayload.totalAmount = Number(parseFloat((Number(grandTotal)).toString()).toFixed(2))

    try {
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

  async update(payload, items: Array<CreateQuoteItemDto>, currentUser): Promise<ResponseData> {
    const quotePayload = payload
    const quoteItemsPayload: Array<CreateQuoteItemDto> = items
    if (!quoteItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }

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

      let result : any

      const trx = await this.modelClass.startTransaction()
      quotePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
      quotePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
      quotePayload.exchangeRate = quotePayload.exchangeRate
      var subTotalAmount = 0
      try {
        const deletedQuoteItems = await this.quoteItemModel.query(trx).where({quoteId: quote.id, brandCode: quote.brandCode}).delete()
        for (let item of quoteItemsPayload) {
          var finalItem = {}
          let newItem: CreateQuoteItemDto
          let id: number
          let foundReslt
          // check if the recieved items are belong to user or not,
          // and all categories are available?
          // this will reduce user missuses
          if (item.category === "inventoryItem") {
            const found = await this.inventoryItemsService
            .findById(item.itemId,currentUser)
            if (found.success) {
              newItem = found.data
              id = found.data.id
              newItem.category = 'inventoryItem'
              if (typeof item.qty === "number") {
                newItem.qty = item.qty
              } else {
                throw 'quantity of quote Item is required'
              }
            } else {foundReslt = found}
          } else if (item.category === "nonInventoryItem") {
            const found = await this.nonInventoryItemsService
            .findById(item.itemId,currentUser)
            if (found.success) {
              newItem = found.data
              id = found.data.id
              newItem.category = 'nonInventoryItem'
              newItem.qty = 1
            } else {foundReslt = found}
          } else if (item.category === "serviceItem") {
            const found = await this.serviceItemsService
            .findById(item.itemId,currentUser)
            if (found.success) {
              newItem = found.data
              id = found.data.id
              newItem.category = 'serviceItem'
              newItem.qty = 1
            } else {foundReslt = found}
          } else if (item.category === "subServiceItem") {
            const found = await this.subServiceItemsService
            .findById(item.itemId,currentUser)
            if (found.success) {
              newItem = found.data
              id = found.data.id
              newItem.category = 'subServiceItem'
              newItem.qty = 1
            } else {foundReslt = found}
          } else {
            throw item.category.toString() + "item category or subCategory is not valid."
          }
          if (foundReslt) throw foundReslt + " category not exist."

          finalItem['itemId'] = id
          finalItem['name'] = newItem.name
          finalItem['category'] = newItem.category
          finalItem['description'] = item.description ? item.description : newItem.description
          finalItem['brandCode'] = currentUser.brandCode
          finalItem['createdBy'] = currentUser.username
          finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : newItem.unitPrice
          finalItem['qty'] = newItem.qty
          finalItem['purchasedAt'] = newItem.purchasedAt
          finalItem['expireDate'] = newItem.expireDate
          finalItem['supplier'] = newItem.supplier
          finalItem['quoteId'] = quote.id

          const createdQuoteItem = await this.quoteItemModel.query(trx)
          .insert(finalItem);
          
          if (createdQuoteItem) {
            const invservnonItem = {qty: finalItem['qty'], id: finalItem['itemId']}
            if (item.category === "inventoryItem") {
              const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser)
              if (!reducedInventoryItem.success) throw reducedInventoryItem
            }
          } else {
            throw createdQuoteItem
          }
          if (newItem.qty !== 0) {
            subTotalAmount = subTotalAmount + Number(finalItem['qty'] * finalItem['unitPrice'])
          }

        }
        const prepTaxRate = quotePayload.taxRate ? quotePayload.taxRate : quote.taxRate
        const prepDiscount = quotePayload.discount ? quotePayload.discount : quote.discount
        const taxRate:number = subTotalAmount * prepTaxRate
        const discount:number = subTotalAmount * prepDiscount
        console.log(subTotalAmount, taxRate, discount)
        let grandTotal: number = Number(subTotalAmount) + Number(taxRate)
        grandTotal = Number(grandTotal) - Number(discount)
        console.log(grandTotal)
        const newTotalAmount: number = Number(parseFloat(grandTotal.toString()).toFixed(2))
        console.log(newTotalAmount)

        const updatedQuote = await this.modelClass.query(trx)
          .update({
            date: quotePayload.date ? quotePayload.date : quote.date,
            dueDate: quotePayload.dueDate ? quotePayload.dueDate : quote.dueDate,
            exchangeRate: quotePayload.exchangeRate ? quotePayload.exchangeRate : quote.exchangeRate,
            taxRate: prepTaxRate,
            discount: prepDiscount,
            subTotalAmount: subTotalAmount,
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
        await trx.commit();
        result = updatedQuote
        return {
          success: true,
          message: 'Quote details updated successfully',
          data: result,
        };  
      } catch (err) {
        await trx.rollback();
        result = err
        return {
          success: false,
          message: `Something went wrong. Neither Quote nor QuoteItems were updated.`,
          data: result,
        };
      }
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

import { Injectable, Inject } from '@nestjs/common';
import { InvoiceModel } from 'src/database/models/invoice.model';
import { InvoiceItemModel } from 'src/database/models/invoiceItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { CreateInvoiceDto, CreateInvoiceItemDto } from './dto/create-invoice.dto';
import { PassCreateInvoiceDto } from './dto/passCreate-invoice.dto';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { ClientsService } from '../clients/clients.service';
import { ClientContactsService } from '../clientContacts/clientContacts.service';
import { SubServiceItemsService } from '../subServiceItems/subServiceItems.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class InvoicesService {
  constructor(
    @Inject('InvoiceModel') private modelClass: ModelClass<InvoiceModel>,
    @Inject('InvoiceItemModel') private invoiceItemModel: ModelClass<InvoiceItemModel>,
    private readonly inventoryItemsService: InventoryItemsService,
    private readonly nonInventoryItemsService: NonInventoryItemsService,
    private readonly serviceItemsService: ServiceItemsService,
    private readonly subServiceItemsService: SubServiceItemsService,
    private readonly clientsSerive: ClientsService,
    private readonly clientContactsSerive: ClientContactsService,
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
      message: 'Invoices details fetch successfully.',
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
    //clients Columns
    if( payload.clientId ) {
      const clientFnd = await this.clientsSerive.findById(payload.clientId, currentUser)
      if (clientFnd.success) {
        invoicePayload['clientName'] = clientFnd.data.name
        invoicePayload['clientEmail'] = clientFnd.data.email
        invoicePayload['clientLogo'] = clientFnd.data.logo
        invoicePayload['clientClientType'] = clientFnd.data.clientType
        invoicePayload['clientBusinessType'] = clientFnd.data.businessType
        invoicePayload['clientAddress'] = clientFnd.data.address
        invoicePayload['clientPhoneNumbers'] = clientFnd.data.phoneNumbers
        invoicePayload['clientWebsite'] = clientFnd.data.website
        //clientContacts Columns
        if( payload.clientContactId ) {
          const clientContactFnd = await this.clientContactsSerive.findById(payload.clientId, currentUser)
          if (clientContactFnd.success) {
            invoicePayload['clientContactName'] = clientContactFnd.data.name
            invoicePayload['clientContactPosition'] = clientContactFnd.data.position
            invoicePayload['clientContactEmail'] = clientContactFnd.data.email
            invoicePayload['clientContactBusinessPhoneNumber1'] = clientContactFnd.data.businessPhoneNumber1
            invoicePayload['clientContactBusinessPhoneNumber2'] = clientContactFnd.data.businessPhoneNumber2
            invoicePayload['clientContactDescription'] = clientContactFnd.data.description
            invoicePayload['clientContactDepartment'] = clientContactFnd.data.department
          } else {
            return {
              success: false,
              message: 'Client not found',
              data: {}
            }
          }
        }  
      } else {
        return {
          success: false,
          message: 'Client not found',
          data: {}
        }
      }
    }
    //tax Columns
    invoicePayload['taxName'] = payload.taxName

    let result : any

    const trx = await this.modelClass.startTransaction()
    invoicePayload.invoiceNumber = `INVOICE_${Number(new Date())}`
    invoicePayload.date = payload.date
    invoicePayload.dueDate = payload.dueDate
    invoicePayload.brandCode = currentUser.brandCode
    invoicePayload.createdBy = currentUser.username
    invoicePayload.exchangeRate = invoicePayload.currencyCode === "USD" && !invoicePayload.exchangeRate ? 1 : (invoicePayload.exchangeRate || 1)
    var subTotalAmount = 0
    const invoiceItemsPayloadFinal = []
    for (let item of invoiceItemsPayload) {
      var finalItem = {}
      let newItem: CreateInvoiceItemDto
      let id: number
      // check if the recieved items are belong to user or not,
      // and all categories are available?
      // this will reduce user missuses
      if (item.itemId && item.category && typeof item.itemId === 'number' && typeof item.category === 'string') {
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
            newItem.supplier = item.supplier ? item.supplier : newItem.supplier
          } else {
              return {
                success: false,
                message: 'quantity of invoice Item is required',
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
            newItem.supplier = item.supplier ? item.supplier : newItem.supplier
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
            newItem.supplier = item.supplier ? item.supplier : newItem.supplier
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
            newItem.supplier = item.supplier ? item.supplier : newItem.supplier
          }
        } else {
          return {
            success: false,
            message: item.category.toString() + "item category is not valid.",
            data: {},
          }
        }
      } else {
        if ( !item.name || !item.qty || !item.unitPrice ) {
          return {
            success: false,
            message: "Other category params not exist.",
            data: {},
          }
        } else {
          id = null
          newItem = {
            invoiceId: null,
            brandCode: currentUser.brandCode,
            itemId: null,
            name: item.name,
            category: 'other',
            description: item.description,
            unitPrice: item.unitPrice,
            qty: item.qty,
            purchasedAt: new Date(),
            expireDate: new Date(),
            supplier: item.supplier ? item.supplier : '',
          }
          console.log('items:  --  ', newItem)
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
      invoiceItemsPayloadFinal.push(finalItem)
    }
    var taxRate:number = subTotalAmount * invoicePayload.taxRate
    var discount:number = subTotalAmount * invoicePayload.discount
    invoicePayload.subTotalAmount = subTotalAmount
    let grandTotal = Number(subTotalAmount) + Number(taxRate)
    grandTotal = Number(grandTotal) - Number(discount)

    invoicePayload.totalAmount = Number(parseFloat((Number(grandTotal)).toString()).toFixed(2))

    try {
      // start operation for adding invoices and invoiceItems with relatedQuery depending on parent
      const createdInvoice = await this.modelClass.query(trx).insert(invoicePayload);
      for (let itemNoType of invoiceItemsPayloadFinal) {
        const item: CreateInvoiceItemDto = itemNoType
        item.invoiceId = createdInvoice.id
        const insertedInvoiceItem = await createdInvoice.$relatedQuery('invoiceItems',trx)
        .insert(item)
        if (insertedInvoiceItem) {
          const invservnonItem = {qty: item.qty, id: item.itemId}
          if (item.category === "inventoryItem") {
            const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser)
            if (!reducedInventoryItem.success) throw reducedInventoryItem
          }
        } else {
          return {
            success: false,
            message: "couldnt insert invoiceItem on invoice",
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

  async update(payload, items: Array<CreateInvoiceItemDto>, currentUser): Promise<ResponseData> {
    const invoicePayload = payload
    const invoiceItemsPayload: Array<CreateInvoiceItemDto> = items
    if (!invoiceItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }
    const invoice = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(invoicePayload.id);
    if (invoice) {
      if (invoicePayload.clientId) {
        const clientFnd = await this.clientsSerive.findById(invoicePayload.clientId,currentUser)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: clientFnd.message,
          };
        }
      }
      if (invoicePayload.clientContactId) {
        const clientContactFnd = await this.clientContactsSerive.findById(invoicePayload.clientContactId,currentUser)
        if (!clientContactFnd.success) {
          return {
            success: false,
            message: 'Client contact doesnt exist.',
            data: clientContactFnd.message,
          };
        }
      }

      let result : any

      const trx = await this.modelClass.startTransaction()
      invoicePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
      invoicePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
      invoicePayload.exchangeRate = invoicePayload.exchangeRate
      var subTotalAmount = 0
      try {
        const deletedInvoiceItems = await this.invoiceItemModel.query(trx).where({invoiceId: invoice.id, brandCode: invoice.brandCode}).delete()
        for (let item of invoiceItemsPayload) {
          var finalItem = {}
          let newItem: CreateInvoiceItemDto
          let id: number
          let foundErrReslt;
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
                throw 'quantity of invoice Item is required'
              }
            } else {foundErrReslt = found}
          } else if (item.category === "nonInventoryItem") {
            const found = await this.nonInventoryItemsService
            .findById(item.itemId,currentUser)
            if (found.success) {
              newItem = found.data
              id = found.data.id
              newItem.category = 'nonInventoryItem'
              newItem.qty = 1
            } else {foundErrReslt = found}
          } else if (item.category === "serviceItem") {
            const found = await this.serviceItemsService
            .findById(item.itemId,currentUser)
            if (found.success) {
              newItem = found.data
              id = found.data.id
              newItem.category = 'serviceItem'
              newItem.qty = 1
            } else {foundErrReslt = found}
          } else if (item.category === "subServiceItem") {
            const found = await this.subServiceItemsService
            .findById(item.itemId,currentUser)
            if (found.success) {
              newItem = found.data
              id = found.data.id
              newItem.category = 'subServiceItem'
              newItem.qty = 1
            } else {foundErrReslt = found}
          } else {
            id = null
            newItem = {
              'invoiceId': invoice.id,
              'itemId': null,
              'name': item?.name,
              'description': item?.description,
              'category': 'other',
              'qty': item?.qty ? item?.qty : 1,
              'purchasedAt': new Date(),
              'expireDate': new Date(),
              'supplier': '',
              "brandCode": currentUser.brandCode,
              "unitPrice": item.unitPrice,
            }
          }
          if (foundErrReslt) throw foundErrReslt?.message + " category not exist."
          console.log('stage-throwCategory completed ',deletedInvoiceItems )

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
          finalItem['invoiceId'] = invoice.id

          const createdInvoiceItem = await this.invoiceItemModel.query(trx)
          .insert(finalItem);

          if (createdInvoiceItem) {
            const invservnonItem = {qty: finalItem['qty'], id: finalItem['itemId']}
            if (item.category === "inventoryItem") {
              const reducedInventoryItem = await this.inventoryItemsService.reduceItemQty(invservnonItem, currentUser)
              if (!reducedInventoryItem.success) throw reducedInventoryItem
            }
          } else {
            throw createdInvoiceItem
          }
          if (newItem.qty !== 0) {
            subTotalAmount = subTotalAmount + Number(finalItem['qty'] * finalItem['unitPrice'])
          }
        }
        console.log('stage-items completed ',subTotalAmount )
    
        const prepTaxRate = invoicePayload.taxRate ? invoicePayload.taxRate : invoice.taxRate
        const prepDiscount = invoicePayload.discount ? invoicePayload.discount : invoice.discount
        const taxRate:number = subTotalAmount * prepTaxRate
        const discount:number = subTotalAmount * prepDiscount
        let grandTotal: number = Number(subTotalAmount) + Number(taxRate)
        grandTotal = Number(grandTotal) - Number(discount)
        const newTotalAmount: number = Number(parseFloat(grandTotal.toString()).toFixed(2))
        console.log('stage-calculation completed ',newTotalAmount )

        const updatedInvoice = await this.modelClass.query(trx)
          .update({
            date: invoicePayload.date ? invoicePayload.date : invoice.date,
            dueDate: invoicePayload.dueDate ? invoicePayload.dueDate : invoice.dueDate,
            bankFee: invoicePayload.bankFee ? invoicePayload.bankFee : invoice.bankFee,
            exchangeRate: invoicePayload.exchangeRate ? invoicePayload.exchangeRate : invoice.exchangeRate,
            taxRate: prepTaxRate,
            discount: prepDiscount,
            subTotalAmount: subTotalAmount,
            totalAmount: Number(parseFloat(newTotalAmount.toString()).toFixed(2)),
            billingAddress: invoicePayload.billingAddress ? invoicePayload.billingAddress : invoice.billingAddress,
            clientId: invoicePayload.clientId ? invoicePayload.clientId : invoice.clientId,
            clientContactId: invoicePayload.clientContactId ? invoicePayload.clientContactId : invoice.clientContactId,
            description: invoicePayload.description ? invoicePayload.description : invoice.description,
            paymentMethodId: invoicePayload.paymentMethodId ? invoicePayload.paymentMethodId : invoice.paymentMethodId,
            currencyCode: invoicePayload.currencyCode ? invoicePayload.currencyCode : invoice.currencyCode,
            status: invoicePayload.status ? invoicePayload.status : invoice.status,
            deleted: invoicePayload.deleted ? invoicePayload.deleted : invoice.deleted,
            updatedBy: currentUser.username,
          })
          .where({ id: invoicePayload.id });
        console.log('stage-update completed ',updatedInvoice )
        await trx.commit();
        result = updatedInvoice
        return {
          success: true,
          message: 'Invoice details updated successfully',
          data: result,
        };
      } catch (err) {
        await trx.rollback();
        result = err
        return {
          success: false,
          message: `Something went wrong. Neither Invoice nor InvoiceItems were updated.`,
          data: result,
        };
      }
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

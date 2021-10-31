import { Injectable, Inject } from '@nestjs/common';
import { InvoiceModel } from 'src/database/models/invoice.model';
import { InvoiceItemModel } from 'src/database/models/invoiceItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { map } from 'rxjs/operators';
import { isIdentifier } from 'typescript';

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
  async create(payload, items, currentUser): Promise<ResponseData> {
    const invoicePayload = payload
    const invoiceItemsPayload = items
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
      invoicePayload.expiryDate = moment(payload.expiryDate).format('YYYY-MM-DD HH:mm:ss').toString()
      invoicePayload.brandCode = currentUser.brandCode
      invoicePayload.clientContactId = payload.clientContactId
      invoicePayload.clientId = payload.clientId
      invoicePayload.billingAddress = payload.billingAddress
      invoicePayload.status = payload.status
      invoicePayload.currencyCode = payload.currencyCode
      invoicePayload.exchangeRate = payload.exchangeRate
      invoicePayload.taxRatio = payload.taxRatio
      invoicePayload.discount = payload.discount
      invoicePayload.createdBy = currentUser.username
      invoicePayload.totalAmount = 0
      var itemTotal = 0
      invoiceItemsPayload.map(item => {
        item.purchasedAt = moment(item.purchasedAt).format('YYYY-MM-DD HH:mm:ss').toString()
        item.expiryDate = moment(item.expiryDate).format('YYYY-MM-DD HH:mm:ss').toString()
        item.brandCode = currentUser.brandCode
        item.invoiceId = 0
        itemTotal = itemTotal + (item.qty * item.unitPrice)
      });
      invoicePayload.totalAmount = invoicePayload.totalAmount * invoicePayload.taxRatio
      invoicePayload.totalAmount = invoicePayload.totalAmount * invoicePayload.exchangeRate
      invoicePayload.totalAmount = invoicePayload.totalAmount * invoicePayload.discount
      
      const createdInvoice = await this.modelClass.query(trx).insert(invoicePayload);
      await invoiceItemsPayload.forEach(async (item) => {
        item.invoiceId = createdInvoice.id
          await this.invoiceItemModel.query().insert(item)
      });
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
        data: err,
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
          expiryDate: invoicePayload.expiryDate ? invoicePayload.expiryDate : invoice.expiryDate,
          exchangeRate: invoicePayload.exchangeRate ? invoicePayload.exchangeRate : invoice.exchangeRate,
          taxRatio: invoicePayload.taxRatio ? invoicePayload.taxRatio : invoice.taxRatio,
          billingAddress: invoicePayload.billingAddress ? invoicePayload.billingAddress : invoice.billingAddress,
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
      .delete()
      .where({ id: invoiceId });
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

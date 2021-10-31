import { Injectable, Inject } from '@nestjs/common';
import { QouteModel } from 'src/database/models/qoute.model';
import { QouteItemModel } from 'src/database/models/qouteItem.model';
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
export class QoutesService {
  constructor(
    @Inject('QouteModel') private modelClass: ModelClass<QouteModel>,
    @Inject('QouteItemModel') private qouteItemModel: ModelClass<QouteItemModel>,
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
  async create(payload, items, currentUser): Promise<ResponseData> {
    const qoutePayload = payload
    const qouteItemsPayload = items
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
      qoutePayload.expiryDate = moment(payload.expiryDate).format('YYYY-MM-DD HH:mm:ss').toString()
      qoutePayload.brandCode = currentUser.brandCode
      qoutePayload.clientContactId = payload.clientContactId
      qoutePayload.clientId = payload.clientId
      qoutePayload.billingAddress = payload.billingAddress
      qoutePayload.status = payload.status
      qoutePayload.currencyCode = payload.currencyCode
      qoutePayload.exchangeRate = payload.exchangeRate
      qoutePayload.taxRatio = payload.taxRatio
      qoutePayload.discount = payload.discount
      qoutePayload.createdBy = currentUser.username
      qoutePayload.totalAmount = 0
      var itemTotal = 0
      qouteItemsPayload.map(item => {
        item.purchasedAt = moment(item.purchasedAt).format('YYYY-MM-DD HH:mm:ss').toString()
        item.expiryDate = moment(item.expiryDate).format('YYYY-MM-DD HH:mm:ss').toString()
        item.brandCode = currentUser.brandCode
        item.qouteId = 0
        itemTotal = itemTotal + (item.qty * item.unitPrice)
      });
      qoutePayload.totalAmount = qoutePayload.totalAmount * qoutePayload.taxRatio
      qoutePayload.totalAmount = qoutePayload.totalAmount * qoutePayload.exchangeRate
      qoutePayload.totalAmount = qoutePayload.totalAmount * qoutePayload.discount
      
      const createdQoute = await this.modelClass.query(trx).insert(qoutePayload);
      await qouteItemsPayload.forEach(async (item) => {
        item.qouteId = createdQoute.id
          await this.qouteItemModel.query().insert(item)
      });
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
        data: err,
      };
    }
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const qoutePayload = payload
    const qoute = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(qoutePayload.id);
    if (qoute) {
      const updatedQoute = await this.modelClass.query()
        .update({
          expiryDate: qoutePayload.expiryDate ? qoutePayload.expiryDate : qoute.expiryDate,
          exchangeRate: qoutePayload.exchangeRate ? qoutePayload.exchangeRate : qoute.exchangeRate,
          taxRatio: qoutePayload.taxRatio ? qoutePayload.taxRatio : qoute.taxRatio,
          billingAddress: qoutePayload.billingAddress ? qoutePayload.billingAddress : qoute.billingAddress,
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
      .delete()
      .where({ id: qouteId });
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

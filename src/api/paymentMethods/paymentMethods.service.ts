import { Injectable, Inject } from '@nestjs/common';
import { PaymentMethodModel } from 'src/database/models/paymentMethod.model';
import { ModelClass } from 'objection';
import { CreateUserDto } from '../auth/apps/users/dto/create-user.dto';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class PaymentMethodsService {
  constructor(
    @Inject('PaymentMethodModel') private modelClass: ModelClass<PaymentMethodModel>,
  ) {}

  // paymentMethod list
  async findAll(currentUser): Promise<ResponseData> {
    const paymentMethods = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'PaymentMethods details fetch successfully.',
      data: paymentMethods,
    };
  }

  // find one paymentMethod info by paymentMethodId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const paymentMethod = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (paymentMethod) {
      return {
        success: true,
        message: 'PaymentMethod details fetch successfully.',
        data: paymentMethod,
      };
    } else {
      return {
        success: false,
        message: 'No paymentMethod details found.',
        data: {},
      };
    }
  }

  // Create paymentMethod before save encrypt password
  async create(payload: CreatePaymentMethodDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const paymentMethodPayload = payload
    const newPaymentMethod = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: paymentMethodPayload.name
    })
    if (!newPaymentMethod) {
      paymentMethodPayload['createdBy'] = currentUser.username
      paymentMethodPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(paymentMethodPayload);
      const createPaymentMethod = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'PaymentMethod created successfully.',
        data: createPaymentMethod,
      };
    } else {
      return {
        success: false,
        message: 'PaymentMethod already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdatePaymentMethodDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const paymentMethodPayload = payload
    const paymentMethod = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(paymentMethodPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (paymentMethod) {
      const updatedPaymentMethod = await this.modelClass
        .query()
        .update({
          name: paymentMethodPayload.name ? paymentMethodPayload.name : paymentMethod.name,
          type: paymentMethodPayload.type ? paymentMethodPayload.type : paymentMethod.type,
          description: paymentMethodPayload.description ? paymentMethodPayload.description : paymentMethod.description,
          expireDate: paymentMethodPayload.expireDate ? paymentMethodPayload.expireDate : paymentMethod.expireDate,
          pin: paymentMethodPayload.pin ? paymentMethodPayload.pin : paymentMethod.pin,
          cvs: paymentMethodPayload.cvs ? paymentMethodPayload.cvs : paymentMethod.cvs,
          status: paymentMethodPayload.status ? paymentMethodPayload.status : paymentMethod.status,
          // deleted: paymentMethodPayload.deleted ? paymentMethodPayload.deleted : paymentMethod.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: paymentMethodPayload.id });
      return {
        success: true,
        message: 'PaymentMethod details updated successfully.',
        data: updatedPaymentMethod,
      };
    } else {
      return {
        success: false,
        message: 'No paymentMethod found.',
        data: {},
      };
    }
  }

  // Delete paymentMethod
  async deleteById(paymentMethodId: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const paymentMethods = await this.modelClass.query()
      .where({
        brandCode: CUser.brandCode,
        id: paymentMethodId
      })
      .delete()
    if (paymentMethods) {
      return {
        success: true,
        message: 'PaymentMethod deleted successfully.',
        data: paymentMethods,
      };
    } else {
      return {
        success: false,
        message: 'No paymentMethod found.',
        data: {},
      };
    }
  }
}

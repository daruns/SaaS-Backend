import { Injectable, Inject } from '@nestjs/common';
import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';
import { Client } from 'knex';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ClientsService {
  constructor(@Inject('ClientModel') private modelClass: ModelClass<ClientModel>) {}

  // client list
  async findAll(): Promise<ResponseData> {
    const clients = await this.modelClass.query()
    return {
      success: true,
      message: 'Client details fetch successfully.',
      data: clients,
    };
  }

  // find one client info by clientId
  async findById(id: number): Promise<ResponseData> {
    const client = await this.modelClass
      .query()
      .findById(id)
    if (client) {
      return {
        success: true,
        message: 'Client details fetch successfully.',
        data: client,
      };
    } else {
      return {
        success: true,
        message: 'No client details found.',
        data: {},
      };
    }
  }
  // Create client before save encrypt password
  async create(payload) {
    const newClient = await this.modelClass.query().findOne({
      email: payload.email,
    });
    if (!newClient) {
      const identifiers = await this.modelClass.query().insert(payload);
      const createClient = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'Client created successfully.',
        data: createClient,
      };
    } else {
      return {
        success: false,
        message: 'Client already exists with this email address!!!',
        data: {},
      };
    }
  }
  async update(payload): Promise<ResponseData> {
    const client = await this.modelClass.query().findById(payload.id);
    if (client) {
      const updatedClient = await this.modelClass
        .query()
        .update({
          name: payload.name ? payload.name : client.name,
          logo: payload.logo ? payload.logo : client.logo,
          phoneNumbers: payload.phoneNumbers ? payload.phoneNumbers : client.phoneNumbers,
          phoneNumber1: payload.phoneNumber1 ? payload.phoneNumber1 : client.phoneNumber1,
          phoneNumber2: payload.phoneNumber2 ? payload.phoneNumber2 : client.phoneNumber2,
          clientType: payload.clientType ? payload.clientType : client.clientType,
          businessType: payload.businessType ? payload.businessType : client.businessType,
          email: payload.email ? payload.email : client.email,
          website: payload.website ? payload.website : client.website,
          address: payload.address ? payload.address : client.address,
          rate: payload.rate ? payload.rate : client.rate,
          zipCode: payload.zipCode ? payload.zipCode : client.zipCode,
          status: payload.status ? payload.status : client.status,
          deleted: payload.deleted ? payload.deleted : client.deleted,
          createdBy: payload.createdBy ? payload.createdBy : client.createdBy,
          updatedBy: payload.updatedBy ? payload.updatedBy : client.updatedBy,
          userId: payload.userId ? payload.userId : client.userId,
        })
        .where({ id: payload.clientId });
      return {
        success: true,
        message: 'Client details updated successfully.',
        data: updatedClient,
      };
    } else {
      return {
        success: true,
        message: 'No client found.',
        data: {},
      };
    }
  }
    // Delete client
    async deleteById(clientId: number): Promise<ResponseData> {
      const clients = await this.modelClass
        .query()
        .delete()
        .where({ id: clientId });
      if (clients) {
        return {
          success: true,
          message: 'Client deleted successfully.',
          data: clients,
        };
      } else {
        return {
          success: false,
          message: 'No client found.',
          data: {},
        };
      }
    }
  
}

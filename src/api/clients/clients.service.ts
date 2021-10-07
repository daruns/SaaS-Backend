import { Injectable, Inject } from '@nestjs/common';
import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';

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
    const client = await this.modelClass.query().findById(payload.clientId);
    if (client) {
      const updatedClient = await this.modelClass
        .query()
        .update({
          name: payload.name ? payload.name : client.name,
          phoneNumber: payload.phoneNumber ? payload.phoneNumber : client.phoneNumber,
          businessPhoneNumber1: payload.businessPhoneNumber1 ? payload.businessPhoneNumber1 : client.businessPhoneNumber1,
          businessPhoneNumber2: payload.businessPhoneNumber2 ? payload.businessPhoneNumber2 : client.businessPhoneNumber2,
          email: payload.email ? payload.email : client.email,
          website: payload.website ? payload.website : client.website,
          address: payload.address ? payload.address : client.address,
          rate: payload.rate ? payload.rate : client.rate,
          status: payload.status ? payload.status : client.status,
          description: payload.description ? payload.description : client.description,
          clientType: payload.clientType ? payload.clientType : client.clientType,
          businessType: payload.businessType ? payload.businessType : client.businessType,
          deleted: payload.deleted ? payload.deleted : client.deleted,
          createdBy: payload.createdBy ? payload.createdBy : client.createdBy,
          updatedBy: payload.updatedBy ? payload.updatedBy : client.updatedBy,
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

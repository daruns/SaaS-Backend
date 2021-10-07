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
}

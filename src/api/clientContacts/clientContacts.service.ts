import { Injectable, Inject } from '@nestjs/common';
import { ClientContactModel } from 'src/database/models/clientContact.model';
import { ModelClass } from 'objection';
import { ClientsService } from '../clients/clients.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ClientContactsService {
  constructor(
    @Inject('ClientContactModel') private modelClass: ModelClass<ClientContactModel>,
    @Inject('ClientsService') private clientSerive: ClientsService,
  ) {}

  // clientContact list
  async findAll(currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const clientContacts = await this.modelClass.query()
    .select('clientContacts.*')
    .join('users', 'users.id', 'clientContacts.userId')
    .where('users.brand_code', CUser.brandCode)
    return {
      success: true,
      message: 'ClientContact details fetch successfully.',
      data: clientContacts,
    };
  }

  // find one clientContact info by clientContactId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const clientContact = await this.modelClass
      .query()
      .select('clientContacts.*')
      .join('users', 'users.id', 'clientContacts.userId')
      .where('users.brand_code', CUser.brandCode)
      .findById(id)
    if (clientContact) {
      return {
        success: true,
        message: 'ClientContact details fetch successfully.',
        data: clientContact,
      };
    } else {
      return {
        success: true,
        message: 'No clientContact details found.',
        data: {},
      };
    }
  }
  // Create clientContact before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    // restrict to the client that belongs to brand or user ## IMPORTANT TODO
    let clientContactPayload = payload
    const newClientContact = await this.modelClass.query()
    .where({
      email: clientContactPayload.email
    })
    if (!newClientContact.length) {
      if (clientContactPayload.clientId) {
        const clientFnd = await this.clientSerive.findById(clientContactPayload.clientId,currentUser)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: {},
          };
        }
      }

      clientContactPayload.userId = currentUser.id
      clientContactPayload.createdBy = currentUser.username
      const identifiers = await this.modelClass.query().insert(clientContactPayload);
      const createClientContact = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'ClientContact created successfully.',
        data: createClientContact,
      };
    } else {
      return {
        success: false,
        message: 'ClientContact already exists with this email address!!!',
        data: {},
      };
    }
  }
  async update(payload, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const clientContactPayload = payload
    const clientContact = await this.modelClass.query().findById(clientContactPayload.id);
    if (clientContact) {
      if (clientContactPayload.clientId) {
        const clientFnd = await this.clientSerive.findById(clientContactPayload.clientId,CUser)
        console.log(clientFnd)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: {},
          };
        }
      }

      const updatedClientContact = await this.modelClass
        .query()
        .select('clientContacts.*')
        .join('users', 'users.id', 'clientContacts.userId')
        .where('users.brand_code', CUser.brandCode)  
        .update({
          name: clientContactPayload.name ? clientContactPayload.name : clientContact.name,
          businessPhoneNumber1: clientContactPayload.businessPhoneNumber1 ? clientContactPayload.businessPhoneNumber1 : clientContact.businessPhoneNumber1,
          businessPhoneNumber2: clientContactPayload.businessPhoneNumber2 ? clientContactPayload.businessPhoneNumber2 : clientContact.businessPhoneNumber2,
          email: clientContactPayload.email ? clientContactPayload.email : clientContact.email,
          position: clientContactPayload.position ? clientContactPayload.position : clientContact.position,
          description: clientContactPayload.description ? clientContactPayload.description : clientContact.description,
          department: clientContactPayload.department ? clientContactPayload.department : clientContact.department,
          status: clientContactPayload.status ? clientContactPayload.status : clientContact.status,
          deleted: clientContactPayload.deleted ? clientContactPayload.deleted : clientContact.deleted,
          updatedBy: currentUser.username,
          userId: clientContactPayload.userId ? clientContactPayload.userId : clientContact.userId,
          clientId: clientContactPayload.clientId ? clientContactPayload.clientId : clientContact.clientId,
        })
        .where({ id: clientContactPayload.id });
      return {
        success: true,
        message: 'ClientContact details updated successfully.',
        data: updatedClientContact,
      };
    } else {
      return {
        success: true,
        message: 'No clientContact found.',
        data: {},
      };
    }
  }
  // Delete clientContact
  async deleteById(clientContactId: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const clientContacts = await this.modelClass
      .query()
      .select('clientContacts.*')
      .join('users', 'users.id', 'clientContacts.userId')
      .where('users.brand_code', CUser.brandCode)
      .delete()
      .where({ id: clientContactId });
    if (clientContacts) {
      return {
        success: true,
        message: 'ClientContact deleted successfully.',
        data: clientContacts,
      };
    } else {
      return {
        success: false,
        message: 'No clientContact found.',
        data: {},
      };
    }
  }
}

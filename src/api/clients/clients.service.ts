import { Injectable, Inject } from '@nestjs/common';
import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { ResponseData } from 'src/app/app.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientUserDto } from './dto/create-client-user.dto';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('ClientModel') private modelClass: ModelClass<ClientModel>,
    @Inject('UserModel') private userClass: ModelClass<UserModel>,
    private readonly usersService: UsersService,
  ) {}

  // client list
  async findAll(currentUser): Promise<ResponseData> {
    const CUser = await this.getUserById(currentUser.id)
    const clients = await this.modelClass
      .query()
      .select('clients.*')
      .join('users', 'clients.userId', 'users.id')
      .where('users.subdomain', CUser.subdomain)
      .withGraphFetched({
        user: true,
        clientContacts: {},
        meetings: {},
        socialMedias: {},
      });
    if (clients.length) {
      return {
        success: true,
        message: 'Client details fetch successfully.',
        data: clients,
      };
    } else {
      return {
        success: true,
        message: 'No clients details found.',
        data: {},
      };
    }
  }

  // find one client info by id
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = await this.getUserById(currentUser.id)
    const client = await this.modelClass
      .query()
      .select('users.*', 'clients.*')
      .join('users', 'clients.userId', 'users.id')
      .where('users.subdomain', CUser.subdomain)
      .findById(id)
      .withGraphFetched({
        clientContacts: {},
        meetings: {},
        socialMedias: {},
      });
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
  // Create client
  async create(payload, user, currentUser): Promise<ResponseData> {
    const CUser = await this.getUserById(currentUser.id)
    const newClient = await this.modelClass.query()
    .findOne({email: payload.email})
    const userParams = user
    if (!newClient) {
      let result : any

      const trx = await this.modelClass.startTransaction()
      try {
        userParams.userType = 'partner'
        userParams.name = payload.name
        userParams.email = payload.email
        userParams.subdomain = CUser.subdomain
        userParams.phoneNumber = payload.phoneNumber1
        userParams.createdBy = CUser.username
        userParams.reportsTo = CUser.username

        // const createdUser = await this.usersService.create(userParams);
        const createdUser = await this.userClass.query(trx).insert(userParams);

        let newparamspayload = {
        name : payload.name,
        phoneNumbers : payload.phoneNumbers,
        phoneNumber1 : payload.phoneNumber1,
        phoneNumber2 : payload.phoneNumber2,
        clientType : payload.clientType,
        businessType : payload.businessType,
        email : payload.email,
        website : payload.website,
        address : payload.address,
        rate : payload.rate,
        zipCode : payload.zipCode,
        status : "active",
        createdBy : CUser.username,
        userId : createdUser.id,
        }
        const createdClient = await createdUser
          .$relatedQuery('clients', trx)
          .insert(newparamspayload);
        const identifier = await this.modelClass.query(trx).findById(createdClient.id).withGraphFetched({
          user: {},
        });
        await trx.commit();

        result = identifier
        console.log('Client and User created successfully');
        return {
          success: true,
          message: 'Client created successfully.',
          data: result,
        };  
      } catch (err) {
        await trx.rollback();
        console.log(`Something went wrong. Neither Jennifer nor Scrappy were inserted\n ${err}`);
        result = err
        return {
          success: false,
          message: `Something went wrong. Neither Client nor User were inserted.`,
          data: err,
        };
      }
    } else {
      return {
        success: false,
        message: 'Client already exists with this email address!!!',
        data: {},
      };
    }
  }
  async update(payload,currentUser): Promise<ResponseData> {
    const client = await this.modelClass.query().findById(payload.id);
    if (client) {
      const updatedClient = await this.modelClass
        .query()
        .update({
          name: payload.name ? payload.name : client.name,
          logo: payload.logo ? payload.logo : client.logo,
          phoneNumbers: payload.phoneNumbers ? payload.phoneNumbers : client.phoneNumbers,
          clientType: payload.clientType ? payload.clientType : client.clientType,
          businessType: payload.businessType ? payload.businessType : client.businessType,
          // email: payload.email ? payload.email : client.email,
          website: payload.website ? payload.website : client.website,
          address: payload.address ? payload.address : client.address,
          rate: payload.rate ? payload.rate : client.rate,
          zipCode: payload.zipCode ? payload.zipCode : client.zipCode,
          status: payload.status ? payload.status : client.status,
          deleted: payload.deleted ? payload.deleted : client.deleted,
          updatedBy: payload.updatedBy ? payload.updatedBy : client.updatedBy,
          userId: payload.userId ? payload.userId : client.userId,
        })
        .where({ id: payload.id });
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
  async deleteById(payload: {id: number}, currentUser): Promise<ResponseData> {
    const clients = await this.modelClass
      .query()
      .delete()
      .where({ id: payload })
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

  async getUserById(id:number) {
    const CUser = await this.usersService.findById(id)
    return CUser.data
  }
  
}

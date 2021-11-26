import { Injectable, Inject } from '@nestjs/common';
import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { ResponseData } from 'src/app/app.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientUserDto } from './dto/create-client-user.dto';
import { UserModel } from 'src/database/models/user.model';
import { UpdateClientUserDto } from './dto/update-client-user.dto';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('ClientModel') private modelClass: ModelClass<ClientModel>,
    @Inject('UserModel') private userClass: ModelClass<UserModel>,
    private readonly usersService: UsersService,
  ) {}

  // client list
  async findAll(currentUser): Promise<ResponseData> {
    const clients = await this.modelClass
      .query()
      .where({ brandCode: currentUser.brandCode })
      .withGraphFetched({
        user: {},
        clientContacts: {},
        meetings: {},
        socialMedias: {},
      });
    clients.map(e => {delete e.user.password})
    if (clients.length) {
      return {
        success: true,
        message: 'Client details fetch successfully.',
        data: clients,
      };
    } else {
      return {
        success: false,
        message: 'No clients details found.',
        data: {},
      };
    }
  }

  // find one client info by id
  async findById(id: number, currentUser): Promise<ResponseData> {
    const client = await this.modelClass
      .query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .withGraphFetched({
        user: {},
        clientContacts: {},
        meetings: {},
        socialMedias: {},
      });
    // delete client.user.password
    if (client) {
      return {
        success: true,
        message: 'Client details fetch successfully.',
        data: client,
      };
    } else {
      return {
        success: false,
        message: 'No client details found.',
        data: {},
      };
    }
  }

  // Create client
  async create(payload, currentUser): Promise<ResponseData> {
    const newClient = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({email: payload.email})
    const userEmail = await this.userClass.query().findOne({email: payload.email})
    if (userEmail) {
      return {
        success: false,
        message: 'User Already exist with this email address.',
        data: {},
      };
    }

    payload.clientType = payload.clientType.toLowerCase()
    if (!newClient) {
      let result : any
      let newparamspayload = {
        name : payload.name,
        phoneNumbers : payload.phoneNumbers,
        clientType : payload.clientType,
        businessType : payload.businessType,
        email : payload.email,
        website : payload.website,
        address : payload.address,
        rate : payload.rate,
        zipCode : payload.zipCode,
        status : "active",
        createdBy : currentUser.username,
        brandCode: currentUser.brandCode,
      }

      const trx = await this.modelClass.startTransaction()
      try {
        var createdClient = await this.modelClass.query(trx).insert(newparamspayload)
        const identifier = await this.modelClass.query(trx).findById(createdClient.id)
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
        console.log(`Something went wrong. Client couldnt be inserted\n ${err}`);
        result = err
        return {
          success: false,
          message: `Something went wrong. Client couldnt be inserted.`,
          data: err,
        };
      }
    } else {
      return {
        success: false,
        message: 'Client already exists with this email address!',
        data: {},
      };
    }
  }

  async update(payload,currentUser): Promise<ResponseData> {
    const client = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(payload.id);
    if (client) {
      const updatedClient = await this.modelClass
        .query()
        .update({
          name: payload.name ? payload.name : client.name,
          logo: payload.logo ? payload.logo : client.logo,
          phoneNumbers: payload.phoneNumbers ? payload.phoneNumbers : client.phoneNumbers,
          clientType: payload.clientType ? payload.clientType : client.clientType,
          businessType: payload.businessType ? payload.businessType : client.businessType,
          website: payload.website ? payload.website : client.website,
          address: payload.address ? payload.address : client.address,
          rate: payload.rate ? payload.rate : client.rate,
          zipCode: payload.zipCode ? payload.zipCode : client.zipCode,
          status: payload.status ? payload.status : client.status,
          deleted: payload.deleted ? payload.deleted : client.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: payload.id });
      return {
        success: true,
        message: 'Client details updated successfully.',
        data: updatedClient,
      };
    } else {
      return {
        success: false,
        message: 'No client found.',
        data: {},
      };
    }
  }

  // addUser client
  async addUser(payload: CreateClientUserDto, currentUser): Promise<ResponseData> {
    const client = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(payload.id);
    if (client) {
      const userEmail = await this.userClass.query().findOne({email: client.email})
      if (userEmail) {
        return {
          success: false,
          message: 'User Already exist with this Email address.',
          data: {},
        }
      }
      const userUsername = await this.userClass.query().findOne({username: payload.username})
      if (userUsername) {
        return {
          success: false,
          message: 'User Already exist with this Username address.',
          data: {},
        };
      }
      const userParams:CreateClientUserDto = payload
      delete userParams.id
      userParams.avatar = client.logo
      userParams.phoneNumber = client.phoneNumbers
      userParams.createdBy = currentUser.username
      userParams.brandCode = currentUser.brandCode
      userParams.reportsTo = currentUser.username
      userParams.email = client.email
      // userParams.userType = 'partner' already initiallized from CreateClientUserDto dto its fixed cant be changed
      const trx = await this.modelClass.startTransaction()
      try {
        const createdUser = await this.userClass.query(trx).insert(userParams)
        await this.modelClass.query(trx).findById(client.id).update({userId: createdUser.id})
        await trx.commit()
        console.log(createdUser)
        return {
          success: true,
          message: "Client User added successfully",
          data: {}
        }
      } catch (error) {
        trx.rollback()
        return {
          success: false,
          message: "AddUser: error occured during adding user to the client!",
          data: error,
        }
      }
    } else {
      return {
        success: false,
        message: "Client doenst exist",
        data: {}
      }
    }
  }

  // editUser client
  async editUser(payload: UpdateClientUserDto, currentUser): Promise<ResponseData> {
    console.log(payload)
    const client = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(payload.id)
    .withGraphFetched({user:true});
    delete client.user.password
    if (client) {
      const userDataById = await this.userClass.query().findById(client.user.id)
      if (!userDataById) {
        return {
          success: false,
          message: 'User Doesnt exist with for this Client.',
          data: {},
        }
      }
      console.log(userDataById)
      let userParams:UpdateClientUserDto = {

        id: userDataById.id,
        updatedBy: currentUser.username,
        name: payload.name ? payload.name : userDataById.name,
        password: payload.password,
        reportsTo: payload.reportsTo ? payload.reportsTo : userDataById.reportsTo,
        status: payload.status ? payload.status : userDataById.status,
      }
      var updatedUser = await this.usersService.update(userParams,currentUser)
      if (!updatedUser.success) {
        return {
          success: false,
          message: updatedUser.message,
          data: updatedUser.data,
        }
      }
      console.log(updatedUser)
      return {
        success: true,
        message: "Client User updated successfully",
        data: {}
      }
    } else {
      return {
        success: false,
        message: "Client doenst exist",
        data: {}
      }
    }
  }

  // Delete client
  async deleteById(payload: {id: number}, currentUser): Promise<ResponseData> {
    const clients = await this.modelClass
      .query()
      .findOne({
        brandCode: currentUser.brandCode,
        id: payload
      })
      .delete();
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

import { Injectable, Inject } from '@nestjs/common';
import { SocialMediaModel } from 'src/database/models/socialMedia.model';
import { ModelClass } from 'objection';
import { ClientsService } from '../clients/clients.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class SocialMediasService {
  constructor(
    @Inject('SocialMediaModel') private modelClass: ModelClass<SocialMediaModel>,
    @Inject('ClientsService') private clientSerive: ClientsService,
  ) {}

  // socialMedia list
  async findAll(currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const socialMedias = await this.modelClass.query()
    .select('socialMedias.*')
    .join('users', 'users.id', 'socialMedias.userId')
    .where('users.brand_code', CUser.brandCode)
    return {
      success: true,
      message: 'SocialMedia details fetch successfully.',
      data: socialMedias,
    };
  }

  // find one socialMedia info by socialMediaId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const socialMedia = await this.modelClass
      .query()
      .select('socialMedias.*')
      .join('users', 'users.id', 'socialMedias.userId')
      .where('users.brand_code', CUser.brandCode)  
      .findById(id)
    if (socialMedia) {
      return {
        success: true,
        message: 'SocialMedia details fetch successfully.',
        data: socialMedia,
      };
    } else {
      return {
        success: true,
        message: 'No socialMedia details found.',
        data: {},
      };
    }
  }
  // Create socialMedia before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    let socialMediaPayload = payload
    const newSocialMedia = await this.modelClass.query()
    .select('socialMedias.*')
    .join('users', 'users.id', 'socialMedias.userId')
    .where('users.brand_code', CUser.brandCode)
    .where({
      linkAddress: socialMediaPayload.linkAddress,
      clientId: socialMediaPayload.clientId
    })
    if (!newSocialMedia.length) {
      if (socialMediaPayload.clientId) {
        const clientFnd = await this.clientSerive.findById(socialMediaPayload.clientId,currentUser)
        console.log(clientFnd.data)
        if (!clientFnd.data.id) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: {},
          };
        }
      }

      socialMediaPayload.createdBy = currentUser.username
      socialMediaPayload.userId = currentUser.id
      const identifiers = await this.modelClass.query().insert(socialMediaPayload);
      const createSocialMedia = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'SocialMedia created successfully.',
        data: createSocialMedia,
      };
    } else {
      return {
        success: false,
        message: 'SocialMedia already exists with this link address address!!!',
        data: {},
      };
    }
  }
  async update(payload, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    let socialMediaPayload = payload
    const socialMedia = await this.modelClass.query()
    .select('socialMedias.*')
    .join('users', 'users.id', 'socialMedias.userId')
    .where('users.brand_code', CUser.brandCode)
    .findById(socialMediaPayload.id);
    if (socialMedia) {
      if (socialMediaPayload.clientId) {
        const clientFnd = await this.clientSerive.findById(socialMediaPayload.clientId,CUser)
        if (!clientFnd.data.id) {
          return {
            success: false,
            message: 'Client doesnt exist.',
            data: {},
          };
        }
      }

      const updatedSocialMedia = await this.modelClass
        .query()
        .update({
          name: socialMediaPayload.name ? socialMediaPayload.name : socialMedia.name,  
          linkAddress: socialMediaPayload.linkAddress ? socialMediaPayload.linkAddress : socialMedia.linkAddress,
          addressDomain: socialMediaPayload.addressDomain ? socialMediaPayload.addressDomain : socialMedia.addressDomain,
          status: socialMediaPayload.status ? socialMediaPayload.status : socialMedia.status,
          deleted: socialMediaPayload.deleted ? socialMediaPayload.deleted : socialMedia.deleted,
          updatedBy: CUser.username,
          userId: CUser.id,
          clientId: socialMediaPayload.clientId ? socialMediaPayload.clientId : socialMedia.clientId,
        })
        .where({ id: socialMediaPayload.id });
      return {
        success: true,
        message: 'SocialMedia details updated successfully.',
        data: updatedSocialMedia,
      };
    } else {
      return {
        success: true,
        message: 'No socialMedia found.',
        data: {},
      };
    }
  }
  // Delete socialMedia
  async deleteById(socialMediaId: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const socialMedias = await this.modelClass
      .query()
      .select('socialMedias.*')
      .join('users', 'users.id', 'socialMedias.userId')
      .where('users.brand_code', CUser.brandCode)  
      .delete()
      .where({ id: socialMediaId });
    if (socialMedias) {
      return {
        success: true,
        message: 'SocialMedia deleted successfully.',
        data: socialMedias,
      };
    } else {
      return {
        success: false,
        message: 'No socialMedia found.',
        data: {},
      };
    }
  }
}

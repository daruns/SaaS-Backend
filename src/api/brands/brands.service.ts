import { Injectable, Inject, UseGuards, Req } from '@nestjs/common';
import { BrandModel } from 'src/database/models/brand.model';
import { ModelClass } from 'objection';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import * as _ from "lodash";
export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@UseGuards(JwtAuthGuard)
@Injectable()
export class BrandsService {
  constructor(
    @Inject('BrandModel') private modelClass: ModelClass<BrandModel>,
    ) {}

  // brand list with list of posts and comments on post
  async findAll(): Promise<ResponseData> {
    const users = await this.modelClass.query().withGraphFetched({
      users: {}
    });
    return {
      success: true,
      message: 'Brand details fetch successfully.',
      data: users,
    };
  }

  // find one brand info by brandId with posts data
  async findById(id: number): Promise<ResponseData> {
    const brand = await this.modelClass
      .query()
      // .where({subdomain: currentBrand.subdomain})
      .findById(id)
      .withGraphFetched({
        users: {}
      });
    if (brand) {
      return {
        success: true,
        message: 'Brand details fetch successfully.',
        data: brand,
      };
    } else {
      return {
        success: true,
        message: 'No brand details found.',
        data: {},
      };
    }
  }
  // find one brand info by brandname with posts data
  async findByBrandCode(brandCode: string): Promise<ResponseData> {
    const brand = await this.modelClass
      .query()
      .findOne({brandCode: brandCode})
      .withGraphFetched({
        users: {}
      });
    if (brand) {
      return {
        success: true,
        message: 'Brand details fetch successfully.',
        data: brand,
      };
    } else {
      return {
        success: true,
        message: 'No brand details found.',
        data: {},
      };
    }
  }
  // Create brand before save encrypt password
  async create(payload): Promise<ResponseData> {
    const brandCode = _.camelCase(payload.subdomain);

    const newBrand = await this.modelClass.query().where({
      brandCode: brandCode
    });
    if (!newBrand.length) {
      // payload.createdBy = @Req().brand.brandname
      try {
        payload.brandCode = brandCode
        const identifiers = await this.modelClass.query().insert(payload);
        const createBrand = await this.modelClass.query().findById(identifiers.id);
        return {
          success: true,
          message: 'Brand created successfully.',
          data: createBrand,
        }
      } catch(err) {
        return {
          success: false,
          message: 'Brand didnt created',
          data: (err.nativeError && err.nativeError.sqlMessage) ? err.nativeError.sqlMessage : err,
        }
      }
    } else {
      return {
        success: false,
        message: 'Brand already exists with this brandCode and Name!',
        data: {},
      };
    }
  }

  // Update brand before save encrypt password
  async update(payload): Promise<ResponseData> {
    const brand = await this.modelClass.query().findById(payload.id);
    if (brand) {
      const updatedBrand = await this.modelClass
        .query()
        .update({
          brandCode: payload.brandCode ? payload.brandCode : brand.brandCode,
          subdomain: payload.subdomain ? payload.subdomain : brand.subdomain,
          name: payload.name ? payload.name : brand.name,
          logo: payload.logo ? payload.logo : brand.logo,
          companySize: payload.companySize ? payload.companySize : brand.companySize,
          address: payload.address ? payload.address : brand.address,
          announcedAt: payload.announcedAt ? payload.announcedAt : brand.announcedAt,
          branches: payload.branches ? payload.branches : brand.branches,
          occupation: payload.occupation ? payload.occupation : brand.occupation,
          website: payload.website ? payload.website : brand.website,
          phoneNumber: payload.phoneNumber ? payload.phoneNumber : brand.phoneNumber,
          email: payload.email ? payload.email : brand.email,
        })
        .where({ id: payload.id });
      return {
        success: true,
        message: 'Brand details updated successfully.',
        data: updatedBrand,
      };
    } else {
      return {
        success: false,
        message: 'No brand found.',
        data: {},
      };
    }
  }

  // Delete brand before save encrypt password
  async delete(payload): Promise<ResponseData> {
    const brand = await this.modelClass
      .query()
      .delete()
      .where({ id: payload.id });
    if (brand) {
      return {
        success: true,
        message: 'Brand deleted successfully.',
        data: brand,
      };
    } else {
      return {
        success: false,
        message: 'No brand found.',
        data: {},
      };
    }
  }
}

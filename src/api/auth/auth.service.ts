import { Inject, Injectable, Logger, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/api/auth/dto/signup.dto';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { QueryAuthUser } from './dto/query-auth-user.dto';
import { BrandsService } from '../brands/brands.service';
import { UserLayers } from './dto/user-layers.dto'
import { CreateBrandDto } from 'src/api/brands/dto/create-brand.dto';
import { CreateUserDto } from './apps/users/dto/create-user.dto';
import { query } from 'express';
import { EditProfileDto } from './dto/editProfile.dto';
import { BoardModel } from 'src/database/models/board.model';
import { BoardAttributeModel } from 'src/database/models/boardAttribute.model';
import { ModelClass } from 'objection';
import { FileUploadService } from 'src/app/app.service';
import BrandModel from 'src/database/models/brand.model';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('BoardModel') private boardModelClass: ModelClass<BoardModel>,
    @Inject('BoardAttributeModel') private boardAttributeClass: ModelClass<BoardAttributeModel>,
    @Inject('BrandModel') private brandModel: ModelClass<BrandModel>,
    private fileUploadService: FileUploadService,
    private brandService: BrandsService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(signupDto: SignupDto): Promise<ResponseData> {
    const createBrandDto = {
      subdomain: signupDto.subdomain,
    }
    const createBrand = await this.brandService.create(createBrandDto)
    if (createBrand.success){

      const createUserDto = {
        username: signupDto.username,
        password: signupDto.password,
        email: signupDto.email,
        brandCode: createBrand.data.brandCode,
        name: signupDto.username,
        userType: UserLayers.layerOne,
      }
        const createUser  = await this.usersService.create(createUserDto)
        delete createUser.data.password
        // dummy data
        const finishedPending = await this.boardModelClass.query().insert({name:'Pending', description: '', brandCode: createUser.data.brandCode, createdBy: createUser.data.username, userId: createUser.data.id})
        await this.boardAttributeClass.query().insert({color: 'yellow', position: 1, userId: createUser.data.id, brandCode: createUser.data.brandCode, createdBy: createUser.data.username, boardId: finishedPending.id})
        const finishedInProgress = await this.boardModelClass.query().insert({name:'In-Progress', description: '', brandCode: createUser.data.brandCode, createdBy: createUser.data.username, userId: createUser.data.id})
        await this.boardAttributeClass.query().insert({color: 'blue', position: 2, userId: createUser.data.id, brandCode: createUser.data.brandCode, createdBy: createUser.data.username, boardId: finishedInProgress.id})
        const finishedcompleted = await this.boardModelClass.query().insert({name:'completed', description: '', brandCode: createUser.data.brandCode, createdBy: createUser.data.username, userId: createUser.data.id})
        await this.boardAttributeClass.query().insert({color: 'green', position: 3, userId: createUser.data.id, brandCode: createUser.data.brandCode, createdBy: createUser.data.username, boardId: finishedcompleted.id})

        return createUser
    } else {
      return createBrand
    }
  }

  async editProfile(editProfileDto: EditProfileDto, currentUser): Promise<ResponseData> {
    const userFound = await this.usersService.findById(currentUser.id)
    if (userFound.success && userFound.data.brandCode === currentUser.brandCode){
      editProfileDto['id'] = currentUser.id
      if (editProfileDto.password === "") delete editProfileDto.password
      const createUser = await this.usersService.update(editProfileDto,currentUser)
      if (createUser.success) {
        return {
          success: true,
          message: "Your Profile Changed Successfully",
          data: {}
        }
      } else {
        return createUser
      }
    } else {
      return {
        success: false,
        message: "Your Profile Not Found!",
        data: {}
      }
    }
  }

  // Update brand before save encrypt password
  async editBrand(payload, currentUser): Promise<ResponseData> {
    const brand = await this.brandModel.query().findOne({brandCode: currentUser.brandCode})
    if (payload.logo) {
      const logoUploaded = payload.logo
      const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "logos", currentUser)
      if (fileUploaded.success) {
        console.log(fileUploaded.data)
        payload.logo = fileUploaded.data.url
      } else return fileUploaded
    }
    if (brand) {
      const updatedBrand = await this.brandModel
        .query()
        .where({brandCode: currentUser.brandCode})
        .update({
          // subdomain: payload.subdomain ? payload.subdomain : brand.subdomain,
          name: payload.name ? payload.name : brand.name,
          companySize: payload.companySize ? payload.companySize : brand.companySize,
          address: payload.address ? payload.address : brand.address,
          logo: payload.logo ? payload.logo : brand.logo,
          announcedAt: payload.announcedAt ? payload.announcedAt : brand.announcedAt,
          branches: payload.branches ? payload.branches : brand.branches,
          occupation: payload.occupation ? payload.occupation : brand.occupation,
          website: payload.website ? payload.website : brand.website,
          phoneNumber: payload.phoneNumber ? payload.phoneNumber : brand.phoneNumber,
          email: payload.email ? payload.email : brand.email,
          updatedBy: currentUser.username,
        })
        .where({ id: currentUser.brand?.id });
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

  async signIn(user): Promise<ResponseData> {
    if (!user.id) {throw new UnauthorizedException()}
    const payload = {
      id: user.id,
      username: user.username,
      brandCode: user.brandCode,
    };
    console.log("------------- SIGNIN------------")
    console.log(payload)
    console.log("------------- SIGNIN------------")
    return {
      success: true,
      message: 'User signed in successfully.',
      data: {
        user,
        accessToken: this.jwtService.sign(payload)},
    };
  }

  async validateUser(username: string, pass: string): Promise<Record<null,QueryAuthUser>> {
    const queryUser = await this.usersService.findByUsername(username);
    // const queryUser = await this.usersService.findByEmail(email);
    const user = queryUser.data
    if (!queryUser.success) {
      return null;
    }
    const valid = await bcrypt.compare(pass, user.password);
    delete(user.password)

    if (valid) {
      return user;
    }
    return null;
  }

  async me(id: number) {
    if (typeof id !== 'number') {
      return null
    } else {
      const queryUser = await this.usersService.findById(id);
      if (queryUser.success) {
        const user = queryUser.data;
        return user;
      }
    }
    return null
  }
}


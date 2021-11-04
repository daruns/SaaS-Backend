import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/api/auth/dto/signup.dto';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { QueryAuthUser } from './dto/query-auth-user.dto';
import { BrandsService } from '../brands/brands.service';
import { CreateBrandDto } from 'src/api/brands/dto/create-brand.dto';
import { CreateUserDto } from './apps/users/dto/create-user.dto';
import { query } from 'express';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@Injectable()
export class AuthService {
  constructor(
    private brandService: BrandsService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(signupDto: SignupDto): Promise<ResponseData> {
    const createBrandDto = {
      subdomain: signupDto.subdomain,
    }
    const createBrand = await this.brandService.create(createBrandDto)
    console.log("brandif")
    if (createBrand.success){
      console.log("brandinif")

      const createUserDto = {
        username: signupDto.username,
        password: signupDto.password,
        email: signupDto.email,
        brandCode: createBrand.data.brandCode,
        name: signupDto.username,
        userType: 'owner',
      }
        const createUser  = await this.usersService.create(createUserDto)
        delete createUser.data.password
        console.log("finished")
        return createUser
    } else {
      return createBrand
    }
  }

  async signIn(user): Promise<ResponseData> {
    
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
    const queryUser = await this.usersService.findById(id);
    if (queryUser.success) {
      const user = queryUser.data;
      return user;
    } else {
      return null
    }
  }
}


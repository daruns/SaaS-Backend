import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { QueryAuthUser } from './dto/query-auth-user.dto';
import { AuthUserDto } from "./dto/auth-user.dto";

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signUp(authCredentialsDto: CreateUserDto): Promise<ResponseData> {
    const { password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    authCredentialsDto.password = hashedPassword;
    const createUser  = await this.usersService.create(authCredentialsDto)
    delete createUser.data.password
    return createUser
  }

  async signIn(user): Promise<ResponseData> {

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      website: user.website,
      avatar: user.avatar,
      subdomain: user.subdomain,
      userType: user.userType,
      department: user.department,
      reportsTo: user.reportsTo,
    };

    console.log("------------- SIGNIN------------")
    console.log(payload)
    console.log("------------- SIGNIN------------")
    return {
      success: true,
      message: 'User signed in successfully.',
      data: {accessToken: this.jwtService.sign(payload)},
    };
  }

  async validateUser(username: string, pass: string): Promise<Record<null,QueryAuthUser>> {
    const queryUser = await this.usersService.findByUsername(username);
    // const queryUser = await this.usersService.findByEmail(email);
    const user = queryUser.data
    if (!user.id) {
      return null;
    }
    const valid = bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }
    return null;
  }
}


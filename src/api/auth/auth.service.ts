import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/database/models/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

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
    const { username, password, email, phoneNumber } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    authCredentialsDto.password = hashedPassword;
    const newUser = await this.usersService.findByUsername(authCredentialsDto.username);
    
    if (!newUser.data.id) {
      const createUser  = await this.usersService.create(authCredentialsDto)
      return {
        success: true,
        message: 'User created successfully.',
        data: createUser.data,
      };
    } else {
      return {
        success: false,
        message: 'User already exists with this email address!!!',
        data: {},
      };
    }

  }

  async signIn(user): Promise<ResponseData> {

    const payload = await this.usersService.findByUsername(user.username);
    // const payload = { username: user.username, sub: user._id, email: user.email, phoneNumber: user.phoneNumber, subdomain: user.subdomain };
    console.log("-------------payload------------")
    console.log(user)
    console.log("-------------payload------------")
    return {
      success: true,
      message: 'User signed in successfully.',
      data: {accessToken: this.jwtService.sign(payload)},
    };
  }

  async validateUser(username: string, pass: string): Promise<UserModel> {
    const user = await this.usersService.findByUsername(username);
    if (!user.data.id) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.data.password);

    if (valid) {
      return user.data;
    }

    return null;
  }
}

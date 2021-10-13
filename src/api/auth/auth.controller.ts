import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    ValidationPipe,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { CreateUserDto } from '../users/dto/create-user.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  
  export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
  }
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('/signup')
    async signUp(
      @Body(ValidationPipe) createUserDto: CreateUserDto
    ) {
        const savedUser = await this.authService.signUp(createUserDto);
        return savedUser
    }
  
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
      return this.authService.signIn(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
      return req.user;
    }
  }
  
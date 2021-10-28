import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UseGuards,
    ValidationPipe,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { CreateUserDto } from 'src/api/auth/apps/users/dto/create-user.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import { SignupDto } from './dto/signup.dto';

  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    async signUp( @Body(ValidationPipe) signupDto ) {
      console.log(signupDto)
        const savedUser = await this.authService.signUp(signupDto);
        return savedUser
    }
  
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
      return await this.authService.signIn(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Request() req) {
      const myUser = await this.authService.me(req.user.id);
      delete myUser.password
      return myUser;
    }
  }
  
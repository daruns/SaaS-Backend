import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { CreateUserDto } from 'src/api/auth/apps/users/dto/create-user.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import { SignupDto } from './dto/signup.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/app/app.service';

  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp( @Body(ValidationPipe) signupDto ) {
        const savedUser = await this.authService.signUp(signupDto);
        return savedUser
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
      return await this.authService.signIn(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('editProfile')
    @UseInterceptors(FileInterceptor("avatar", { fileFilter: imageFileFilter}))
    async editProfile( @Body(ValidationPipe) editProfileDto: EditProfileDto,@UploadedFile() file: Express.Multer.File, @Req() req) {
      if (!req.user.id) throw new UnauthorizedException()
      console.log(file)
      editProfileDto.avatar = file
      const myUser = await this.authService.editProfile(editProfileDto, req.user);
      return myUser;
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Request() req) {
      if (!req.user.id) throw new UnauthorizedException()
      const myUser = await this.authService.me(req.user.id);
      delete myUser.password
      return myUser;
    }
  }
  
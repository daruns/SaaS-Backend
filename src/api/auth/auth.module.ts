import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { BrandsService } from 'src/api/brands/brands.service';
import { FileUploadService } from 'src/app/app.service';
// import { BrandModel } from 'src/database/models/brand.model';
// import { BrandsModule } from '../brands/brands.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '604800s' },
      // privateKey: process.env.KEY_PRIVATEKEY,
      // publicKey: process.env.KEY_PUBLICKEY,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, BrandsService, FileUploadService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

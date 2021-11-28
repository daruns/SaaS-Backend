import { Module } from '@nestjs/common';
import { UsersModule } from 'src/api/auth/apps/users/users.module';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { FileUploadService } from 'src/app/app.service';
import { BrandsModule } from '../brands/brands.module';
import { BrandsService } from '../brands/brands.service';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService,UsersService,BrandsService, FileUploadService],
  exports: [ClientsService, UsersService, FileUploadService],
})
export class ClientsModule {}

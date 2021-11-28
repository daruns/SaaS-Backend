import { Module } from '@nestjs/common';
import { BrandsModule } from 'src/api/brands/brands.module';
import { BrandsService } from 'src/api/brands/brands.service';
import { FileUploadService } from 'src/app/app.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,BrandsService, FileUploadService],
  exports: [UsersService, FileUploadService],
})
export class UsersModule {}

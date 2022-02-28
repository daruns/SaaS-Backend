import { Module } from '@nestjs/common';
import { UsersModule } from 'src/api/auth/apps/users/users.module';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { FileUploadService } from 'src/app/app.service';
import { BrandsModule } from '../brands/brands.module';
import { BrandsService } from '../brands/brands.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService,UsersService,BrandsService, FileUploadService],
  exports: [EmployeesService, UsersService, FileUploadService],
})
export class EmployeesModule {}

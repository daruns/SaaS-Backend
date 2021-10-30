import { Module } from '@nestjs/common';
import { BrandsModule } from 'src/api/brands/brands.module';
import { BrandsService } from 'src/api/brands/brands.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,BrandsService ],
  exports: [UsersService],
})
export class UsersModule {}

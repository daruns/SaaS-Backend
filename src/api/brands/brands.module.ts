import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { FileUploadService } from 'src/app/app.service';

@Module({
  controllers: [BrandsController],
  providers: [FileUploadService,
    BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}

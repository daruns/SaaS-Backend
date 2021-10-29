import { Module } from '@nestjs/common';
import { ServiceItemsController } from './serviceItems.controller';
import { ServiceItemsService } from './serviceItems.service';

@Module({
  controllers: [ServiceItemsController],
  providers: [ServiceItemsService],
})
export class ServiceItemsMdoule {}

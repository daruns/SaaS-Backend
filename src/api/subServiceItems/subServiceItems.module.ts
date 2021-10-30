import { Module } from '@nestjs/common';
import { ServiceItemsModule } from '../serviceItems/serviceItems.module';
import { SubServiceItemsController } from './subServiceItems.controller';
import { SubServiceItemsService } from './subServiceItems.service';

@Module({
  imports: [ServiceItemsModule],
  controllers: [SubServiceItemsController],
  providers: [SubServiceItemsService],
})
export class SubServiceItemsModule {}

import { Module } from '@nestjs/common';
import { JoinedItemsController } from './joinedItems.controller';
import { JoinedItemsService } from './joinedItems.service';

@Module({
  controllers: [JoinedItemsController],
  providers: [JoinedItemsService],
})
export class JoinedItemsModule {}

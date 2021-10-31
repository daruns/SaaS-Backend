import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { QoutesController } from './qoutes.controller';
import { QoutesService } from './qoutes.service';

@Module({
  imports: [ClientsModule],
  controllers: [QoutesController],
  providers: [QoutesService],
})
export class QoutesModule {}

import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { SocialMediasController } from './socialMedias.controller';
import { SocialMediasService } from './socialMedias.service';

@Module({
  imports: [ClientsModule],
  controllers: [SocialMediasController],
  providers: [SocialMediasService],
})
export class SocialMediasModule {}

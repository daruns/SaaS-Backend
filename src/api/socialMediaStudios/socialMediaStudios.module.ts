import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { SocialMediaStudiosController } from './socialMediaStudios.controller';
import { SocialMediaStudiosService } from './socialMediaStudios.service';

@Module({
  imports: [ClientsModule],
  controllers: [SocialMediaStudiosController],
  providers: [SocialMediaStudiosService],
})
export class SocialMediaStudiosModule {}

import { Module } from '@nestjs/common';
import { SocialMediasController } from './socialMedias.controller';
import { SocialMediasService } from './socialMedias.service';

@Module({
  controllers: [SocialMediasController],
  providers: [SocialMediasService],
})
export class SocialMediasModule {}

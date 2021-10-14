import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SocialMediasController } from './socialMedias.controller';
import { SocialMediasService } from './socialMedias.service';

@Module({
  controllers: [SocialMediasController],
  providers: [SocialMediasService,UsersService],
})
export class SocialMediasModule {}

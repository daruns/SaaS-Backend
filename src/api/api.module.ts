import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [CommentsModule, PostsModule, UsersModule, ClientsModule],
  providers: [],
})
export class ApiModule {}

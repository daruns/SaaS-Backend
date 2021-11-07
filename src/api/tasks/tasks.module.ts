import { Module } from '@nestjs/common';
import { BoardsService } from '../boards/boards.service';
import { TasksController } from './tasks.controller';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from './tasks.service';
import { ProjectsModule } from '../projects/projects.module';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [BoardsModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    BoardsService,
  ],
})
export class TasksModule {}

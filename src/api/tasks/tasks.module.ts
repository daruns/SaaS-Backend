import { Module } from '@nestjs/common';
import { BoardsService } from '../boards/boards.service';
import { TasksController } from './tasks.controller';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from './tasks.service';
import { ProjectsModule } from '../projects/projects.module';
import { BoardsModule } from '../boards/boards.module';
import { FileUploadService } from 'src/app/app.service';

@Module({
  imports: [BoardsModule],
  controllers: [TasksController],
  providers: [
    FileUploadService,
    TasksService,
    BoardsService,
  ],
})
export class TasksModule {}

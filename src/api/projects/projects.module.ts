import { Module } from '@nestjs/common';
import { FileUploadService } from 'src/app/app.service';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [ClientsModule],
  controllers: [ProjectsController],
  providers: [
    FileUploadService,
    ProjectsService,
    ClientsService,
  ],
  exports: [ProjectsService]
})
export class ProjectsModule {}

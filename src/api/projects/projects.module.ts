import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [ClientsModule],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ClientsService,
  ],
  exports: [ProjectsService]
})
export class ProjectsModule {}

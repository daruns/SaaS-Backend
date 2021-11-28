import { Body, Controller, Get, Post, Req, Request, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { AppService, imageFileFilter, FileUploadService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get('/upload')
  @UseGuards(JwtAuthGuard)
  async getHello(@Request() req,@Body() body: {id: number}) {
    console.log(body)
    return await this.fileUploadService.removeFile(body.id, req.user);
  }
}

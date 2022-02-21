import { Body, Controller, Get, Post, Req, Request, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CURRENCY_CODES } from 'src/lib/defaults';
import { AppService, imageFileFilter, FileUploadService, ResponseData } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('currencyCodes')
  async getCurrencyCodes(@Request() req): Promise<ResponseData> {
    return {
      success: true,
      message: "fetch currency codes successful",
      data: {currencyCodes: CURRENCY_CODES},
    }
  }

  @Get('')
  async getHello(@Request() req) {
    return "sss";
  }
}

import { Body, Controller, Get, Param, Post, Query, Req, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CURRENCY_CODES } from 'src/lib/defaults';
import { AppService, FileUploadService, ResponseData } from './app.service';

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

  @Get('readAsStream')
  async getFile(@Query() query:string,@Res() res) {
    let key:string = query["key"]
    let keyextr:string = key;
    try {
      if (key.includes("oneconnect-files.s3.eu-central-1.amazonaws.com/")) {
        let splttd = key.split("oneconnect-files.s3.eu-central-1.amazonaws.com/")
        splttd.shift()
        keyextr = splttd.join()
      }
      let result:any = await this.fileUploadService.getFile(keyextr)
      await (result).pipe(res)
    } catch(err) {
      res.send()
    }
  }
}

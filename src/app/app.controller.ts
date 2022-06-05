import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Can } from 'src/api/auth/can/decorators/can.decorator';
import { Action } from 'src/api/auth/can/enums/actions.enum';
import { Subjects } from 'src/api/auth/can/enums/subjects.enum';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CURRENCY_CODES } from 'src/lib/defaults';
import { AWS_S3_KEY_NAME } from 'src/lib/regex';
import { AppService, FileUploadService, ResponseData } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Can(Subjects.EveryoneAllowed,Action.Read)
  @Get('currencyCodes')
  async getCurrencyCodes(@Request() req): Promise<ResponseData> {
    return {
      success: true,
      message: "fetch currency codes successful",
      data: {currencyCodes: CURRENCY_CODES},
    }
  }

  @Get('readAsStream')
  @Can(Subjects.EveryoneAllowed,Action.Read)
  async getFile(@Query() query: {key:string},@Res() res) {
    let key:string = query["key"]
    let firstmatch: RegExpMatchArray|[]|null = key.match(AWS_S3_KEY_NAME)
    let keyextr = (AWS_S3_KEY_NAME).test(key);
    console.log("key: ",key)
    if (!keyextr) {
      res.status(HttpStatus.OK).json({
        success: false,
        message: 'file not found',
        data: {},
      });
    } else {
      try {
        let secmtch:any = firstmatch[0]
        keyextr = secmtch
        let result:any = await this.fileUploadService.getFile(`${keyextr}`)
        if (result) {
          await (result).pipe(res)
        } else {
          console.log("Error: keyext: ",keyextr)
          res.status(HttpStatus.OK).json({
            success: false,
            message: 'file not found',
            data: {},
          });
        }
      } catch(err) {
        console.log("Something else went wrong while reading aws file!!!",firstmatch,err )
        res.status(HttpStatus.OK).json({
          success: false,
          message: 'something went wrong in reading file!',
          data: err,
        });
    }
    }
  }
}

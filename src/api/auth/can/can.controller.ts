import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    ServiceUnavailableException,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { CanService } from './can.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CanActivateDto } from './dto/can-activate.dto';
import { Can } from './decorators/can.decorator';
import { Action } from './enums/actions.enum';
import { Subjects } from './enums/subjects.enum';

  @Controller('can')
  export class CanController {
    constructor(
      private readonly canService: CanService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Can(Subjects.EveryoneAllowed,Action.Read)
    @Get()
    async canActivate(@Body() payload: CanActivateDto ,@Request() req): Promise<boolean|string> {
      let result: boolean = false
      try {
        const canActivate: boolean = await this.canService.can(req.user,payload.action,payload.subject)
        if(canActivate === true) result = true
      } catch(err) {
        return err
      }
      return result
    }
  }

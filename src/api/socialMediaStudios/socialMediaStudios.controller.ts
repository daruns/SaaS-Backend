import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Post,
  UseGuards,
  Req,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddFileDto, FileParamDto } from 'src/app/app.service';
import { Can } from '../auth/can/decorators/can.decorator';
import { Action } from '../auth/can/enums/actions.enum';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddSocialMediaUsersDto } from './dto/add-socialMediaUsers.dto';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateSocialMediaStudioDto } from './dto/create-socialMediaStudio.dto';
import { RemoveMediaAttachmentDto } from './dto/remove-mediaAttachment.dto';
import { RemoveSocialMediaStudioUsersDto } from './dto/remove-socialMediaStudioUsers.dto';
import { UpdateSocialMediaStudioDto } from './dto/update-socialMediaStudio.dto';
import { SocialMediaStudiosService } from './socialMediaStudios.service';

@UseGuards(JwtAuthGuard)
@Controller('socialMediaStudios')
export class SocialMediaStudiosController {
  constructor(
    private readonly socialMediaStudiosService: SocialMediaStudiosService,
  ) {}

  @Get('')
  @Can(Subjects.socialMediaStudios,Action.Read)
  async findAll(@Request() req) {
    const socialMedia = await this.socialMediaStudiosService.findAll(req.user);
    return socialMedia;
  }

  @Get('drafts')
  @Can(Subjects.socialMediaStudios,Action.Read)
  async drafts(@Request() req) {
    const socialMedia = await this.socialMediaStudiosService.findByStage('draft', req.user);
    return socialMedia;
  }

  @Get('productions')
  @Can(Subjects.socialMediaStudios,Action.Read)
  async inProductions(@Request() req) {
    const socialMedia = await this.socialMediaStudiosService.findByStage('production', req.user);
    return socialMedia;
  }

  @Get('reviews')
  async inReviews(@Request() req) {
    const socialMedia = await this.socialMediaStudiosService.findByStage('review', req.user);
    return socialMedia;
  }

  @Get('completeds')
  @Can(Subjects.socialMediaStudios,Action.Read)
  async Completeds(@Request() req) {
    const socialMedia = await this.socialMediaStudiosService.findByStage('completed', req.user);
    return socialMedia;
  }

  @Get(':id')
  @Can(Subjects.socialMediaStudios,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const socialMedia = await this.socialMediaStudiosService.findById(id, req.user);
    return socialMedia;
  }

  @Post('createMedia')
  @Can(Subjects.socialMediaStudios,Action.Create)
  @UseInterceptors(FilesInterceptor("attachments", 30))
  async createMedia(@UploadedFiles() attachments: Array<FileParamDto>, @Body() media: CreateMediaDto, @Request() req) {
    console.log("create",media)
    media.attachments = attachments
    const createMedia = await this.socialMediaStudiosService.createMedia(media,req)
    return createMedia
  }

  @Post('create')
  @Can(Subjects.socialMediaStudios,Action.Create)
  async create(@Body() socialMedia: CreateSocialMediaStudioDto, @Request() req) {
    const createdSocialMedia = await this.socialMediaStudiosService.create(socialMedia, req.user);
    return createdSocialMedia
  }

  @Post('addUsers')
  @Can(Subjects.socialMediaStudios,Action.Update)
  async addUsers(@Body() payload, @Request() req) {
    console.log("payload addusers: ", payload);
    return payload
    // const createdSocialMedia = await this.socialMediaStudiosService.addUsers(payload, req.user);
    // return createdSocialMedia
  }

  @Post('removeUsers')
  @Can(Subjects.socialMediaStudios,Action.Delete)
  async removeUsers(@Body() payload: RemoveSocialMediaStudioUsersDto, @Request() req) {
    const createdSocialMedia = await this.socialMediaStudiosService.removeUsers(payload, req.user);
    return createdSocialMedia
  }

  @Post('addAttachments')
  @Can(Subjects.socialMediaStudios,Action.Update)
  @UseInterceptors(FilesInterceptor("files", 1))
  async addAttachments(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    const createdSocialMedia = await this.socialMediaStudiosService.addAttachments(payload, req.user);
    return createdSocialMedia
  }

  @Post('removeAttachment')
  @Can(Subjects.socialMediaStudios,Action.Delete)
  async removeAttachment(@Body() payload: RemoveMediaAttachmentDto, @Request()req) {
    const createdSocialMedia = await this.socialMediaStudiosService.removeAttachment(payload, req.user);
    return createdSocialMedia
  }

  @Post('approve')
  @Can(Subjects.socialMediaStudios,Action.Update)
  async approve(@Body() payload: {id: number}, @Request()req) {
    const createdSocialMedia = await this.socialMediaStudiosService.approve(payload.id, req.user);
    return createdSocialMedia
  }

  @Post('update')
  @Can(Subjects.socialMediaStudios,Action.Update)
  // update commnet on socialMedia
  update(@Body() payload: UpdateSocialMediaStudioDto, @Request() req) {
    return this.socialMediaStudiosService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.socialMediaStudios,Action.Delete)
  // delete socialMedia by id
  deleteById(@Body() payload, @Request() req) {
    return this.socialMediaStudiosService.deleteById(payload.id, req.user);
  }
}

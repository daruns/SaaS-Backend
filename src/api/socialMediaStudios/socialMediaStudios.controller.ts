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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateSocialMediaStudioDto } from './dto/create-socialMediaStudio.dto';
import { UpdateSocialMediaStudioDto } from './dto/update-socialMediaStudio.dto';
import { SocialMediaStudiosService } from './socialMediaStudios.service';

@UseGuards(JwtAuthGuard)
@Controller('socialMediaStudios')
export class SocialMediaStudiosController {
  constructor(
    private readonly socialMediaStudiosService: SocialMediaStudiosService,
    ) {}

    @Get('')
    async findAll(@Request() req) {
      const socialMedia = await this.socialMediaStudiosService.findAll(req.user);
      return socialMedia;
    }

    @Get('drafts')
    async drafts(@Request() req) {
      const socialMedia = await this.socialMediaStudiosService.findByStage('draft', req.user);
      return socialMedia;
    }

    @Get('productions')
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
    async Completeds(@Request() req) {
      const socialMedia = await this.socialMediaStudiosService.findByStage('completed', req.user);
      return socialMedia;
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
      const socialMedia = await this.socialMediaStudiosService.findById(id, req.user);
      return socialMedia;
    }

  @Post('createMedia')
  @UseInterceptors(FilesInterceptor("files", 30))
  async addMediaToSMS(@UploadedFiles() files: Array<FileParamDto>, @Body() media: CreateMediaDto, @Request() req) {
    media.attachments = files
    const createMedia = await this.socialMediaStudiosService.createMedia(media,req)
    return createMedia
  }

  @Post('create')
  async create(@Body() socialMedia: CreateSocialMediaStudioDto, @Request() req) {
    const createdSocialMedia = await this.socialMediaStudiosService.create(socialMedia, req.user);
    return createdSocialMedia
  }

  @Post('update')
  // update commnet on socialMedia
  update(@Body() payload: UpdateSocialMediaStudioDto, @Request() req) {
    return this.socialMediaStudiosService.update(payload, req.user);
  }

  @Post('delete')
  // delete socialMedia by id
  deleteById(@Body() payload, @Request() req) {
    return this.socialMediaStudiosService.deleteById(payload.id, req.user);
  }
}

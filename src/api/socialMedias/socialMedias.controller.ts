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
} from '@nestjs/common';
import { UpdateSocialMediaDto } from './dto/update-socialMedia.dto';
import { SocialMediasService } from './socialMedias.service';
import { CreateSocialMediaDto } from './dto/create-socialMedia.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('socialMedias')
export class SocialMediasController {
  constructor(
    private readonly socialMediasService: SocialMediasService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const socialMedias = await this.socialMediasService.findAll(req.user);
    return socialMedias;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const socialMedia = await this.socialMediasService.findById(id, req.user);
    return socialMedia;
  }

  @Post('create')
  async create(@Body() socialMedia: CreateSocialMediaDto, @Request() req) {
    const createdSocialMedia = await this.socialMediasService.create(socialMedia, req.user);
    return createdSocialMedia
  }

  @Post('update')
  // update commnet on socialMedia
  update(@Body() payload: UpdateSocialMediaDto, @Request() req) {
    return this.socialMediasService.update(payload, req.user);
  }

  @Post('delete')
  // delete socialMedia by id
  deleteById(@Body() payload, @Request() req) {
    return this.socialMediasService.deleteById(payload.id, req.user);
  }
}

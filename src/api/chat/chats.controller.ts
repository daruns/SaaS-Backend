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
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileParamDto } from 'src/app/app.service';
import { RemoveFilesDto } from './dto/remove-MessageAttachments.dto';

@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
	constructor(
		private readonly chatsService: ChatsService,
		) {}

	@Post('addFiles')
  @UseInterceptors(FilesInterceptor("files", 10))
	async addFiles(@UploadedFiles() files: FileParamDto[], @Request() req) {
		const addFilesdExpense = await this.chatsService.addFiles(files, req.user);
		return addFilesdExpense
	}

	@Post('removeFiles')
	async removeFiles(@Body() payload: RemoveFilesDto, @Request() req) {
		const removeFilesdExpense = await this.chatsService.removeFiles(payload, req.user);
		return removeFilesdExpense
	}
}

import { Injectable, Inject } from '@nestjs/common';
import { MessageModel } from 'src/database/models/message.model';
import { ModelClass } from 'objection';
import { FileParamDto, FileUploadService } from 'src/app/app.service';
import { RemoveFilesDto } from './dto/remove-MessageAttachments.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ChatsService {
  constructor(
    @Inject('MessageModel') private modelClass: ModelClass<MessageModel>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async removeFiles(payload: RemoveFilesDto, currentUser): Promise<ResponseData> {
    const message = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(payload.id)
    .withGraphFetched({attachments: {}});
    if (!message) {
      return {
        success: false,
        message: "Message not found",
        data: {},
      }
    }

    for (let attId of payload.attachmentIds) {
			this.fileUploadService.removeFile(attId, currentUser)
    }
		const attIds = message.attachments.map(e => e.id)
		message.$relatedQuery('attachments')
		.unrelate()
		.whereIn("attachments.id", attIds)

    return {
      success: true,
      message: 'Message Attachments removed successfully.',
      data: {},
    }
  }

  async addFiles(payload: FileParamDto[], currentUser): Promise<ResponseData> {
    // const chat = await this.modelClass.query()
    // .where({brandCode: currentUser.brandCode})
    // .findById(id);
    // if (!chat) {
    //   return {
    //     success: false,
    //     message: "Message not found",
    //     data: {},
    //   }
    // }
    const allFilesUploaded = []
    for (let file of payload) {
      const prepFile: FileParamDto = {
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
        size: file.size,
      }

      const uploadedFileService = await this.fileUploadService.addFile(prepFile, "messages", currentUser);

      if (!uploadedFileService.success) {
				return {
					success: false,
					message: uploadedFileService.message,
					data: uploadedFileService.data,
				}
			}
			allFilesUploaded.push(uploadedFileService.data)
    }
    // const relatedAttachments = await chat.$relatedQuery('attachments').relate(allFilesUploaded)
    // if (!relatedAttachments) {
		// 	return {
		// 		success: false,
		// 		message: "Attachments could not be linked to message",
		// 		data: {},
		// 	}
    // }
    return {
			success: true,
			message: 'Message Attachments added successfully.',
			data: allFilesUploaded,
    }
  }
}

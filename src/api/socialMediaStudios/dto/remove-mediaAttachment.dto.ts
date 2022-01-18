import { IsNotEmpty } from "class-validator";
import { ToInteger } from "src/app/app.service";

export class RemoveMediaAttachmentDto {
	@ToInteger
	@IsNotEmpty()
	id: number
	@ToInteger
	@IsNotEmpty()
	attachId: number
}
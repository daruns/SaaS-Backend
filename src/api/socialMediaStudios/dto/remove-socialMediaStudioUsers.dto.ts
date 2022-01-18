import { IsNotEmpty } from "class-validator"
import { ToInteger } from "src/app/app.service"

export class RemoveSocialMediaStudioUsersDto {
	@ToInteger
	@IsNotEmpty()
	id: number
	@IsNotEmpty()
	users: number[]
}

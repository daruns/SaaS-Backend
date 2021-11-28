import { IsInt, IsNotEmpty } from "class-validator";

export class AddFileDto {
    @IsInt()
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    files: Array<Express.Multer.File>
}
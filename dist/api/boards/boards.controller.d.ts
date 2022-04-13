import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AddAttributeDto } from './dto/add-attribute.dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    findAll(req: any): Promise<import("./boards.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./boards.service").ResponseData>;
    create(board: CreateBoardDto, req: any): Promise<import("./boards.service").ResponseData>;
    addAttribute(board: AddAttributeDto, req: any): Promise<import("./boards.service").ResponseData>;
    update(payload: UpdateBoardDto, req: any): Promise<import("./boards.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./boards.service").ResponseData>;
}

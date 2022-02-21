import { BoardModel } from 'src/database/models/board.model';
import { BoardAttributeModel } from 'src/database/models/boardAttribute.model';
import { ModelClass } from 'objection';
import { CreateBoardDto } from './dto/create-board.dto';
import { AddAttributeDto } from './dto/add-attribute.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class BoardsService {
    private boardAttributeClass;
    private modelClass;
    constructor(boardAttributeClass: ModelClass<BoardAttributeModel>, modelClass: ModelClass<BoardModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateBoardDto, currentUser: any): Promise<ResponseData>;
    addAttribute(attribute: AddAttributeDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateBoardDto, currentUser: any): Promise<ResponseData>;
    deleteById(boardId: number, currentUser: any): Promise<ResponseData>;
}

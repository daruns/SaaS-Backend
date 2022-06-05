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
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddAttributeDto } from './dto/add-attribute.dto';
import { Can } from 'src/api/auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    ) {}

  @Get()
  @Can(Subjects.projectsTasks ,Action.Read)
  async findAll(@Request() req) {
    const boards = await this.boardsService.findAll(req.user);
    return boards;
  }

  @Get(':id')
  @Can(Subjects.projectsTasks ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const board = await this.boardsService.findById(id, req.user);
    return board;
  }

  @Post('create')
  @Can(Subjects.projectsTasks ,Action.Create)
  async create(@Body() board: CreateBoardDto, @Request() req) {
    const createdBoard = await this.boardsService.create(board, req.user);
    return createdBoard
  }

  @Post('addAttribute')
  @Can(Subjects.projectsTasks ,Action.Update)
  async addAttribute(@Body() board: AddAttributeDto, @Request() req) {
    const addAttribute = await this.boardsService.addAttribute(board, req.user);
    return addAttribute
  }

  @Post('update')
  @Can(Subjects.projectsTasks ,Action.Update)
  update(@Body() payload: UpdateBoardDto, @Request() req) {
    return this.boardsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.projectsTasks ,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.boardsService.deleteById(payload.id, req.user);
  }
}

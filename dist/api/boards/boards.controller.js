"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_board_dto_1 = require("./dto/update-board.dto");
const boards_service_1 = require("./boards.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const add_attribute_dto_1 = require("./dto/add-attribute.dto");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    async findAll(req) {
        const boards = await this.boardsService.findAll(req.user);
        return boards;
    }
    async findOne(id, req) {
        const board = await this.boardsService.findById(id, req.user);
        return board;
    }
    async create(board, req) {
        const createdBoard = await this.boardsService.create(board, req.user);
        return createdBoard;
    }
    async addAttribute(board, req) {
        const addAttribute = await this.boardsService.addAttribute(board, req.user);
        return addAttribute;
    }
    update(payload, req) {
        return this.boardsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.boardsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    common_1.Post('addAttribute'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_attribute_dto_1.AddAttributeDto, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "addAttribute", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_board_dto_1.UpdateBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "deleteById", null);
BoardsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
exports.BoardsController = BoardsController;
//# sourceMappingURL=boards.controller.js.map
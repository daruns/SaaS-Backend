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
exports.QuotesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_quote_dto_1 = require("./dto/update-quote.dto");
const quotes_service_1 = require("./quotes.service");
const create_quote_dto_1 = require("./dto/create-quote.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let QuotesController = class QuotesController {
    constructor(quotesService) {
        this.quotesService = quotesService;
    }
    async findAll(req) {
        const quotes = await this.quotesService.findAll(req.user);
        return quotes;
    }
    async findOne(id, req) {
        const quote = await this.quotesService.findById(id, req.user);
        return quote;
    }
    async create(quote, quoteItems, req) {
        delete (quote['items']);
        const createdQuote = await this.quotesService.create(quote, quoteItems, req.user);
        return createdQuote;
    }
    update(payload, quoteItems, req) {
        delete (payload['items']);
        return this.quotesService.update(payload, quoteItems, req.user);
    }
    deleteById(payload, req) {
        return this.quotesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Body('items')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quote_dto_1.CreateQuoteDto, Array, Object]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Body('items')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_quote_dto_1.UpdateQuoteDto, Array, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "deleteById", null);
QuotesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('quotes'),
    __metadata("design:paramtypes", [quotes_service_1.QuotesService])
], QuotesController);
exports.QuotesController = QuotesController;
//# sourceMappingURL=quotes.controller.js.map
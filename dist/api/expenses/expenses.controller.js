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
exports.ExpensesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_expense_dto_1 = require("./dto/update-expense.dto");
const expenses_service_1 = require("./expenses.service");
const create_expense_dto_1 = require("./dto/create-expense.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
let ExpensesController = class ExpensesController {
    constructor(expensesService) {
        this.expensesService = expensesService;
    }
    async findAll(req) {
        const expenses = await this.expensesService.findAll(req.user);
        return expenses;
    }
    async findOne(id, req) {
        const expense = await this.expensesService.findById(id, req.user);
        return expense;
    }
    async create(expense, expenseItems, req) {
        delete (expense['items']);
        const createdExpense = await this.expensesService.create(expense, expenseItems, req.user);
        return createdExpense;
    }
    async addFile(id, files, req) {
        const payload = { id: id, files: files };
        console.log(payload);
        const addFiledExpense = await this.expensesService.addFile(payload, req.user);
        return addFiledExpense;
    }
    async replaceFiles(id, files, req) {
        const payload = { id: id, files: files };
        console.log(payload);
        const addFiledExpense = await this.expensesService.replaceFiles(payload, req.user);
        return addFiledExpense;
    }
    async removeFile(body, req) {
        const addFiledExpense = await this.expensesService.removeFile(body, req.user);
        return addFiledExpense;
    }
    update(payload, expenseItems, req) {
        return this.expensesService.update(payload, expenseItems, req.user);
    }
    deleteById(payload, req) {
        return this.expensesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpensesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExpensesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Body('items')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_dto_1.CreateExpenseDto, Array, Object]),
    __metadata("design:returntype", Promise)
], ExpensesController.prototype, "create", null);
__decorate([
    common_1.Post('addFile'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 1)),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body("id")), __param(1, common_1.UploadedFiles()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ExpensesController.prototype, "addFile", null);
__decorate([
    common_1.Post('replaceFiles'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Update),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 1)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body("id")), __param(1, common_1.UploadedFiles()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ExpensesController.prototype, "replaceFiles", null);
__decorate([
    common_1.Post('removeFile'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExpensesController.prototype, "removeFile", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Body('items')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_expense_dto_1.UpdateExpenseDto, Array, Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpenses, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "deleteById", null);
ExpensesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('expenses'),
    __metadata("design:paramtypes", [expenses_service_1.ExpensesService])
], ExpensesController);
exports.ExpensesController = ExpensesController;
//# sourceMappingURL=expenses.controller.js.map
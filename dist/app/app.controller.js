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
exports.AppController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const can_decorator_1 = require("../api/auth/can/decorators/can.decorator");
const actions_enum_1 = require("../api/auth/can/enums/actions.enum");
const subjects_enum_1 = require("../api/auth/can/enums/subjects.enum");
const jwt_auth_guard_1 = require("../api/auth/guards/jwt-auth.guard");
const defaults_1 = require("../lib/defaults");
const regex_1 = require("../lib/regex");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService, fileUploadService) {
        this.appService = appService;
        this.fileUploadService = fileUploadService;
    }
    async getCurrencyCodes(req) {
        return {
            success: true,
            message: "fetch currency codes successful",
            data: { currencyCodes: defaults_1.CURRENCY_CODES },
        };
    }
    async getFile(query, res) {
        let key = query["key"];
        let firstmatch = key.match(regex_1.AWS_S3_KEY_NAME);
        let keyextr = (regex_1.AWS_S3_KEY_NAME).test(key);
        console.log("key: ", key);
        if (!keyextr) {
            res.status(common_1.HttpStatus.OK).json({
                success: false,
                message: 'file not found',
                data: {},
            });
        }
        else {
            try {
                let secmtch = firstmatch[0];
                keyextr = secmtch;
                let result = await this.fileUploadService.getFile(`${keyextr}`);
                if (result) {
                    await (result).pipe(res);
                }
                else {
                    console.log("Error: keyext: ", keyextr);
                    res.status(common_1.HttpStatus.OK).json({
                        success: false,
                        message: 'file not found',
                        data: {},
                    });
                }
            }
            catch (err) {
                console.log("Something else went wrong while reading aws file!!!", firstmatch, err);
                res.status(common_1.HttpStatus.OK).json({
                    success: false,
                    message: 'something went wrong in reading file!',
                    data: err,
                });
            }
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    can_decorator_1.Can(subjects_enum_1.Subjects.EveryoneAllowed, actions_enum_1.Action.Read),
    common_1.Get('currencyCodes'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCurrencyCodes", null);
__decorate([
    common_1.Get('readAsStream'),
    can_decorator_1.Can(subjects_enum_1.Subjects.EveryoneAllowed, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Query()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getFile", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        app_service_1.FileUploadService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const http_error_handler_1 = require("../shared/Handlers/http-error.handler");
const logging_interceptor_1 = require("../shared/Interceptors/logging.interceptor");
const timeout_interceptor_1 = require("../shared/Interceptors/timeout.interceptor");
const api_module_1 = require("../api/api.module");
const database_module_1 = require("../database/database.module");
const can_guard_1 = require("../api/auth/guards/can.guard");
const can_service_1 = require("../api/auth/can/can.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [api_module_1.ApiModule, can_service_1.CanService, database_module_1.DatabaseModule],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            app_service_1.FileUploadService,
            can_service_1.CanService,
            {
                provide: core_1.APP_GUARD,
                useFactory: (ref, can) => new can_guard_1.CanGuard(ref, can),
                inject: [core_1.Reflector, can_service_1.CanService],
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_error_handler_1.HttpErrorHandler,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: timeout_interceptor_1.TimeoutInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorHandler = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
let HttpErrorHandler = class HttpErrorHandler {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        common_1.Logger.error('exception:');
        common_1.Logger.error(exception);
        const message = `[HttpErrorHandler] ${request.method} ${request.url}`;
        common_1.Logger.error(message);
        if (exception && exception.message && exception.message.error === 'Unauthorized') {
            response.status(401).json(exception.message);
        }
        else {
            response.status(400).json({
                success: false,
                message: lodash_1.get(exception, 'message.message', lodash_1.get(exception, 'message.error', 'Invalid url!')),
                data: { exception: exception },
            });
        }
    }
};
HttpErrorHandler = __decorate([
    common_1.Catch()
], HttpErrorHandler);
exports.HttpErrorHandler = HttpErrorHandler;
//# sourceMappingURL=http-error.handler.js.map
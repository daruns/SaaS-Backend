"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const serviceItems_controller_1 = require("./serviceItems.controller");
const serviceItems_service_1 = require("./serviceItems.service");
let ServiceItemsModule = class ServiceItemsModule {
};
ServiceItemsModule = __decorate([
    common_1.Module({
        controllers: [serviceItems_controller_1.ServiceItemsController],
        providers: [serviceItems_service_1.ServiceItemsService],
        exports: [serviceItems_service_1.ServiceItemsService],
    })
], ServiceItemsModule);
exports.ServiceItemsModule = ServiceItemsModule;
//# sourceMappingURL=serviceItems.module.js.map
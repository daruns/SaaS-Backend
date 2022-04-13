"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubServiceItemsModule = void 0;
const common_1 = require("@nestjs/common");
const serviceItems_module_1 = require("../serviceItems/serviceItems.module");
const subServiceItems_controller_1 = require("./subServiceItems.controller");
const subServiceItems_service_1 = require("./subServiceItems.service");
let SubServiceItemsModule = class SubServiceItemsModule {
};
SubServiceItemsModule = __decorate([
    common_1.Module({
        imports: [serviceItems_module_1.ServiceItemsModule],
        controllers: [subServiceItems_controller_1.SubServiceItemsController],
        providers: [subServiceItems_service_1.SubServiceItemsService],
    })
], SubServiceItemsModule);
exports.SubServiceItemsModule = SubServiceItemsModule;
//# sourceMappingURL=subServiceItems.module.js.map
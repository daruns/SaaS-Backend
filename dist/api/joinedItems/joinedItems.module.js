"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinedItemsModule = void 0;
const common_1 = require("@nestjs/common");
const joinedItems_controller_1 = require("./joinedItems.controller");
const joinedItems_service_1 = require("./joinedItems.service");
let JoinedItemsModule = class JoinedItemsModule {
};
JoinedItemsModule = __decorate([
    common_1.Module({
        controllers: [joinedItems_controller_1.JoinedItemsController],
        providers: [joinedItems_service_1.JoinedItemsService],
    })
], JoinedItemsModule);
exports.JoinedItemsModule = JoinedItemsModule;
//# sourceMappingURL=joinedItems.module.js.map
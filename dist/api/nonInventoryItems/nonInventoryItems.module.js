"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonInventoryItemsModule = void 0;
const common_1 = require("@nestjs/common");
const nonInventoryItems_controller_1 = require("./nonInventoryItems.controller");
const nonInventoryItems_service_1 = require("./nonInventoryItems.service");
let NonInventoryItemsModule = class NonInventoryItemsModule {
};
NonInventoryItemsModule = __decorate([
    common_1.Module({
        controllers: [nonInventoryItems_controller_1.NonInventoryItemsController],
        providers: [nonInventoryItems_service_1.NonInventoryItemsService],
    })
], NonInventoryItemsModule);
exports.NonInventoryItemsModule = NonInventoryItemsModule;
//# sourceMappingURL=nonInventoryItems.module.js.map
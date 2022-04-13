"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypesModule = void 0;
const common_1 = require("@nestjs/common");
const leaveTypes_controller_1 = require("./leaveTypes.controller");
const leaveTypes_service_1 = require("./leaveTypes.service");
let LeaveTypesModule = class LeaveTypesModule {
};
LeaveTypesModule = __decorate([
    common_1.Module({
        controllers: [leaveTypes_controller_1.LeaveTypesController],
        providers: [leaveTypes_service_1.LeaveTypesService],
        exports: [leaveTypes_service_1.LeaveTypesService],
    })
], LeaveTypesModule);
exports.LeaveTypesModule = LeaveTypesModule;
//# sourceMappingURL=leaveTypes.module.js.map
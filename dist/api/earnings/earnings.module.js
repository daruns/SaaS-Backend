"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarningsModule = void 0;
const common_1 = require("@nestjs/common");
const earningTypes_module_1 = require("../earningTypes/earningTypes.module");
const employees_module_1 = require("../employees/employees.module");
const earnings_controller_1 = require("./earnings.controller");
const earnings_service_1 = require("./earnings.service");
let EarningsModule = class EarningsModule {
};
EarningsModule = __decorate([
    common_1.Module({
        imports: [employees_module_1.EmployeesModule, earningTypes_module_1.EarningTypesModule],
        controllers: [earnings_controller_1.EarningsController],
        providers: [earnings_service_1.EarningsService],
    })
], EarningsModule);
exports.EarningsModule = EarningsModule;
//# sourceMappingURL=earnings.module.js.map
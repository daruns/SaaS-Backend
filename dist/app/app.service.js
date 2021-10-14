"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const libphonenumber_js_1 = require("libphonenumber-js");
class PhoneNumberRegex {
}
exports.PhoneNumberRegex = PhoneNumberRegex;
PhoneNumberRegex.reg = /^\+964\d{1,12}$/;
const validCountries = ['IQ'];
exports.ToPhone = class_transformer_1.Transform((value) => {
    if (typeof value.value !== 'string')
        return false;
    const parsed = libphonenumber_js_1.parsePhoneNumberFromString(value.value);
    if (!parsed)
        return false;
    if (!validCountries.includes(parsed.country))
        return false;
    return parsed.number;
}, { toClassOnly: true });
let AppService = class AppService {
    async getHello() {
        return {
            success: true,
            message: 'successfully requested hello world',
            data: 'Hello World!'
        };
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
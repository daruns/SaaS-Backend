"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CustomValidatePipe = class CustomValidatePipe {
    async transform(value, metadata) {
        if (!value || _.isEmpty(value)) {
            throw new common_1.BadRequestException({
                success: false,
                message: 'No data submitted.',
                data: {},
            });
        }
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = class_transformer_1.plainToClass(metatype, value);
        const errors = await class_validator_1.validate(object);
        console.log("\n\n\n");
        console.log(errors);
        if (errors.length > 0) {
            throw new common_1.HttpException({ status: false, message: this.buildError(errors), data: {} }, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    buildError(errors) {
        let message = '';
        errors.forEach(el => {
            const error = _.last(Object.entries(el.constraints));
            if (message === '') {
                message = error[1];
            }
        });
        return message;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object, Date];
        return !types.find(type => metatype === type);
    }
};
CustomValidatePipe = __decorate([
    common_1.Injectable()
], CustomValidatePipe);
exports.CustomValidatePipe = CustomValidatePipe;
//# sourceMappingURL=validation.pipes.js.map
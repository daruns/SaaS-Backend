"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = exports.AppService = exports.ToRate = exports.DefaultToFalse = exports.ToLower = exports.ToInteger = exports.DefaultToNow = exports.ToPhone = exports.AddFileDto = exports.linkAddressRegex = exports.PhoneNumberRegex = exports.documentFileFilter = exports.editFileName = exports.SkipEmpty = exports.ToExstName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const libphonenumber_js_1 = require("libphonenumber-js");
const path_1 = require("path");
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const moment = require("moment");
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(`Unsupported file type ${path_1.extname(file.originalname)}`, false);
    }
    callback(null, true);
};
exports.ToExstName = (filename) => {
    return (`.${filename.split(".").pop()}`);
};
exports.SkipEmpty = class_transformer_1.Transform((value) => {
    const parsed = value;
    if (parsed === "")
        return parsed;
    if (!(parsed.length >= 8))
        return false;
}, { toClassOnly: true });
exports.editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.documentFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|doc|DOC|pdf|PDF|xlsx|XLSX|csv|CSV)$/)) {
        callback(`Unsupported file type ${path_1.extname(file.originalname)}`, false);
    }
    callback(null, true);
};
class PhoneNumberRegex {
}
exports.PhoneNumberRegex = PhoneNumberRegex;
PhoneNumberRegex.reg = /^\+964\d{1,12}$/;
class linkAddressRegex {
}
exports.linkAddressRegex = linkAddressRegex;
linkAddressRegex.reg = /((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)/;
class AddFileDto {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], AddFileDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Array)
], AddFileDto.prototype, "files", void 0);
exports.AddFileDto = AddFileDto;
const validCountries = ['IQ'];
exports.ToPhone = class_transformer_1.Transform((value) => {
    if (typeof value !== 'string')
        return false;
    const parsed = libphonenumber_js_1.parsePhoneNumberFromString(value);
    if (!parsed)
        return false;
    if (!libphonenumber_js_1.isSupportedCountry(parsed.country))
        return false;
    return parsed.number;
}, { toClassOnly: true });
exports.DefaultToNow = class_transformer_1.Transform((value) => {
    console.log("Date -type: ", typeof value, "|| value: ", value);
    if (moment(value).isValid()) {
        value = moment(value).format('YYYY-MM-DD HH:mm:ss').toString();
    }
    else {
        value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString();
    }
    if (!moment(value, 'YYYY-MM-DD HH:mm', true).isValid()) {
        const finVal = moment(value, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString();
        return finVal;
    }
    else if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        const finVal = moment(value, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString();
        return finVal;
    }
    else {
        const finVal = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString();
        return finVal;
    }
}, { toClassOnly: true });
exports.ToInteger = class_transformer_1.Transform((value) => {
    if (typeof value !== 'number') {
        const parsedVal = parseInt(value);
        if (parsedVal.toString() !== 'NaN') {
            return parsedVal;
        }
        else {
            return null;
        }
    }
    else {
        return value;
    }
}, { toClassOnly: true });
exports.ToLower = class_transformer_1.Transform((value) => {
    if (typeof value === 'string') {
        return value.toLowerCase();
    }
    else {
        return value;
    }
}, { toClassOnly: true });
exports.DefaultToFalse = class_transformer_1.Transform((value) => {
    if (typeof value === 'undefined') {
        return false;
    }
    else {
        return value;
    }
}, { toClassOnly: true });
exports.ToRate = class_transformer_1.Transform((value) => {
    const parsed = Number(value);
    if (parsed === NaN)
        return false;
    if (!(parsed >= 0) && !(parsed < 11))
        return false;
    return parsed;
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
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
let FileUploadService = class FileUploadService {
    constructor(attachmentModel) {
        this.attachmentModel = attachmentModel;
    }
    async addFile(file, folder, currentUser) {
        const { buffer, originalname, size, mimetype } = file;
        const params = {
            Bucket: AWS_S3_BUCKET_NAME,
            Body: buffer,
            Key: `${folder}/` + uuid_1.v4() + "." + originalname.split(".").pop(),
            ACL: "public-read",
        };
        return await s3.upload(params)
            .promise()
            .then(async (data) => {
            const insertedAttach = await this.attachmentModel.query().insert({
                name: originalname,
                description: data.ETag,
                url: data.Location,
                key: data.Key,
                contentType: mimetype,
                size: size,
                brandCode: currentUser.brandCode,
                createdBy: currentUser.username
            });
            return {
                success: true,
                message: "file uploaded to s3 bucket successfully",
                data: insertedAttach
            };
        }, err => {
            return {
                success: false,
                message: "file didnt upload to s3 bucket!",
                data: err
            };
        });
    }
    async removeFile(id, currentUser) {
        const currentAttach = await this.attachmentModel.query()
            .where({
            brandCode: currentUser.brandCode,
        })
            .findById(id);
        const params = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: currentAttach.key,
        };
        return await s3.deleteObject(params)
            .promise()
            .then(async (data) => {
            const currentAttach = await this.attachmentModel.query()
                .where({
                brandCode: currentUser.brandCode,
            })
                .findById(id)
                .delete();
            return {
                success: true,
                message: "file uploaded to s3 bucket successfully",
                data: data
            };
        }, err => {
            return {
                success: false,
                message: "file didnt upload to s3 bucket!",
                data: err
            };
        });
    }
};
FileUploadService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject("AttachmentModel")),
    __metadata("design:paramtypes", [Object])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=app.service.js.map
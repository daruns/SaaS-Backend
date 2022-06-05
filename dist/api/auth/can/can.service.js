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
exports.CanService = void 0;
const common_1 = require("@nestjs/common");
const user_layers_dto_1 = require("../dto/user-layers.dto");
const subjects_enum_1 = require("./enums/subjects.enum");
const actions_enum_1 = require("./enums/actions.enum");
let CanService = class CanService {
    constructor(modelClass, permissionClass) {
        this.modelClass = modelClass;
        this.permissionClass = permissionClass;
    }
    async can(currentUser, action, subject) {
        if (subject === subjects_enum_1.Subjects.EveryoneAllowed)
            return true;
        if (currentUser.userType === user_layers_dto_1.UserLayers.layerOne) {
            if (subject === subjects_enum_1.Subjects.MasterAllowed)
                return false;
            return true;
        }
        const permissionFnd = await this.permissionClass.query()
            .whereIn('action', [action, actions_enum_1.Action.All.toString()])
            .findOne({
            subject: subject, userId: currentUser.id, brandCode: currentUser.brandCode
        });
        console.log("lrjfnr: ", permissionFnd);
        if (permissionFnd) {
            return true;
        }
        return false;
    }
};
CanService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('UserModel')),
    __param(1, common_1.Inject('PermissionModel')),
    __metadata("design:paramtypes", [Object, Object])
], CanService);
exports.CanService = CanService;
//# sourceMappingURL=can.service.js.map
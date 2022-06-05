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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("./apps/users/users.service");
const brands_service_1 = require("../brands/brands.service");
const user_layers_dto_1 = require("./dto/user-layers.dto");
const app_service_1 = require("../../app/app.service");
let AuthService = class AuthService {
    constructor(boardModelClass, boardAttributeClass, brandModel, fileUploadService, brandService, usersService, jwtService) {
        this.boardModelClass = boardModelClass;
        this.boardAttributeClass = boardAttributeClass;
        this.brandModel = brandModel;
        this.fileUploadService = fileUploadService;
        this.brandService = brandService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(signupDto) {
        const createBrandDto = {
            subdomain: signupDto.subdomain,
        };
        const createBrand = await this.brandService.create(createBrandDto);
        if (createBrand.success) {
            const createUserDto = {
                username: signupDto.username,
                password: signupDto.password,
                email: signupDto.email,
                brandCode: createBrand.data.brandCode,
                name: signupDto.username,
                userType: user_layers_dto_1.UserLayers.layerOne,
            };
            const createUser = await this.usersService.create(createUserDto);
            delete createUser.data.password;
            const finishedPending = await this.boardModelClass.query().insert({ name: 'Pending', description: '', brandCode: createUser.data.brandCode, createdBy: createUser.data.username, userId: createUser.data.id });
            await this.boardAttributeClass.query().insert({ color: 'yellow', position: 1, userId: createUser.data.id, brandCode: createUser.data.brandCode, createdBy: createUser.data.username, boardId: finishedPending.id });
            const finishedInProgress = await this.boardModelClass.query().insert({ name: 'In-Progress', description: '', brandCode: createUser.data.brandCode, createdBy: createUser.data.username, userId: createUser.data.id });
            await this.boardAttributeClass.query().insert({ color: 'blue', position: 2, userId: createUser.data.id, brandCode: createUser.data.brandCode, createdBy: createUser.data.username, boardId: finishedInProgress.id });
            const finishedcompleted = await this.boardModelClass.query().insert({ name: 'completed', description: '', brandCode: createUser.data.brandCode, createdBy: createUser.data.username, userId: createUser.data.id });
            await this.boardAttributeClass.query().insert({ color: 'green', position: 3, userId: createUser.data.id, brandCode: createUser.data.brandCode, createdBy: createUser.data.username, boardId: finishedcompleted.id });
            return createUser;
        }
        else {
            return createBrand;
        }
    }
    async editProfile(editProfileDto, currentUser) {
        const userFound = await this.usersService.findById(currentUser.id);
        if (userFound.success && userFound.data.brandCode === currentUser.brandCode) {
            editProfileDto['id'] = currentUser.id;
            if (editProfileDto.password === "")
                delete editProfileDto.password;
            const createUser = await this.usersService.update(editProfileDto, currentUser);
            if (createUser.success) {
                return {
                    success: true,
                    message: "Your Profile Changed Successfully",
                    data: {}
                };
            }
            else {
                return createUser;
            }
        }
        else {
            return {
                success: false,
                message: "Your Profile Not Found!",
                data: {}
            };
        }
    }
    async editBrand(payload, currentUser) {
        var _a;
        const brand = await this.brandModel.query().findOne({ brandCode: currentUser.brandCode });
        if (payload.logo) {
            const logoUploaded = payload.logo;
            const fileUploaded = await this.fileUploadService.addFile(logoUploaded, "logos", currentUser);
            if (fileUploaded.success) {
                console.log(fileUploaded.data);
                payload.logo = fileUploaded.data.url;
            }
            else
                return fileUploaded;
        }
        if (brand) {
            const updatedBrand = await this.brandModel
                .query()
                .where({ brandCode: currentUser.brandCode })
                .update({
                name: payload.name ? payload.name : brand.name,
                companySize: payload.companySize ? payload.companySize : brand.companySize,
                address: payload.address ? payload.address : brand.address,
                logo: payload.logo ? payload.logo : brand.logo,
                announcedAt: payload.announcedAt ? payload.announcedAt : brand.announcedAt,
                branches: payload.branches ? payload.branches : brand.branches,
                occupation: payload.occupation ? payload.occupation : brand.occupation,
                website: payload.website ? payload.website : brand.website,
                phoneNumber: payload.phoneNumber ? payload.phoneNumber : brand.phoneNumber,
                email: payload.email ? payload.email : brand.email,
                updatedBy: currentUser.username,
            })
                .where({ id: (_a = currentUser.brand) === null || _a === void 0 ? void 0 : _a.id });
            return {
                success: true,
                message: 'Brand details updated successfully.',
                data: updatedBrand,
            };
        }
        else {
            return {
                success: false,
                message: 'No brand found.',
                data: {},
            };
        }
    }
    async signIn(user) {
        if (!user.id) {
            throw new common_1.UnauthorizedException();
        }
        const payload = {
            id: user.id,
            username: user.username,
            brandCode: user.brandCode,
        };
        console.log("------------- SIGNIN------------");
        console.log(payload);
        console.log("------------- SIGNIN------------");
        return {
            success: true,
            message: 'User signed in successfully.',
            data: {
                user,
                accessToken: this.jwtService.sign(payload)
            },
        };
    }
    async validateUser(username, pass) {
        const queryUser = await this.usersService.findByUsername(username);
        const user = queryUser.data;
        if (!queryUser.success) {
            return null;
        }
        const valid = await bcrypt.compare(pass, user.password);
        delete (user.password);
        if (valid) {
            return user;
        }
        return null;
    }
    async me(id) {
        if (typeof id !== 'number') {
            return null;
        }
        else {
            const queryUser = await this.usersService.findById(id);
            if (queryUser.success) {
                const user = queryUser.data;
                return user;
            }
        }
        return null;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('BoardModel')),
    __param(1, common_1.Inject('BoardAttributeModel')),
    __param(2, common_1.Inject('BrandModel')),
    __metadata("design:paramtypes", [Object, Object, Object, app_service_1.FileUploadService,
        brands_service_1.BrandsService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
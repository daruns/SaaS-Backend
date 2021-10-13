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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_model_1 = require("../../database/models/user.model");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        const { username, password, email, phoneNumber } = authCredentialsDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        authCredentialsDto.password = hashedPassword;
        const newUser = await this.usersService.findByUsername(authCredentialsDto.username);
        if (!newUser.data.id) {
            const createUser = await this.usersService.create(authCredentialsDto);
            return {
                success: true,
                message: 'User created successfully.',
                data: createUser.data,
            };
        }
        else {
            return {
                success: false,
                message: 'User already exists with this email address!!!',
                data: {},
            };
        }
    }
    async signIn(user) {
        const payload = await this.usersService.findByUsername(user.username);
        console.log("-------------payload------------");
        console.log(user);
        console.log("-------------payload------------");
        return {
            success: true,
            message: 'User signed in successfully.',
            data: { accessToken: this.jwtService.sign(payload) },
        };
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findByUsername(username);
        if (!user.data.id) {
            return null;
        }
        const valid = await bcrypt.compare(pass, user.data.password);
        if (valid) {
            return user.data;
        }
        return null;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
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
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        const { password } = authCredentialsDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        authCredentialsDto.password = hashedPassword;
        const createUser = await this.usersService.create(authCredentialsDto);
        delete createUser.data.password;
        return createUser;
    }
    async signIn(user) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            website: user.website,
            avatar: user.avatar,
            subdomain: user.subdomain,
            userType: user.userType,
            department: user.department,
            reportsTo: user.reportsTo,
        };
        console.log("------------- SIGNIN------------");
        console.log(payload);
        console.log("------------- SIGNIN------------");
        return {
            success: true,
            message: 'User signed in successfully.',
            data: { accessToken: this.jwtService.sign(payload) },
        };
    }
    async validateUser(username, pass) {
        const queryUser = await this.usersService.findByUsername(username);
        const user = queryUser.data;
        if (!user.id) {
            return null;
        }
        const valid = bcrypt.compare(pass, user.password);
        if (valid) {
            return user;
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
/// <reference types="multer" />
import { AuthService } from './auth.service';
import { EditProfileDto } from './dto/editProfile.dto';
import { EditBrandDto } from './dto/edit-brand.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signupDto: any): Promise<import("./auth.service").ResponseData>;
    signIn(req: any): Promise<import("./auth.service").ResponseData>;
    update(brand: EditBrandDto, file: Express.Multer.File, req: any): Promise<import("./auth.service").ResponseData>;
    editProfile(editProfileDto: EditProfileDto, file: Express.Multer.File, req: any): Promise<import("./auth.service").ResponseData>;
    getMe(req: any): Promise<any>;
}

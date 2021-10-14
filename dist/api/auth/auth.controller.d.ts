import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: any): Promise<import("./auth.service").ResponseData>;
    signIn(req: any): Promise<import("./auth.service").ResponseData>;
    getMe(req: any): any;
}

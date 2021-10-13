import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<import("./auth.service").ResponseData>;
    signIn(req: any): Promise<import("./auth.service").ResponseData>;
    getMe(req: any): any;
}

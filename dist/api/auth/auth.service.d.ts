import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { QueryAuthUser } from './dto/query-auth-user.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(authCredentialsDto: CreateUserDto): Promise<ResponseData>;
    signIn(user: any): Promise<ResponseData>;
    validateUser(username: string, pass: string): Promise<Record<null, QueryAuthUser>>;
}

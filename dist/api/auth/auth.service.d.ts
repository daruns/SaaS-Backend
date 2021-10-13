import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/database/models/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
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
    validateUser(username: string, pass: string): Promise<UserModel>;
}

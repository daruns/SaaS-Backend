import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'src/api/auth/dto/signup.dto';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { QueryAuthUser } from './dto/query-auth-user.dto';
import { BrandsService } from '../brands/brands.service';
import { EditProfileDto } from './dto/editProfile.dto';
import { BoardModel } from 'src/database/models/board.model';
import { BoardAttributeModel } from 'src/database/models/boardAttribute.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class AuthService {
    private boardModelClass;
    private boardAttributeClass;
    private brandService;
    private usersService;
    private jwtService;
    constructor(boardModelClass: ModelClass<BoardModel>, boardAttributeClass: ModelClass<BoardAttributeModel>, brandService: BrandsService, usersService: UsersService, jwtService: JwtService);
    signUp(signupDto: SignupDto): Promise<ResponseData>;
    editProfile(editProfileDto: EditProfileDto, currentUser: any): Promise<ResponseData>;
    signIn(user: any): Promise<ResponseData>;
    verifyJwt(jwt: string): Promise<any>;
    validateUser(username: string, pass: string): Promise<Record<null, QueryAuthUser>>;
    me(id: number): Promise<any>;
}

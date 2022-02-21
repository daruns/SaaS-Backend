import { ModelClass } from 'objection';
import UserModel from 'src/database/models/user.model';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private userModel;
    constructor(authService: AuthService, userModel: ModelClass<UserModel>);
    validate(payload: any): Promise<any>;
}
export {};

import { QueryAuthUser } from './query-auth-user.dto';
export declare class SignupDto extends QueryAuthUser {
    username: string;
    password: string;
    subdomain: string;
    email: string;
}

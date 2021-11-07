import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { QueryAuthUser } from './query-auth-user.dto';

export class SignupDto extends QueryAuthUser{
	@IsNotEmpty({ message: 'Username is required' })
	username: string
	@IsNotEmpty({ message: 'Password is required' })
	@Length(8,30)
	password: string;
	@IsNotEmpty({ message: 'Company Name is required' })
	subdomain: string
	@IsNotEmpty({ message: 'Password is required' })
	@IsEmail()
	email: string;
}

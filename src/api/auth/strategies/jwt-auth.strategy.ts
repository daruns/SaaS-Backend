import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ModelClass } from 'objection';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserModel from 'src/database/models/user.model';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @Inject('UserModel') private userModel: ModelClass<UserModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const {id, username} = payload
    console.log("payload: ", payload, username, id)
    if (id && username) {
      const userExistence = await this.userModel.query().findOne({id: id, username: username})
      const user = await this.authService.me(userExistence?.id)
      return user;
    } else { throw new UnauthorizedException() }
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { QueryAuthUser } from '../dto/query-auth-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    ) {
    super();
  }

  async validate(username: string, password: string): Promise<Record<null,QueryAuthUser>> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      return null
    }
    return user
  }
}

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // handleRequest(err, user, info: Error) {
    //     if (info instanceof TokenExpireError) {
    //       // do stuff when token is expired
    //       console.log('token expired');
    //     }
    //     return user;
    // }    
}

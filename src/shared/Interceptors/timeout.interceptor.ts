import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Reject request if it take more time
    const timeOutLimit = Number(process.env.APP_TIMEOUT_LIMIT) | 5000
    return next.handle().pipe(timeout(timeOutLimit));
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  RequestTimeoutException,
  CallHandler,
} from '@nestjs/common';
import {  Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const appTimeoutLimit = Number(process.env.APP_TIMEOUT_LIMIT)
    // Reject request if it take more time
    const now = Date.now();
    return next.handle().pipe(
      // tap(() => console.log(`After... ${Date.now() - now}ms`)),
      timeout(appTimeoutLimit),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    );
  }
}

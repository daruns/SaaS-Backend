import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import * as fs from 'fs';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Get request items
    const request = context.switchToHttp().getRequest();
    if (request) {
      const method = request.method;
      const url = request.url;
      // Current date for differnce on console
      const now = Date.now();
      // Retrun next
      return next
        .handle()
        .pipe(
          tap(() =>
            Logger.log(
              `${method} ${url} ${Date.now() - now}ms`,
              context.getClass().name,
            )
          ),
          catchError(x => {
            fs.appendFile(
              __dirname + '/../../../logFile.log',
            `${method} ${url} ${Date.now() - now}ms --  ${context.getClass().name} --\tError:\t ${x}`, () => {}
            )
            return throwError(x)
          })
        );

    } else {
      return next.handle();
    }
  }
}

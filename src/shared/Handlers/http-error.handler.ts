import { get } from 'lodash';
import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    // log exception before return to user
    Logger.error('exception:');
    Logger.error(exception);
    // create message for logging in console
    const message = `[HttpErrorHandler] ${request.method} ${request.url}`;
    Logger.error(message);
    response.status(404).json({
      success: false,
      message: get(
        exception,
        'message.message',
        get(exception, 'message.error', 'Invalid url!'),
      ),
      data: {exception: exception},
    });
  }
}

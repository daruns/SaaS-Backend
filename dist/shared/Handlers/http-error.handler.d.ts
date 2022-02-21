import { ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
export declare class HttpErrorHandler implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}

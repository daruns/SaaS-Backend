import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, FileUploadService } from './app.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { HttpErrorHandler } from '../shared/Handlers/http-error.handler';
import { LoggingInterceptor } from '../shared/Interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../shared/Interceptors/timeout.interceptor';
import { ApiModule } from 'src/api/api.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { CanGuard } from 'src/api/auth/guards/can.guard';
import { CanService } from 'src/api/auth/can/can.service';

@Module({
  imports: [ApiModule, CanService,DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    FileUploadService,
    CanService,
    {
      provide: APP_GUARD,
      useFactory: (ref,can) => new CanGuard(ref,can),
      inject: [Reflector,CanService],
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})

export class AppModule {}

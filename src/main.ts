import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomValidatePipe } from './shared/pipes/validation.pipes';
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import { config } from "aws-sdk";
// import { readFileSync } from 'fs';
import * as fs from 'fs';

import * as http from 'http';
import * as https from 'https';

// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Read port number from env file
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: Number(process.env.RATELIMIT_MINS) * 60 * 1000, // 15 minutes
  max: Number(process.env.RATELIMIT_REQUEST_COUNTS), // limit each IP to 100 requests per windowMs
  message: "Too many Requests from this Device and IP, please try again after an Half Hour"
});

async function bootstrap() {
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  })
  Logger.log(`AWS S3 Bucket Region: ${config.region}`,'AWSRigistor');

  // Create nestFactory instance for make server instance
  let httpsOptions;
  if (process.env.NODE_ENV === "production") {
    httpsOptions = {
      key: fs.readFileSync(process.env.SSL_PATH, 'utf8'),
      cert: fs.readFileSync(process.env.SSL_PATH, 'utf8'),
    }
  } else {
    httpsOptions = {}
  }
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {httpsOptions}
  );
  app.use(limiter);

  // const options = new DocumentBuilder()
  //   .setTitle("Oneconnect UI")
  //   .setDescription(`The Oneconnect API description`)
  //   .setVersion("1.0.0")
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('swagger', app, document);
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  // app.set('trust proxy', 1);

  // Custome validation on request using pipe and class-validator
  app.enableCors();
  app.useGlobalPipes(new CustomValidatePipe());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true, // allow conversion underneath
    },
  }));

  // Add prefix to all api for request
  app.setGlobalPrefix('api/v1');

  Logger.log(`Server ready at http://127.0.0.1:${port} `, 'ServerStarted');
  // Run server on port
  await app.listen(port);
}
bootstrap();

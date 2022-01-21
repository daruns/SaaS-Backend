"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const validation_pipes_1 = require("./shared/pipes/validation.pipes");
const rateLimit = require("express-rate-limit");
const aws_sdk_1 = require("aws-sdk");
const fs = require("fs");
const port = process.env.PORT || 3000;
const limiter = rateLimit({
    windowMs: Number(process.env.RATELIMIT_MINS) * 60 * 1000,
    max: Number(process.env.RATELIMIT_REQUEST_COUNTS),
    message: "Too many Requests from this Device and IP, please try again after an Half Hour"
});
async function bootstrap() {
    aws_sdk_1.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    common_1.Logger.log(`AWS S3 Bucket Region: ${aws_sdk_1.config.region}`, 'AWSRigistor');
    let httpsOptions;
    if (process.env.NODE_ENV === "production") {
        httpsOptions = {
            key: fs.readFileSync(process.env.SSL_PATH, 'utf8'),
            cert: fs.readFileSync(process.env.SSL_PATH, 'utf8'),
        };
    }
    else {
        httpsOptions = {};
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.use(limiter);
    app.enableCors();
    app.useGlobalPipes(new validation_pipes_1.CustomValidatePipe());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api/v1');
    common_1.Logger.log(`Server ready at http://127.0.0.1:${port} `, 'ServerStarted');
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
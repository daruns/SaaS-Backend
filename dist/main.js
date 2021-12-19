"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const validation_pipes_1 = require("./shared/pipes/validation.pipes");
const rateLimit = require("express-rate-limit");
const aws_sdk_1 = require("aws-sdk");
const cors = require("cors");
const port = process.env.PORT || 3000;
const limiter = rateLimit({
    windowMs: Number(process.env.RATELIMIT_MINS) * 60 * 1000,
    max: Number(10000),
    message: "Too many Requests from this Device and IP, please try again after an Half Hour"
});
async function bootstrap() {
    aws_sdk_1.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    common_1.Logger.log(`AWS S3 Bucket Region: ${aws_sdk_1.config.region}`, 'AWSRigistor');
    const corsConfig = {
        credentials: true,
        origin: function (origin, callback) {
            callback(null, true);
        },
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors(corsConfig));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:5000");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
    app.use(limiter);
    app.useGlobalPipes(new validation_pipes_1.CustomValidatePipe());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.setGlobalPrefix('api/v1');
    common_1.Logger.log(`Server ready at http://127.0.0.1:${port} `, 'ServerStarted');
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
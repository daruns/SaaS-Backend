"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const validation_pipes_1 = require("./shared/pipes/validation.pipes");
const port = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new validation_pipes_1.CustomValidatePipe());
    app.setGlobalPrefix('api/v1');
    common_1.Logger.log(`Server ready at http://localhost:${port} `, 'ServerStarted');
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
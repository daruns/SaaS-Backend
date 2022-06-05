"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Can = void 0;
const common_1 = require("@nestjs/common");
exports.Can = (subject, action) => common_1.SetMetadata('can-attributes', { subject: subject, action: action });
//# sourceMappingURL=can.decorator.js.map
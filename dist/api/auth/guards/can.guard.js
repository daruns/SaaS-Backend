"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
class CanGuard extends passport_1.AuthGuard('jwt') {
    constructor(reflector, can) {
        super();
        this.reflector = reflector;
        this.can = can;
    }
    async handleRequest(err, user, info, context) {
        const request = context.switchToHttp().getRequest();
        const canAttributes = this.reflector.get('can-attributes', context.getHandler());
        if (canAttributes && canAttributes.subject && canAttributes.action && user) {
            const canActivate = await this.can.can(user, canAttributes.action, canAttributes.subject);
            if (canActivate !== true)
                throw new common_1.UnauthorizedException();
        }
        return true;
    }
}
exports.CanGuard = CanGuard;
//# sourceMappingURL=can.guard.js.map
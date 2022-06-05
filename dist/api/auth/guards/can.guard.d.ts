import { Reflector } from '@nestjs/core';
import { CanService } from '../can/can.service';
declare const CanGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CanGuard extends CanGuard_base {
    private readonly reflector;
    private readonly can;
    constructor(reflector: Reflector, can: CanService);
    handleRequest(err: any, user: any, info: Error, context: any): Promise<boolean>;
}
export {};

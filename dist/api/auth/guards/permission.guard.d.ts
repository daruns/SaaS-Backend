import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModelClass } from 'objection';
import UserModel from 'src/database/models/user.model';
export declare class RolesGuard implements CanActivate {
    private userModelClass;
    private reflector;
    constructor(userModelClass: ModelClass<UserModel>, reflector: Reflector);
    canActivate(context: any): Promise<boolean>;
}

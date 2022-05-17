import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModelClass } from 'objection';
import UserModel from 'src/database/models/user.model';
export declare class RolesGuard implements CanActivate {
    private userModelClass;
    constructor(userModelClass: ModelClass<UserModel>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

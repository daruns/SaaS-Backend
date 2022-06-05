import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
import PermissionModel from 'src/database/models/permission.model';
export declare class CanService {
    private modelClass;
    private permissionClass;
    constructor(modelClass: ModelClass<UserModel>, permissionClass: ModelClass<PermissionModel>);
    can(currentUser: any, action: string, subject: string): Promise<boolean>;
}

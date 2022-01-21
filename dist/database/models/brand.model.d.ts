import { BaseModel } from './base.model';
import { UserModel } from './user.model';
export declare class BrandModel extends BaseModel {
    static tableName: string;
    brandCode: string;
    subdomain: string;
    name: string;
    logo: string;
    companySize: number;
    owner: string;
    address: string;
    announcedAt: Date;
    branches: string;
    occupation: string;
    website: string;
    phoneNumber: string;
    email: string;
    users: UserModel[];
    static relationMappings: {
        users: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default BrandModel;

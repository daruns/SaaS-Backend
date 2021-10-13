import { Model } from 'objection';
export declare class BaseModel extends Model {
    readonly id: number;
    status: string;
    deleted: number;
    createdBy: string;
    updatedBy: string;
}

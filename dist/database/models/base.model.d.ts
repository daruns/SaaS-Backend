import { Model } from 'objection';
export declare class BaseModel extends Model {
    $beforeInsert(): void;
    readonly id: number;
    status: string;
    deleted: number;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

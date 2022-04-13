import { BaseModel } from './base.model';
import { Model } from 'objection';

const tableName = 'leaveTypes';
export class LeaveTypeModel extends BaseModel {
  static tableName = tableName;
  name: string
  fund: number
  days: number
  urgent: boolean
  brandCode: string

  static relationMappings = {
    leaves: {
      modelClass: `${__dirname}/leave.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'leaves.leaveTypeId',
      },
    },
  };
}

export default LeaveTypeModel

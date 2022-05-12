import { BaseModel } from './base.model';
import { Model } from 'objection';
import LeaveModel from './leave.model';

const tableName = 'leaveTypes';
export class LeaveTypeModel extends BaseModel {
  static tableName = tableName;
  name: string
  fund: number
  days: number
  hours: number
  durationType: string
  urgent: boolean
  brandCode: string

  leaves: LeaveModel[];
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

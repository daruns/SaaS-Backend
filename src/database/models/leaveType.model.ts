import { BaseModel } from './base.model';
import { Model } from 'objection';

const tbName = 'leaveTypes';
export class LeaveTypeModel extends BaseModel {
  static tableName = tbName;
  name: string
  maxDays: number
  days: number
  brandCode: string
}

export default LeaveTypeModel

import { Model } from 'objection';
import { BaseModel } from './base.model';

const tableName = 'attendances'
export class AttendanceModel extends BaseModel {
  static tableName = tableName;
  checkedIn: boolean
  employeeId: number
  brandCode: string

  static relationMappings = {
    employee: {
      modelClass: `${__dirname}/employee.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.employeeId`,
        to: 'employees.id',
      },
    },
  };
}

export default AttendanceModel

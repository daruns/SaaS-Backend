import { BaseModel } from './base.model';

const tableName = 'attendances'
export class AttendanceModel extends BaseModel {
  static tableName = tableName;
  checkedIn: boolean
  employeeId: number
  brandCode: string
}

export default AttendanceModel

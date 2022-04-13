import { BaseModel } from './base.model';
import { Model } from 'objection';
import { EmployeeModel } from './employee.model';
import LeaveTypeModel from './leaveType.model';
import LeaveApprovalModel from './leaveApproval.model';

const tableName = 'leaves'
export class LeaveModel extends BaseModel {
  static tableName = tableName;
  name: string
  description: string
  from: Date
  to: Date
  currentBalance: number
  remainBalance: number
  employeeId: number
  leaveTypeId: number

  employee: EmployeeModel;
  leaveType: LeaveTypeModel;
  leaveApprovals: LeaveApprovalModel[];

  static relationMappings = {
    // list of all employee on current employee
    employee: {
      modelClass: `${__dirname}/employee.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.employeeId`,
        to: 'employees.id',
      },
    },
    leaveType: {
      modelClass: `${__dirname}/leaveType.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.leaveTypeId`,
        to: 'leaveTypes.id',
      },
    },
    leaveApprovals: {
      modelClass: `${__dirname}/leaveApproval.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'leaveApprovals.leaveId',
      },
    }
  };
}

export default LeaveModel

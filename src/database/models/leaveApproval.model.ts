import { BaseModel } from './base.model';
import { Model } from 'objection';
import { EmployeeModel } from './employee.model';
import { LeaveModel } from './leave.model';

const tbName = 'leaveApprovals'
export class LeaveApprovalModel extends BaseModel {
  static tableName = tbName;

  leaveId: number;
  managerId: number;
  brandCode: string

  manager: EmployeeModel;
  leave: LeaveModel;

  static relationMappings = {
    leave: {
      modelClass: `${__dirname}/leave.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.leaveId`,
        to: 'leaves.id',
      },
    },
    manager: {
      modelClass: `${__dirname}/employee.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.managerId`,
        to: 'employees.id',
      },
    },
  };
}

export default LeaveApprovalModel

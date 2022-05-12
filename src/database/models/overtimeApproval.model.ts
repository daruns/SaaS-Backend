import { BaseModel } from './base.model';
import { Model } from 'objection';
import { EmployeeModel } from './employee.model';
import { OvertimeModel } from './overtime.model';

const tbName = 'overtimeApprovals'
export class OvertimeApprovalModel extends BaseModel {
  static tableName = tbName;

  overtimeId: number;
  managerId: number;
  brandCode: string

  manager: EmployeeModel;
  overtime: OvertimeModel;

  static relationMappings = {
    overtime: {
      modelClass: `${__dirname}/overtime.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.overtimeId`,
        to: 'overtimes.id',
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

export default OvertimeApprovalModel

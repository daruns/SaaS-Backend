import { BaseModel } from './base.model';
import { Model } from 'objection';
import { EmployeeModel } from './employee.model';
import OvertimeTypeModel from './overtimeType.model';
import OvertimeApprovalModel from './overtimeApproval.model';

const tableName = 'overtimes'
export class OvertimeModel extends BaseModel {
  static tableName = tableName;
  name: string
  description: string
  from: Date
  to: Date
  currentBalance: number
  remainBalance: number
  employeeId: number
  overtimeTypeId: number

  employee: EmployeeModel;
  overtimeType: OvertimeTypeModel;
  overtimeApprovals: OvertimeApprovalModel[];

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
    overtimeType: {
      modelClass: `${__dirname}/overtimeType.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.overtimeTypeId`,
        to: 'overtimeTypes.id',
      },
    },
    overtimeApprovals: {
      modelClass: `${__dirname}/overtimeApproval.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'overtimeApprovals.overtimeId',
      },
    }
  };
}

export default OvertimeModel

import { BaseModel } from './base.model';
import { Model } from 'objection';
import DepartmentModel from './department.model';

const tbName = 'designations';
export class DesignationModel extends BaseModel {
  static tableName = tbName;
  name: string
  departmentName: string
  departmentId: number
  brandCode: string

  department: DepartmentModel;

  static relationMappings = {
    department: {
      modelClass: `${__dirname}/department.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.departmentId`,
        to: 'departments.id',
      },
    },
  };
}

export default DesignationModel

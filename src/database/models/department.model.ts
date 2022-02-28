import { BaseModel } from './base.model';
import { Model } from 'objection';
import DesignationModel from './designation.model';

const tbName = 'departments';
export class DepartmentModel extends BaseModel {
  static tableName = tbName;
  name: string
  brandCode: string

  designations: DesignationModel[];

  static relationMappings = {
    designations: {
      modelClass: `${__dirname}/designation.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'designations.departmentId',
      },
    },
  };
}

export default DepartmentModel

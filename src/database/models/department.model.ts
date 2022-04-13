import { BaseModel } from './base.model';
import { Model } from 'objection';
import DesignationModel from './designation.model';

const tableName = 'departments';
export class DepartmentModel extends BaseModel {
  static tableName = tableName;
  name: string
  brandCode: string

  designations: DesignationModel[];

  static relationMappings = {
    designations: {
      modelClass: `${__dirname}/designation.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'designations.departmentId',
      },
    },
  };
}

export default DepartmentModel

import { BaseModel } from './base.model';
import { Model } from 'objection';
import OvertimeModel from './overtime.model';

const tableName = 'overtimeTypes';
export class OvertimeTypeModel extends BaseModel {
  static tableName = tableName;
  name: string
  fund: number
  days: number
  hours: number
  durationType: string
  urgent: boolean
  brandCode: string

  overtimes: OvertimeModel[];
  static relationMappings = {
    overtimes: {
      modelClass: `${__dirname}/overtime.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'overtimes.overtimeTypeId',
      },
    },
  };
}

export default OvertimeTypeModel

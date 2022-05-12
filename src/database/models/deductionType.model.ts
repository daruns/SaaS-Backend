import { BaseModel } from './base.model';
import { Model } from 'objection';

const tableName = 'deductionTypes';
export class DeductionTypeModel extends BaseModel {
  static tableName = tableName;
  name: string
  type: string
  fund: number
  rate: number
  durationType: string
  brandCode: string

  static relationMappings = {
    deductions: {
      modelClass: `${__dirname}/deduction.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'deductions.deductionTypeId',
      },
    },
  };
}

export default DeductionTypeModel

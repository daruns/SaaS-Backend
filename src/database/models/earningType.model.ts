import { BaseModel } from './base.model';
import { Model } from 'objection';

const tableName = 'earningTypes';
export class EarningTypeModel extends BaseModel {
  static tableName = tableName;
  name: string
  type: string
  fund: number
  rate: number
  durationType: string
  brandCode: string

  static relationMappings = {
    earnings: {
      modelClass: `${__dirname}/earning.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'earnings.earningTypeId',
      },
    },
  };
}

export default EarningTypeModel

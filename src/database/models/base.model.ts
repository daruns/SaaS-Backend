import moment = require('moment');
import { Model } from 'objection';

export class BaseModel extends Model {
  $beforeUpdate() {
    this.updatedAt = moment().format().toString();
  }
  $beforeCreate() {
    this.createdAt = moment().format().toString();
    this.updatedAt = moment().format().toString();
  }

  static async afterCreate({ items, inputItems, relation }) {
    console.log('items:     ', items);
    console.log('inputItems:', inputItems);
    console.log('relation:  ', relation ? relation.name : 'none');
  }
  static async afterPatch({ items, inputItems, relation }) {
    console.log('items:     ', items);
    console.log('inputItems:', inputItems);
    console.log('relation:  ', relation ? relation.name : 'none');
  }

  readonly id: number;
  status: string;
  deleted: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;

}

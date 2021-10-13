import { Model } from 'objection';

export class BaseModel extends Model {
  // static async beforeUpdate({ items, inputItems, relation }) {
  //   console.log('items:     ', items);
  //   console.log('inputItems:', inputItems);
  //   console.log('relation:  ', relation ? relation.name : 'none');
  // }
  // static async afterUpdate({ items, inputItems, relation }) {
  //   console.log('items:     ', items);
  //   console.log('inputItems:', inputItems);
  //   console.log('relation:  ', relation ? relation.name : 'none');
  // }
  // static async afterInsert({ items, inputItems, relation }) {
  //   console.log('items:     ', items);
  //   console.log('inputItems:', inputItems);
  //   console.log('relation:  ', relation ? relation.name : 'none');
  // }

  readonly id: number;
  status: string;
  deleted: number;
  createdBy: string;
  updatedBy: string;
}

import { BaseModel } from './base.model';
// import { Model } from 'objection';

export class ClientModel extends BaseModel {
  static tableName = 'clients';

  name:string
  phoneNumber:string
  businessPhoneNumber1:string
  businessPhoneNumber2:string
  email:string
  website:string
  address:string
  rate:number
  status:string
  description:string
  clientType:string
  businessType:string
  deleted:number
  createdBy:string
  updatedBy:string

//   fullName() {
//     return this.firstName + ' ' + this.lastName;
//   }


//   static relationMappings = {
//     // list of all post on current user
//     posts: {
//       modelClass: `${__dirname}/post.model`,
//       relation: Model.HasManyRelation,
//       join: {
//         from: 'users.id',
//         to: 'posts.id',
//       },
//     },
//   };
}

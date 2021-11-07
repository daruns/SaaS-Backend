import { Module, Global } from '@nestjs/common';
import { map } from 'lodash';
import * as Knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from './knex';

// import { readdirSync } from 'fs'

// automate importing and reading models from models directory and push them to array without rewrite them

// var sa = readdirSync('./src/database/models')
// const models = []
// delete(sa['base.model.ts'])
// sa.forEach(e => {
//     var modelName = e.split('.') //[0].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
//     modelName.splice(-1,1); // remove .ts extension
//     !(modelName.indexOf('base.model') < 0 ) ? modelName.splice(modelName.indexOf('base.model'), 1) : null
//     eval('import { '+modelName+'Model } from \'./src/database/models/' + modelName.join('.') + '\'');
//     models.push(eval(modelName+'Model'))
// })

// !IMPORTANT import and add model class names here whenever you add a new model file in models directory './models/' 
import { UserModel } from './models/user.model';
import { RoleModel } from './models/role.model';
import { UserRoleModel } from './models/userRole.model';
import { ClientModel } from './models/client.model';
import { PermissionModel } from './models/permission.model';
import { ClientContactModel } from './models/clientContact.model';
import { SocialMediaModel } from './models/socialMedia.model';
import { MeetingModel } from './models/meeting.model';
import { InventoryItemModel } from './models/inventoryItem.model';
import { NonInventoryItemModel } from './models/nonInventoryItem.model';
import { ServiceItemModel } from './models/serviceItem.model';
import { BrandModel } from './models/brand.model';
import { SubServiceItemModel } from './models/subServiceItem.model';
import { InvoiceModel } from './models/invoice.model';
import { InvoiceItemModel } from './models/invoiceItem.model';
import { QouteModel } from './models/qoute.model';
import { QouteItemModel } from './models/qouteItem.model';
import { ProjectModel } from './models/project.model';
import { ProjectLeaderModel } from './models/projectLeader.model';
import { ProjectMemberModel } from './models/projectMember.model';
import { BoardModel } from './models/board.model';
import { BoardAttributeModel } from './models/boardAttribute.model';
import { TaskModel } from './models/task.model';
import { TaskMemberModel } from './models/taskMember.model';

const models = [
  UserModel,
  RoleModel,
  PermissionModel,
  ClientModel,
  ClientContactModel,
  SocialMediaModel,
  MeetingModel,
  UserRoleModel,
  InventoryItemModel,
  NonInventoryItemModel,
  ServiceItemModel,
  SubServiceItemModel,
  BrandModel,
  InvoiceModel,
  InvoiceItemModel,
  QouteModel,
  QouteItemModel,
  ProjectModel,
  ProjectLeaderModel,
  ProjectMemberModel,
  BoardModel,
  BoardAttributeModel,
  TaskModel,
  TaskMemberModel,
];

const modelProvider = map(models, model => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProvider,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = await Knex(knexConfig);
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}

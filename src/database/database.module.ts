import { Module, Global } from '@nestjs/common';
import { map } from 'lodash';
import * as Knex from 'knex';
import { Model } from 'objection';

import * as knexConfig from './knex';
import { UserModel } from './models/user.model';
import { GroupModel } from './models/group.model';
import { ClientModel } from './models/client.model';
import { PermissionModel } from './models/permission.model';
import { ClientContactModel } from './models/clientContact.model';

const models = [UserModel, GroupModel, PermissionModel, ClientModel, ClientContactModel];

const modelProvider = map(models, model => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProvider,
  // {
  //   provide: ClientModel.name,
  //   useValue: ClientModel,
  // },
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

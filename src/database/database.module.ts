import { Module, Global, Type, Logger } from '@nestjs/common';
import { map } from 'lodash';
import * as Knex from 'knex';
import { Model, ModelClass } from 'objection';
import * as knexConfig from './knex';
import * as fs from "fs"
import * as path from "path"

export const ALL_MODELS = fs.readdirSync(path.join(path.dirname(__filename), 'models'))
.filter((file) => (file.endsWith('.model.js') || file.endsWith('.model.ts')) && !file.endsWith('.d.ts') && file != "base.model.ts" && file != "base.model.js")

const slsls = ALL_MODELS.map((file) => {
  let requiredModel = require(`./models/${file}`).default as Type<void>;
  if (requiredModel) {
    Logger.log(`${requiredModel?.name} Model Table Loaded successfully`,'ModelLoader');
    return {
      provide: requiredModel.name,
      useValue: requiredModel,
    }
  }
})

const providers = [
  ...slsls,
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

import { UserModel } from '../models/user.model';
import { Logger } from '@nestjs/common';
import { BrandModel } from '../models/brand.model';

exports.seed = async knex => {
  Logger.log('Starting truncating tables');
  // set foreign key check false
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');

  if (await knex.schema.hasTable('brands')) {
    // remove all current user from data base if presents
    await UserModel.query(knex).truncate();
  }
  // set foreign key check true
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

  Logger.log('Ending truncating tables');
};

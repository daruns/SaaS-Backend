import { Injectable, Inject } from '@nestjs/common';
import { ExpenseCategoryModel } from 'src/database/models/expenseCategory.model';
import { ModelClass } from 'objection';
import { CreateUserDto } from '../auth/apps/users/dto/create-user.dto';
import { CreateExpenseCategoryDto } from './dto/create-expenseCategory.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expenseCategory.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ExpenseCategoriesService {
  constructor(
    @Inject('ExpenseCategoryModel') private modelClass: ModelClass<ExpenseCategoryModel>,
  ) {}

  // expenseCategory list
  async findAll(currentUser): Promise<ResponseData> {
    const expenseCategories = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .withGraphFetched({
      expenseSubCategories: {
        expenseChildSubCategories: {}
      }
    })
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: expenseCategories,
    };
  }

  // find one expenseCategory info by expenseCategoryId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const expenseCategory = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .withGraphFetched({
        expenseSubCategories: {}
      })
    if (expenseCategory) {
      return {
        success: true,
        message: 'ExpenseCategory details fetch successfully.',
        data: expenseCategory,
      };
    } else {
      return {
        success: false,
        message: 'No expenseCategory details found.',
        data: {},
      };
    }
  }

  // Create expenseCategory before save encrypt password
  async create(payload: CreateExpenseCategoryDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const expenseCategoryPayload = payload
    const newExpenseCategory = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: expenseCategoryPayload.name
    })
    if (!newExpenseCategory) {
      expenseCategoryPayload['createdBy'] = currentUser.username
      expenseCategoryPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(expenseCategoryPayload);
      const createExpenseCategory = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'ExpenseCategory created successfully.',
        data: createExpenseCategory,
      };
    } else {
      return {
        success: false,
        message: 'ExpenseCategory already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateExpenseCategoryDto, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const expenseCategoryPayload = payload
    const expenseCategory = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(expenseCategoryPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (expenseCategory) {
      const updatedExpenseCategory = await this.modelClass
        .query()
        .update({
          name: expenseCategoryPayload.name ? expenseCategoryPayload.name : expenseCategory.name,
          description: expenseCategoryPayload.description ? expenseCategoryPayload.description : expenseCategory.description,
          // status: expenseCategoryPayload.status ? expenseCategoryPayload.status : expenseCategory.status,
          // deleted: expenseCategoryPayload.deleted ? expenseCategoryPayload.deleted : expenseCategory.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: expenseCategoryPayload.id });
      return {
        success: true,
        message: 'ExpenseCategory details updated successfully.',
        data: updatedExpenseCategory,
      };
    } else {
      return {
        success: false,
        message: 'No expenseCategory found.',
        data: {},
      };
    }
  }

  // Delete expenseCategory
  async deleteById(expenseCategoryId: number, currentUser): Promise<ResponseData> {
    const CUser = currentUser;
    const expenseCategories = await this.modelClass.query()
      .where({
        brandCode: CUser.brandCode,
        id: expenseCategoryId
      })
      .delete()
    if (expenseCategories) {
      return {
        success: true,
        message: 'ExpenseCategory deleted successfully.',
        data: expenseCategories,
      };
    } else {
      return {
        success: false,
        message: 'No expenseCategory found.',
        data: {},
      };
    }
  }
}

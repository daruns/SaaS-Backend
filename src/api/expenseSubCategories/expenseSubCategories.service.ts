import { Injectable, Inject } from '@nestjs/common';
import { ExpenseSubCategoryModel } from 'src/database/models/expenseSubCategory.model';
import { ModelClass } from 'objection';
import { CreateExpenseSubCategoryDto } from './dto/create-expenseSubCategory.dto';
import { UpdateExpenseSubCategoryDto } from './dto/update-expenseSubCategory.dto';
import { ExpenseCategoriesService } from '../expenseCategories/expenseCategories.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ExpenseSubCategoriesService {
  constructor(
    @Inject('ExpenseSubCategoryModel') private modelClass: ModelClass<ExpenseSubCategoryModel>,
    private readonly expenseCategoryService: ExpenseCategoriesService,
  ) {}

  // expenseSubCategory list
  async findAll(currentUser): Promise<ResponseData> {
    const expenseSubCategories = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: expenseSubCategories,
    };
  }

  // find one expenseSubCategory info by expenseSubCategoryId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const expenseSubCategory = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (expenseSubCategory) {
      return {
        success: true,
        message: 'ExpenseSubCategory details fetch successfully.',
        data: expenseSubCategory,
      };
    } else {
      return {
        success: false,
        message: 'No expenseSubCategory details found.',
        data: {},
      };
    }
  }

  // Create expenseSubCategory before save encrypt password
  async create(payload: CreateExpenseSubCategoryDto, currentUser): Promise<ResponseData> {
    const expenseSubCategoryPayload = payload
    const newExpenseSubCategory = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: expenseSubCategoryPayload.name
    })
    if (!newExpenseSubCategory) {
      if (expenseSubCategoryPayload.expenseCategoryId) {
        const clientFnd = await this.expenseCategoryService.findById(expenseSubCategoryPayload.expenseCategoryId,currentUser)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'expenseCategory doesnt exist.',
            data: {},
          };
        }
      }

      expenseSubCategoryPayload['createdBy'] = currentUser.username
      expenseSubCategoryPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(expenseSubCategoryPayload);
      const createExpenseSubCategory = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'ExpenseSubCategory created successfully.',
        data: createExpenseSubCategory,
      };
    } else {
      return {
        success: false,
        message: 'ExpenseSubCategory already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateExpenseSubCategoryDto, currentUser): Promise<ResponseData> {
    const expenseSubCategoryPayload = payload
    const expenseSubCategory = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(expenseSubCategoryPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (expenseSubCategory) {
      const updatedExpenseSubCategory = await this.modelClass
        .query()
        .update({
          name: expenseSubCategoryPayload.name ? expenseSubCategoryPayload.name : expenseSubCategory.name,
          description: expenseSubCategoryPayload.description ? expenseSubCategoryPayload.description : expenseSubCategory.description,
          // status: expenseSubCategoryPayload.status ? expenseSubCategoryPayload.status : expenseSubCategory.status,
          // deleted: expenseSubCategoryPayload.deleted ? expenseSubCategoryPayload.deleted : expenseSubCategory.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: expenseSubCategoryPayload.id });
      return {
        success: true,
        message: 'ExpenseSubCategory details updated successfully.',
        data: updatedExpenseSubCategory,
      };
    } else {
      return {
        success: false,
        message: 'No expenseSubCategory found.',
        data: {},
      };
    }
  }

  // Delete expenseSubCategory
  async deleteById(expenseSubCategoryId: number, currentUser): Promise<ResponseData> {
    const expenseSubCategories = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: expenseSubCategoryId
      })
      .delete()
    if (expenseSubCategories) {
      return {
        success: true,
        message: 'ExpenseSubCategory deleted successfully.',
        data: expenseSubCategories,
      };
    } else {
      return {
        success: false,
        message: 'No expenseSubCategory found.',
        data: {},
      };
    }
  }
}

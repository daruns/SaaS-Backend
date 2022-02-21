import { Injectable, Inject } from '@nestjs/common';
import { ExpenseChildSubCategoryModel } from 'src/database/models/expenseChildSubCategory.model';
import { ModelClass } from 'objection';
import { CreateExpenseChildSubCategoryDto } from './dto/create-expenseChildSubCategory.dto';
import { UpdateExpenseChildSubCategoryDto } from './dto/update-expenseChildSubCategory.dto';
import { ExpenseSubCategoriesService } from '../expenseSubCategories/expenseSubCategories.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ExpenseChildSubCategoriesService {
  constructor(
    @Inject('ExpenseChildSubCategoryModel') private modelClass: ModelClass<ExpenseChildSubCategoryModel>,
    private readonly expenseSubCategoryService: ExpenseSubCategoriesService,
  ) {}

  // expenseChildSubCategory list
  async findAll(currentUser): Promise<ResponseData> {
    const expenseChildSubCategories = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: expenseChildSubCategories,
    };
  }

  // find one expenseChildSubCategory info by expenseChildSubCategoryId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const expenseChildSubCategory = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (expenseChildSubCategory) {
      return {
        success: true,
        message: 'ExpenseChildSubCategory details fetch successfully.',
        data: expenseChildSubCategory,
      };
    } else {
      return {
        success: false,
        message: 'No expenseChildSubCategory details found.',
        data: {},
      };
    }
  }

  // Create expenseChildSubCategory before save encrypt password
  async create(payload: CreateExpenseChildSubCategoryDto, currentUser): Promise<ResponseData> {
    const expenseChildSubCategoryPayload = payload
    const newExpenseChildSubCategory = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: expenseChildSubCategoryPayload.name
    })
    if (!newExpenseChildSubCategory) {
      if (expenseChildSubCategoryPayload.expenseSubCategoryId) {
        const clientFnd = await this.expenseSubCategoryService.findById(expenseChildSubCategoryPayload.expenseSubCategoryId,currentUser)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'expenseSubCategory doesnt exist.',
            data: {},
          };
        }
      }

      expenseChildSubCategoryPayload['createdBy'] = currentUser.username
      expenseChildSubCategoryPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(expenseChildSubCategoryPayload);
      const createExpenseChildSubCategory = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'ExpenseChildSubCategory created successfully.',
        data: createExpenseChildSubCategory,
      };
    } else {
      return {
        success: false,
        message: 'ExpenseChildSubCategory already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateExpenseChildSubCategoryDto, currentUser): Promise<ResponseData> {
    const expenseChildSubCategoryPayload = payload
    const expenseChildSubCategory = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(expenseChildSubCategoryPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (expenseChildSubCategory) {
      const updatedExpenseChildSubCategory = await this.modelClass
        .query()
        .update({
          name: expenseChildSubCategoryPayload.name ? expenseChildSubCategoryPayload.name : expenseChildSubCategory.name,
          description: expenseChildSubCategoryPayload.description ? expenseChildSubCategoryPayload.description : expenseChildSubCategory.description,
          // status: expenseChildSubCategoryPayload.status ? expenseChildSubCategoryPayload.status : expenseChildSubCategory.status,
          // deleted: expenseChildSubCategoryPayload.deleted ? expenseChildSubCategoryPayload.deleted : expenseChildSubCategory.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: expenseChildSubCategoryPayload.id });
      return {
        success: true,
        message: 'ExpenseChildSubCategory details updated successfully.',
        data: updatedExpenseChildSubCategory,
      };
    } else {
      return {
        success: false,
        message: 'No expenseChildSubCategory found.',
        data: {},
      };
    }
  }

  // Delete expenseChildSubCategory
  async deleteById(expenseChildSubCategoryId: number, currentUser): Promise<ResponseData> {
    const expenseChildSubCategories = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: expenseChildSubCategoryId
      })
      .delete()
    if (expenseChildSubCategories) {
      return {
        success: true,
        message: 'ExpenseChildSubCategory deleted successfully.',
        data: expenseChildSubCategories,
      };
    } else {
      return {
        success: false,
        message: 'No expenseChildSubCategory found.',
        data: {},
      };
    }
  }
}

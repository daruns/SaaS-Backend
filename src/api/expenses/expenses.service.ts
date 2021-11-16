import { Injectable, Inject } from '@nestjs/common';
import { ExpenseModel } from 'src/database/models/expense.model';
import { ExpenseItemModel } from 'src/database/models/expenseItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { CreateExpenseDto, CreateExpenseItemDto } from './dto/create-expense.dto';
import { PassCreateExpenseDto, PassCreateExpenseItemDto } from './dto/passCreate-expense.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TaxesService } from '../taxes/taxes.service';
import { PaymentMethodsService } from '../paymentMethods/paymentMethods.service';
import { ExpenseCategoriesService } from '../expenseCategories/expenseCategories.service';
import { ExpenseSubCategoriesService } from '../expenseSubCategories/expenseSubCategories.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ExpensesService {
  constructor(
    @Inject('ExpenseModel') private modelClass: ModelClass<ExpenseModel>,
    // @Inject('ExpenseItemModel') private expenseItemModel: ModelClass<ExpenseItemModel>,
    private readonly supplierService: SuppliersService,
    private readonly taxService: TaxesService,
    private readonly paymentMethodService: PaymentMethodsService,
    private readonly categoryService: ExpenseCategoriesService,
    private readonly subCategoryService: ExpenseSubCategoriesService,
  ) {}

  // expense list
  async findAll(currentUser): Promise<ResponseData> {
    const expenses = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .withGraphFetched({
      supplier: {},
      tax: {},
      paymentMethod: {},
      expenseItems: {},
  });
    return {
      success: true,
      message: 'Expenses details fetch successfully.',
      data: expenses,
    };
  }

  // find one expense info by expenseId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const expense = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
      .withGraphFetched({
        supplier: {},
        tax: {},
        paymentMethod: {},
        expenseItems: {},
      });
    if (expense) {
      return {
        success: true,
        message: 'Expense details fetch successfully.',
        data: expense,
      };
    } else {
      return {
        success: false,
        message: 'No expense details found.',
        data: {},
      };
    }
  }

  // Create expense before save encrypt password
  async create(payload: CreateExpenseDto, items: Array<CreateExpenseItemDto>, currentUser): Promise<ResponseData> {
    const expensePayload: any = {...payload}
    const expenseItemsPayload: Array<CreateExpenseItemDto> = items
    if (!expenseItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }
    const taxFnd = await this.taxService.findById(expensePayload.taxId,currentUser)
    if (!taxFnd.success) {
      return {
        success: false,
        message: 'Tax doesnt exist.',
        data: {},
      };
    }
    expensePayload.taxRate = taxFnd.data.rate
    console.log(taxFnd)
    const supplierFnd = await this.supplierService.findById(expensePayload.supplierId,currentUser)
    if (!supplierFnd.success) {
      return {
        success: false,
        message: 'Supplier doesnt exist.',
        data: {},
      };
    }
    const paymentMethodFnd = await this.paymentMethodService.findById(expensePayload.paymentMethodId,currentUser)
    if (!paymentMethodFnd.success) {
      return {
        success: false,
        message: 'PaymentMethod doesnt exist.',
        data: {},
      };
    }
    let result : any

    const trx = await this.modelClass.startTransaction()
    expensePayload.expenseNumber = `EXPENSE_${Number(new Date())}`
    expensePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
    expensePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
    expensePayload.brandCode = currentUser.brandCode
    expensePayload.createdBy = currentUser.username
    var subTotalAmount = 0
    const expenseItemsPayloadFinal = []
    for (let item of expenseItemsPayload) {
      var finalItem = {}
      let newItem: PassCreateExpenseItemDto
      let id: number
      // check if the recieved items are belong to user or not,
      // and all categories are available?
      // this will reduce user missuses
      if (item.itemId) {
        let found;
        if (item.category === true) {
          found = await this.categoryService.findById(item.itemId,currentUser)
        } else if (item.category === false) {
          found = await this.subCategoryService.findById(item.itemId,currentUser)
        } else {
          return {
            success: false,
            message: "Item: Category should be boolean and required.",
            data: {},
          }
        }
        if (!found.success) {
          return {
            success: false,
            message: "item category or subCategory not exist.",
            data: found.message,
          }
        } else {
          newItem = found.data
          id = found.data.id
        }
      } else {
        return {
          success: false,
          message: "itemId is not found in any category or subCategory.",
          data: item.itemId,
        }
      }

      finalItem['itemId'] = id
      finalItem['name'] = newItem.name
      finalItem['category'] = item.category
      finalItem['description'] = item.description ? item.description : newItem.description
      finalItem['brandCode'] = currentUser.brandCode
      finalItem['createdBy'] = currentUser.username
      finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : 0
      finalItem['qty'] = item.qty | 1

      if (finalItem['unitPrice'] !== 0) {
        subTotalAmount = Number(subTotalAmount) + Number(finalItem['qty'] * finalItem['unitPrice'])
      }
      expenseItemsPayloadFinal.push(finalItem)
    }
    let foundTax = await this.taxService.findById(expensePayload.taxId, currentUser)
    let prepTaxRate = foundTax.data.rate
    var taxRate:number = subTotalAmount * prepTaxRate
    var discount:number = subTotalAmount * expensePayload.discount
    expensePayload.subTotalAmount = subTotalAmount
    let grandTotal = Number(subTotalAmount) + Number(taxRate)
    grandTotal = Number(grandTotal) - Number(discount)
    
    expensePayload.totalAmount = Number(parseFloat((Number(grandTotal)).toString()).toFixed(2))

    try {
      // start operation for adding expenses and expenseItems with relatedQuery depending on parent
      const createdExpense = await this.modelClass.query(trx).insert(expensePayload);
      for (let itemNoType of expenseItemsPayloadFinal) {
        const item: CreateExpenseItemDto = itemNoType
        item.expenseId = createdExpense.id
        const insertedExpenseItem = await createdExpense.$relatedQuery('expenseItems',trx)
        .insert(item)
        if (!insertedExpenseItem) {
            return {
              success: false,
              message: "couldnt insert expenseItem on invoice",
              data: insertedExpenseItem,
            }
          }
      }

      await trx.commit();
      result = await this.modelClass.query()
      .findById(createdExpense.id)
      .withGraphFetched({
        supplier: {},
        tax: {},
        paymentMethod: {},
        expenseItems: {},
      });
      return {
        success: true,
        message: 'Expense created successfully.',
        data: result,
      };  
    } catch (err) {
      await trx.rollback();
      result = err
      return {
        success: false,
        message: `Something went wrong. Neither Expense nor ExpenseItems were inserted.`,
        data: result,
      };
    }
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const expensePayload = payload
    const expense = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(expensePayload.id);
    if (expense) {
      if (expensePayload.taxId) {
        const taxFnd = await this.taxService.findById(expensePayload.taxId,currentUser)
        if (!taxFnd.success) {
          return {
            success: false,
            message: 'Tax doesnt exist.',
            data: {},
          };
        }
        expensePayload.taxRate = taxFnd.data.rate
      }
      if (expensePayload.supplierId) {
        const supplierFnd = await this.supplierService.findById(expensePayload.supplierId,currentUser)
        if (!supplierFnd.success) {
          return {
            success: false,
            message: 'Supplier doesnt exist.',
            data: {},
          };
        }
      }
      if (expensePayload.paymentMethodId) {
        const paymentMethodFnd = await this.paymentMethodService.findById(expensePayload.paymentMethodId,currentUser)
        if (!paymentMethodFnd.success) {
          return {
            success: false,
            message: 'PaymentMethod doesnt exist.',
            data: {},
          };
        }
      }

      const subTotalAmount = expense.subTotalAmount
      // const taxRate: number = expensePayload.taxId ? expensePayload.taxRate : expense.taxRate
      // const discount: number = expensePayload.discount ? expensePayload.discount : expense.discount
      // const newTotalAmount = subTotalAmount + (( subTotalAmount * taxRate ) - ( subTotalAmount * discount ))
      
      let prepTaxRate = expensePayload.taxId ? expensePayload.taxRate : expense.taxRate | 1
      let prepDiscount = expensePayload.discount ? expensePayload.discount : expense.discount | 1
      var taxRate:number = subTotalAmount * prepTaxRate
      var discount:number = subTotalAmount * prepDiscount
      expensePayload.subTotalAmount = subTotalAmount
      let grandTotal = Number(subTotalAmount) + Number(taxRate)
      const newTotalAmount = Number(parseFloat((grandTotal - Number(discount)).toString()).toFixed(2))

      const updatedExpense = await this.modelClass.query()
        .update({
          dueDate: expensePayload.dueDate ? expensePayload.dueDate : expense.dueDate,
          exchangeRate: expensePayload.exchangeRate ? expensePayload.exchangeRate | 1 : expense.exchangeRate,
          taxRate: taxRate,
          discount: discount,
          totalAmount: newTotalAmount,
          billingAddress: expensePayload.billingAddress ? expensePayload.billingAddress : expense.billingAddress,
          supplierId: expensePayload.supplierId ? expensePayload.supplierId : expense.supplierId,
          paymentMethodId: expensePayload.paymentMethodId ? expensePayload.paymentMethodId : expense.paymentMethodId,
          taxId: expensePayload.taxId ? expensePayload.taxId : expense.taxId,
          description: expensePayload.description ? expensePayload.description : expense.description,
          paymentMethod: expensePayload.paymentMethod ? expensePayload.paymentMethod : expense.paymentMethod,
          currencyCode: expensePayload.currencyCode ? expensePayload.currencyCode : expense.currencyCode,
          status: expensePayload.status ? expensePayload.status : expense.status,
          deleted: expensePayload.deleted ? expensePayload.deleted : expense.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: expensePayload.id });
      return {
        success: true,
        message: 'Expense details updated successfully.',
        data: updatedExpense,
      };
    } else {
      return {
        success: false,
        message: 'No expense found.',
        data: {},
      };
    }
  }

  // Delete expense
  async deleteById(expenseId: number, currentUser): Promise<ResponseData> {
    const expenses = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .where({ id: expenseId })
      .delete()
    if (expenses) {
      return {
        success: true,
        message: 'Expense deleted successfully.',
        data: expenses,
      };
    } else {
      return {
        success: false,
        message: 'No expense found.',
        data: {},
      };
    }
  }
}

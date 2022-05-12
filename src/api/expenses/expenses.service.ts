import { Injectable, Inject } from '@nestjs/common';
import { ExpenseModel } from 'src/database/models/expense.model';
import { ExpenseItemModel } from 'src/database/models/expenseItem.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { CreateExpenseDto, CreateExpenseItemDto } from './dto/create-expense.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TaxesService } from '../taxes/taxes.service';
import { PaymentMethodsService } from '../paymentMethods/paymentMethods.service';
import { AddFileDto, FileParamDto, FileUploadService } from 'src/app/app.service';
import { ExpenseAttachmentModel } from 'src/database/models/expenseAttachment.model';
import { AttachmentModel } from 'src/database/models/attachment.model';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ExpensesService {
  constructor(
    @Inject('ExpenseModel') private modelClass: ModelClass<ExpenseModel>,
    @Inject('ExpenseItemModel') private expenseItemModel: ModelClass<ExpenseItemModel>,
    @Inject('ExpenseAttachmentModel') private expenseAttachmentModel: ModelClass<ExpenseAttachmentModel>,
    @Inject('AttachmentModel') private attachmentModel: ModelClass<AttachmentModel>,
    private readonly supplierService: SuppliersService,
    private readonly taxService: TaxesService,
    private readonly paymentMethodService: PaymentMethodsService,
    private readonly fileUploadService: FileUploadService,
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
      attachments: {},
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
      attachments: {},
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
    //supplier Columns
    if( payload.supplierId ) {
      const supplierFnd = await this.supplierService.findById(expensePayload.supplierId,currentUser)
      if (supplierFnd.success) {
        expensePayload['supplierName'] = supplierFnd.data.name
        expensePayload['supplierLogo'] = supplierFnd.data.logo
        expensePayload['supplierPhoneNumbers'] = supplierFnd.data.phoneNumbers
        expensePayload['supplierSupplierType'] = supplierFnd.data.supplierType
        expensePayload['supplierBusinessType'] = supplierFnd.data.businessType
        expensePayload['supplierEmail'] = supplierFnd.data.email
        expensePayload['supplierWebsite'] = supplierFnd.data.website
        expensePayload['supplierAddress'] = supplierFnd.data.address
      } else {
        return {
          success: false,
          message: 'Supplier doesnt exist.',
          data: {},
        };
      }
    }

    if (!expenseItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }
    //tax Columns
    if (payload.taxId) {
      const taxFnd = await this.taxService.findById(expensePayload.taxId, currentUser)
      if (taxFnd.success) {
        if (!expensePayload.taxRate) expensePayload.taxRate = taxFnd.data.rate ? taxFnd.data.rate : 1
        expensePayload['taxName'] = taxFnd.data.name
      } else {
        return {
          success: false,
          message: 'Tax doesnt exist.',
          data: {},
        };
      }
    } else {
      expensePayload.taxId = null
    }
    console.log("expensepayloadpaymenthmethodid: ", expensePayload.paymentMethodId)
    if (expensePayload.paymentMethodId) {
      const paymentMethodFnd = await this.paymentMethodService.findById(expensePayload.paymentMethodId,currentUser)
      if (!paymentMethodFnd.success) {
        return {
          success: false,
          message: 'PaymentMethod doesnt exist.',
          data: {},
        };
      }
    } else {
      expensePayload.paymentMethodId = null
    }
    let result : any

    const trx = await this.modelClass.startTransaction()
    expensePayload.expenseNumber = `EXPENSE_${Number(new Date())}`
    expensePayload.date = moment(payload.date).format('YYYY-MM-DD HH:mm:ss').toString()
    expensePayload.dueDate = moment(payload.dueDate).format('YYYY-MM-DD HH:mm:ss').toString()
    expensePayload.brandCode = currentUser.brandCode
    expensePayload.createdBy = currentUser.username
    expensePayload.exchangeRate = expensePayload.currencyCode === "USD" && !expensePayload.exchangeRate ? 1 : expensePayload.exchangeRate
    var subTotalAmount = 0
    const expenseItemsPayloadFinal = []
    for (let item of expenseItemsPayload) {
      var finalItem = {}
      finalItem['itemId'] = item.itemId ? item.itemId : null
      finalItem['name'] = item.name
      finalItem['category'] = item.category
      finalItem['description'] = item.description
      finalItem['brandCode'] = currentUser.brandCode
      finalItem['createdBy'] = currentUser.username
      finalItem['unitPrice'] = item.unitPrice ? item.unitPrice : 0
      finalItem['qty'] = item.qty || 1

      if (finalItem['unitPrice'] !== 0) {
        subTotalAmount = Number(subTotalAmount) + Number(finalItem['qty'] * finalItem['unitPrice'])
      }
      expenseItemsPayloadFinal.push(finalItem)
    }
    var taxRate:number = subTotalAmount * expensePayload.taxRate
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
            message: "couldnt insert expenseItem on expense",
            data: insertedExpenseItem,
          }
        }
      }

      await trx.commit();
      result = await this.modelClass.query()
      .findById(createdExpense.id)
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

  async removeFile(payload: {id: number,attachId: number}, currentUser): Promise<ResponseData> {
    const expense = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(payload.id)
    .withGraphFetched({attachments: {}});
    if (!expense) {
      return {
        success: false,
        message: "Expense not found",
        data: {},
      }
    }
    const expenseAttachment = await this.expenseAttachmentModel.query()
    .findOne({expenseId: expense.id, attachmentId: payload.attachId})

    if (!expenseAttachment) {
      return {
        success: false,
        message: "attachment on this Expense not found",
        data: {},
      }
    }

    await this.expenseAttachmentModel.query()
    .delete()
    .where({attachmentId: payload.attachId,expenseId: payload.id})
    const deletedFileService = await this.fileUploadService.removeFile(payload.attachId,currentUser);
    if (!deletedFileService.success) {
      throw {
        message: deletedFileService.message,
        data: deletedFileService.data,
      }
    } else {
    }
    return {
      success: true,
      message: 'Expense Attachments removed successfully.',
      data: {},
    }
  }

  async replaceFiles(payload: AddFileDto, currentUser): Promise<ResponseData> {
    const {files,id} = payload
    const expense = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(id)
    .withGraphFetched({attachments: {}});
    if (!expense) {
      return {
        success: false,
        message: "Expense not found",
        data: {},
      }
    }
    const allFileIds = []
    for (let file of files) {
      const prepFile: FileParamDto = {
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
        size: file.size,
      }

      const uploadedFileService = await this.fileUploadService.addFile(prepFile, "expenses",currentUser);
      if (!uploadedFileService.success) {
        return {
          success: false,
          message: uploadedFileService.message,
          data: uploadedFileService.data,
        }
      }
      allFileIds.push(uploadedFileService.data.id)
    }

    for (let attId of expense.attachments) {
      this.fileUploadService.removeFile(attId.id,currentUser)
    }
    const trx = await this.modelClass.startTransaction()
    try {
      // const uploadedFileService = await this.fileUploadService.removeFile(prepFile,currentUser);
      this.expenseAttachmentModel.query(trx)
      .delete()
      .where({expenseId: id})
      this.attachmentModel.query(trx)
      .delete()
      .findByIds(expense.attachments?.map(e => e.id))
      for (let file of allFileIds) {
        const insertedAttach = await this.expenseAttachmentModel.query(trx)
        .insert({
          attachmentId: file,
          expenseId: expense.id
        });
        if (!insertedAttach) {
          throw {
            message: "couldnt insert expenseAttachment on expense",
            data: insertedAttach,
          }
        }
      }

      await trx.commit();
      return {
        success: true,
        message: 'Expense Attachments replaced successfully.',
        data: {},
      }
    } catch (err) {
      await trx.rollback();
      return {
        success: false,
        message: `Something went wrong. ExpenseAttachments were not replaced.`,
        data: err,
      };
    }
  }

  async addFile(payload: AddFileDto, currentUser): Promise<ResponseData> {
    const {files,id} = payload
    const expense = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(id);
    if (!expense) {
      return {
        success: false,
        message: "Expense not found",
        data: {},
      }
    }

    const trx = await this.modelClass.startTransaction()
    try {
      for (let file of files) {
        const prepFile: FileParamDto = {
          originalname: file.originalname,
          buffer: file.buffer,
          mimetype: file.mimetype,
          size: file.size,
        }

        const uploadedFileService = await this.fileUploadService.addFile(prepFile, "expenses", currentUser);
        if (!uploadedFileService.success) {
          throw {
            message: uploadedFileService.message,
            data: uploadedFileService.data,
          }
        }

        const insertedAttach = await this.expenseAttachmentModel.query(trx)
        .insert({
          attachmentId: uploadedFileService.data.id,
          expenseId: expense.id
        });
        if (!insertedAttach) {
          throw {
            message: "couldnt insert expenseAttachment on expense",
            data: insertedAttach,
          }
        }
      }

      await trx.commit();
      return {
        success: true,
        message: 'Expense Attachments added successfully.',
        data: {},
      }
    } catch (err) {
      await trx.rollback();
      return {
        success: false,
        message: `Something went wrong. ExpenseAttachments were not inserted.`,
        data: err,
      };
    }
  }

  async update(payload,  items: Array<CreateExpenseItemDto>, currentUser): Promise<ResponseData> {
    const expenseItemsPayload: Array<CreateExpenseItemDto> = items
    if (!expenseItemsPayload.length) {
      return {
        success: false,
        message: 'Items cant be Empty.',
        data: {},
      };
    }
    const expensePayload = payload
    const expense = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(expensePayload.id);
    let result: any
    if (expense) {
      if (expensePayload.taxId) {
        const taxFnd = await this.taxService.findById(expensePayload.taxId,currentUser)
        if (taxFnd.success) {
          if (expensePayload.taxRate === '' && expensePayload.taxRate !== null) expensePayload.taxRate = taxFnd.data.rate ? taxFnd.data.rate : 1
        } else {
          return {
            success: false,
            message: 'Tax doesnt exist.',
            data: {},
          };
        }
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
      let newSubTotalAmount: number = 0
      const trx = await this.modelClass.startTransaction()
      try {
        // start operation for adding expenses and expenseItems with relatedQuery depending on parent

        const deletedExpenseItem = await this.expenseItemModel.query(trx)
        .where({brandCode: currentUser.brandCode, expenseId: expense.id})
        .delete()
        for (let item of expenseItemsPayload) {
          const addingItem = item
          addingItem.expenseId = expense.id
          addingItem.name = item.name
          addingItem.description = item.description
          addingItem.unitPrice = item.unitPrice
          addingItem.qty = item.qty
          addingItem.brandCode = currentUser.brandCode
          addingItem['createdBy'] = currentUser.username

          const createdExpenseItem = await this.expenseItemModel.query(trx)
          .insert(addingItem)
          if (!createdExpenseItem) {
            throw createdExpenseItem
          }
          if (item.qty !== 0) {
            newSubTotalAmount = newSubTotalAmount + Number(item.qty * item.unitPrice)
          }
        }

        await trx.commit();
      } catch (err) {
        await trx.rollback();
        result = err
        return {
          success: false,
          message: `Something went wrong. Neither Expense nor ExpenseItems were inserted.`,
          data: result,
        }
      }
      const subTotalAmount = newSubTotalAmount
      // const taxRate: number = expensePayload.taxId ? expensePayload.taxRate : expense.taxRate
      // const discount: number = expensePayload.discount ? expensePayload.discount : expense.discount
      // const newTotalAmount = subTotalAmount + (( subTotalAmount * taxRate ) - ( subTotalAmount * discount ))

      let prepTaxRate = expensePayload.taxRate ? expensePayload.taxRate : expense.taxRate
      let prepDiscount = expensePayload.discount ? expensePayload.discount : expense.discount
      var taxRate:number = subTotalAmount * prepTaxRate
      var discount:number = subTotalAmount * prepDiscount
      expensePayload.subTotalAmount = subTotalAmount
      let grandTotal = Number(subTotalAmount) + Number(taxRate)
      const newTotalAmount: number = Number(parseFloat((grandTotal - Number(discount)).toString()).toFixed(2))
      const updatedExpense = await this.modelClass.query()
        .update({
          dueDate: expensePayload.dueDate ? expensePayload.dueDate : expense.dueDate,
          exchangeRate: expensePayload.exchangeRate ? expensePayload.exchangeRate: expense.exchangeRate,
          taxRate: prepTaxRate,
          bankFee: expensePayload.bankFee ? expensePayload.bankFee : expense.bankFee,
          discount: prepDiscount,
          totalAmount: newTotalAmount,
          subTotalAmount: subTotalAmount,
          billingAddress: expensePayload.billingAddress ? expensePayload.billingAddress : expense.billingAddress,
          supplierId: expensePayload.supplierId ? expensePayload.supplierId : expense.supplierId,
          paymentMethodId: expensePayload.paymentMethodId ? expensePayload.paymentMethodId : expense.paymentMethodId,
          taxId: expensePayload.taxId ? expensePayload.taxId : expense.taxId,
          description: expensePayload.description ? expensePayload.description : expense.description,
          category: expensePayload.category ? expensePayload.category : expense.category,
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

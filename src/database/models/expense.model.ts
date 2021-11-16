import { BaseModel } from './base.model';
import { Model } from 'objection';
import { SupplierModel } from "./supplier.model";
import { ExpenseItemModel } from './expenseItem.model';
import { PaymentMethodModel } from './paymentMethod.model';
import { TaxModel } from './tax.model';

const tableName = 'expenses'
export class ExpenseModel extends BaseModel {
  static tableName = tableName;

  expenseNumber: string
  brandCode: string
  description: string
  date: Date
  dueDate: Date
  currencyCode: string
  exchangeRate: number
  billingAddress: string
  taxRate: number
  discount: number
  subTotalAmount: number
  totalAmount: number
  paymentMethodId: number
  supplierId: number
  taxId: number

  supplier: SupplierModel;
  paymentMethod: PaymentMethodModel;
  tax: TaxModel;
  expenseItems: ExpenseItemModel[];

  static relationMappings = {
    expenseItems: {
      modelClass: `${__dirname}/expenseItem.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'expenseItems.expenseId',
      },
    },
    supplier: {
      modelClass: `${__dirname}/supplier.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.supplierId`,
        to: 'suppliers.id',
      },
    },
    tax: {
      modelClass: `${__dirname}/tax.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.taxId`,
        to: 'taxes.id',
      },
    },
    paymentMethod: {
      modelClass: `${__dirname}/paymentMethod.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.paymentMethodId`,
        to: 'paymentMethods.id',
      },
    },
  };
}

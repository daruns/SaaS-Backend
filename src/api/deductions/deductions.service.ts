import { Injectable, Inject } from '@nestjs/common';
import { DeductionModel } from 'src/database/models/deduction.model';
import { ModelClass } from 'objection';
import * as moment from 'moment'
import { ResponseData } from 'src/app/app.service';
import DeductionTypeModel from 'src/database/models/deductionType.model';
import EmployeeModel from 'src/database/models/employee.model';

@Injectable()
export class DeductionsService {
  constructor(
    @Inject('DeductionModel') private modelClass: ModelClass<DeductionModel>,
    @Inject('DeductionTypeModel') private deductionTypeClass: ModelClass<DeductionTypeModel>,
    @Inject('EmployeeModel') private employeeClass: ModelClass<EmployeeModel>,
  ) {}

  // deduction list
  async findAll(currentUser): Promise<ResponseData> {
    const deductions = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .withGraphFetched({deductionType: true, employee: true})
    return {
      success: true,
      message: 'Deduction details fetch successfully.',
      data: deductions,
    };
  }

  // find one deduction info by deductionId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const deduction = await this.modelClass
      .query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .withGraphFetched({deductionType: true, employee: true});
    if (deduction) {
      return {
        success: true,
        message: 'Deduction details fetch successfully.',
        data: deduction,
      };
    } else {
      return {
        success: false,
        message: 'No deduction details found.',
        data: {},
      };
    }
  }

  // Create deduction before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    const deductionPayload = payload
    const employeeFnd = await this.employeeClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(deductionPayload.employeeId)
    if (!employeeFnd) {
      return {
        success: false,
        message: 'Employee doesnt exist.',
        data: {},
      };
    }
    const deductionTypeFnd = await this.deductionTypeClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(deductionPayload.deductionTypeId)
    if (!deductionTypeFnd) {
      return {
        success: false,
        message: 'DeductionType doesnt exist.',
        data: {},
      };
    }

    deductionPayload.total = deductionPayload.qty * deductionTypeFnd.fund
    deductionPayload.deductionTypeId = deductionTypeFnd.id
    deductionPayload.date = moment(deductionPayload.date).add(3,'hours').format('YYYY-MM-DD HH:mm:ss').toString()
    deductionPayload.createdBy = currentUser.username
    deductionPayload.brandCode = currentUser.brandCode
    const identifiers = await this.modelClass.query().insert(deductionPayload);
    const createDeduction = await this.modelClass.query().findById(identifiers.id);
    return {
      success: true,
      message: 'Deduction created successfully.',
      data: createDeduction,
    };
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const deductionPayload = payload
    const deduction = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(deductionPayload.id)
    .withGraphFetched({deductionType: true, employee: true});
    if (deduction) {
      if (deductionPayload.employeeId) {
        const employeeFnd = await this.employeeClass.query()
        .where({brandCode: currentUser.brandCode})
        .findById(deductionPayload.employeeId)    
        if (!employeeFnd) {
          return {
            success: false,
            message: 'Employee doesnt exist.',
            data: {},
          };
        }
      }
      let earnQty: number = deduction.qty;
      let earntypefund: number = deduction.deductionType?.fund;
      if (deductionPayload.qty) {
        earnQty = deductionPayload.qty
      }
      if (deductionPayload.deductionTypeId) {
        const deductionTypeFnd = await this.deductionTypeClass.query()
        .where({brandCode: currentUser.brandCode})
        .findById(deductionPayload.deductionTypeId)
    
        if (!deductionTypeFnd) {
          return {
            success: false,
            message: 'DeductionType doesnt exist.',
            data: {},
          };
        }
        earntypefund = deductionTypeFnd.fund
        deductionPayload.deductionTypeId = deductionTypeFnd.id
      }
      deductionPayload.total = earntypefund * earnQty
      deductionPayload.date = deductionPayload.date ? moment(deductionPayload.date).format('YYYY-MM-DD HH:mm:ss').toString() : deduction.date
      const updatedDeduction = await this.modelClass
      .query()
      .update({
        description: deductionPayload.description ? deductionPayload.description : deduction.description,
        qty: deductionPayload.qty ? deductionPayload.qty : deduction.qty,
        total: deductionPayload.total ? deductionPayload.total : deduction.total,
        date: deductionPayload.date ? deductionPayload.date : deduction.date,
        employeeId: deductionPayload.employeeId ? deductionPayload.employeeId : deduction.employeeId,
        deductionTypeId: deductionPayload.deductionTypeId ? deductionPayload.deductionTypeId : deduction.deductionTypeId,
        updatedBy: currentUser.username,
      })
      .where({ id: deductionPayload.id });
      return {
        success: true,
        message: 'Deduction details updated successfully.',
        data: updatedDeduction,
      };
    } else {
      return {
        success: false,
        message: 'No deduction found.',
        data: {},
      };
    }
  }

  // Delete deduction
  async deleteById(deductionId: number, currentUser): Promise<ResponseData> {
    const deductions = await this.modelClass.query()
      .delete()
      .where({
        brandCode: currentUser.brandCode,
        id: deductionId
      });
    if (deductions) {
      return {
        success: true,
        message: 'Deduction deleted successfully.',
        data: deductions,
      };
    } else {
      return {
        success: false,
        message: 'No deduction found.',
        data: {},
      };
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { EarningModel } from 'src/database/models/earning.model';
import { ModelClass } from 'objection';
import { EmployeesService } from '../employees/employees.service';
import * as moment from 'moment'
import { EarningTypesService } from '../earningTypes/earningTypes.service';
import { ResponseData } from 'src/app/app.service';

@Injectable()
export class EarningsService {
  constructor(
    @Inject('EarningModel') private modelClass: ModelClass<EarningModel>,
    private employeeSerive: EmployeesService,
    private earningTypeSerive: EarningTypesService,
  ) {}

  // earning list
  async findAll(currentUser): Promise<ResponseData> {
    const earnings = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .withGraphFetched({earningType:true, employee: true})
    return {
      success: true,
      message: 'Earning details fetch successfully.',
      data: earnings,
    };
  }

  // find one earning info by earningId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const earning = await this.modelClass
      .query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .withGraphFetched({earningType: true, employee: true});
    if (earning) {
      return {
        success: true,
        message: 'Earning details fetch successfully.',
        data: earning,
      };
    } else {
      return {
        success: false,
        message: 'No earning details found.',
        data: {},
      };
    }
  }

  // Create earning before save encrypt password
  async create(payload, currentUser): Promise<ResponseData> {
    const earningPayload = payload
    const employeeFnd = await this.employeeSerive.findById(earningPayload.employeeId,currentUser)
    if (!employeeFnd.success) {
      return {
        success: false,
        message: 'Employee doesnt exist.',
        data: {},
      };
    }
    const earningTypeFnd = await this.earningTypeSerive.findById(earningPayload.earningTypeId,currentUser)
    if (!earningTypeFnd.success) {
      return {
        success: false,
        message: 'EarningType doesnt exist.',
        data: {},
      };
    }

    earningPayload.total = Number(earningPayload.qty || 0) * Number(earningTypeFnd?.data?.fund || 0)
    earningPayload.earningTypeId = earningTypeFnd?.data.id
    earningPayload.date = moment(earningPayload.date).add(3,'hours').format('YYYY-MM-DD HH:mm:ss').toString()
    earningPayload.createdBy = currentUser.username
    earningPayload.brandCode = currentUser.brandCode
    const identifiers = await this.modelClass.query().insert(earningPayload);
    const createEarning = await this.modelClass.query().findById(identifiers.id);
    return {
      success: true,
      message: 'Earning created successfully.',
      data: createEarning,
    };
  }

  async update(payload, currentUser): Promise<ResponseData> {
    const earningPayload = payload
    const earning = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(earningPayload.id)
    .withGraphFetched({earningType: true, employee: true});
    if (earning) {
      if (earningPayload.employeeId) {
        const employeeFnd = await this.employeeSerive.findById(earningPayload.employeeId,currentUser)
        if (!employeeFnd.success) {
          return {
            success: false,
            message: 'Employee doesnt exist.',
            data: {},
          };
        }
      }
      let earnQty: number = earning.qty;
      let earntypefund: number = earning.earningType?.fund;
      if (earningPayload.qty) {
        earnQty = earningPayload.qty
      }
      if (earningPayload.earningTypeId) {
        const earningTypeFnd = await this.earningTypeSerive.findById(earningPayload.earningTypeId,currentUser)
        if (!earningTypeFnd.success) {
          return {
            success: false,
            message: 'EarningType doesnt exist.',
            data: {},
          };
        }
        earntypefund = earningTypeFnd.data.fund
        earningPayload.earningTypeId = earningTypeFnd?.data.id
      }
      earningPayload.total = earntypefund * earnQty
      earningPayload.date = earningPayload.date ? moment(earningPayload.date).format('YYYY-MM-DD HH:mm:ss').toString() : earning.date
      const updatedEarning = await this.modelClass
      .query()
      .update({
        description: earningPayload.description ? earningPayload.description : earning.description,
        qty: earningPayload.qty ? earningPayload.qty : earning.qty,
        total: earningPayload.total ? earningPayload.total : earning.total,
        date: earningPayload.date ? earningPayload.date : earning.date,
        employeeId: earningPayload.employeeId ? earningPayload.employeeId : earning.employeeId,
        earningTypeId: earningPayload.earningTypeId ? earningPayload.earningTypeId : earning.earningTypeId,
        updatedBy: currentUser.username,
      })
      .where({ id: earningPayload.id });
      return {
        success: true,
        message: 'Earning details updated successfully.',
        data: updatedEarning,
      };
    } else {
      return {
        success: false,
        message: 'No earning found.',
        data: {},
      };
    }
  }

  // Delete earning
  async deleteById(earningId: number, currentUser): Promise<ResponseData> {
    const earnings = await this.modelClass.query()
      .delete()
      .where({
        brandCode: currentUser.brandCode,
        id: earningId
      });
    if (earnings) {
      return {
        success: true,
        message: 'Earning deleted successfully.',
        data: earnings,
      };
    } else {
      return {
        success: false,
        message: 'No earning found.',
        data: {},
      };
    }
  }
}

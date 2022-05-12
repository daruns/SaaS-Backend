import { Injectable, Inject } from '@nestjs/common';
import {LeaveModel} from 'src/database/models/leave.model';
import { PayslipModel } from 'src/database/models/payslip.model';
import { EmployeeModel } from 'src/database/models/employee.model';
import { OvertimeModel } from 'src/database/models/overtime.model';
import { EarningModel } from 'src/database/models/earning.model';
import { DeductionModel } from 'src/database/models/deduction.model';
import { ModelClass } from 'objection';
import { CreatePayslipDto } from './dto/create-payslip.dto';
import {PayslipEarningModel} from 'src/database/models/payslipEarning.model';
import {PayslipDeductionModel} from 'src/database/models/payslipDeduction.model';
import * as moment from 'moment';
import { OvertimeStatusLayers } from '../overtimes/dto/overtime-status.dto';
import { LeaveStatusLayers } from '../leaves/dto/leave-status.dto';
import { ResponseData } from 'src/app/app.service';

@Injectable()
export class PayslipsService {
  constructor(
    @Inject('PayslipModel') private modelClass: ModelClass<PayslipModel>,
    @Inject('EmployeeModel') private employeeClass: ModelClass<EmployeeModel>,
    @Inject('LeaveModel') private leavesClass: ModelClass<LeaveModel>,
    @Inject('OvertimeModel') private overtimeClass: ModelClass<OvertimeModel>,
    @Inject('EarningModel') private earningClass: ModelClass<EarningModel>,
    @Inject('DeductionModel') private deductionClass: ModelClass<DeductionModel>,
    @Inject('PayslipEarningModel') private payslipEarningClass: ModelClass<PayslipEarningModel>,
    @Inject('PayslipDeductionModel') private payslipDeductionClass: ModelClass<PayslipDeductionModel>,
  ) {}

  // payslip list
  async findAll(currentUser): Promise<ResponseData> {
    const payslips = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .modifiers({
      selectUser(builder) {
        builder.select('name');
        builder.select('email');
        builder.select('phoneNumber');
        builder.select('avatar');
        builder.select('users.id as userId');
      },
    })
    .withGraphFetched(
      `
        [
          employee.[user(selectUser)],
          payslipEarnings,
          payslipDeductions,
        ]
      `
    )
    return {
      success: true,
      message: 'Payslips details fetch successfully.',
      data: payslips,
    };
  }

  // find one payslip info by payslipId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const payslip = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .modifiers({
        selectUser(builder) {
          builder.select('name');
          builder.select('email');
          builder.select('phoneNumber');
          builder.select('avatar');
          builder.select('users.id as userId');
        },
      })
      .withGraphFetched(
        `
          [
            employee.[user(selectUser)],
            payslipEarnings,
            payslipDeductions,
          ]
        `
      )
      if (payslip) {
      return {
        success: true,
        message: 'Payslip details fetch successfully.',
        data: payslip,
      };
    } else {
      return {
        success: false,
        message: 'No payslip details found.',
        data: {},
      };
    }
  }

  // Create payslip before save encrypt password
  async create(payload: CreatePayslipDto, currentUser): Promise<ResponseData> {
    const payslipPayload = payload
    const currentPayslip = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode, employeeId: payslipPayload.employeeId})
    .where('fromDate','like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
    if (currentPayslip.length > 0) {
      return {
        success: false,
        message: "Payslip already exist for this date",
        data: {}
      }
    }
    let finalEarningItems = {'overtimes': 0}
    let finalDeductionItems = {'leaves': 0}
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      id: payslipPayload.employeeId
    })
    if (!currentEmployee) {
      return {
        success: false,
        message: "The employee doesnt exist!",
        data: {},
      }
    }
    let workingHours = Number(currentEmployee.workingHours) ? Number(currentEmployee.workingHours) : 8 // either working hours from employees table or 8 hours per day by default
    const currentLeaves = await this.leavesClass.query()
    .where({ brandCode: currentUser.brandCode })
    .where({ employeeId: currentEmployee.id })
    .where({status: LeaveStatusLayers.completed})
    .where('from','like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
    .withGraphFetched({leaveType: true})
    let leavesTotal = 0
    if (currentLeaves.length) {
      for (let curleave of currentLeaves) {
        if (curleave.leaveType?.durationType === "days") {
          leavesTotal += (Number(curleave.currentBalance) - Number(curleave.remainBalance)) * Number(curleave.leaveType.fund ? curleave.leaveType.fund : 1)
        } else if (curleave.leaveType?.durationType === "hours") {
          leavesTotal += (Number(curleave.currentBalance) - Number(curleave.remainBalance)) * (Number(curleave.leaveType.fund ? curleave.leaveType.fund : 1 ) / workingHours)
        }
      }
    }
    finalDeductionItems["leaves"] = leavesTotal
    const currentOvertimes = await this.overtimeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .where({
      employeeId: currentEmployee.id
    })
    .where({status: OvertimeStatusLayers.completed})
    .where('from','like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
    .withGraphFetched({overtimeType: true})
    let overtimesTotal = 0
    if (currentOvertimes.length) {
      for (let curovertime of currentOvertimes) {
        overtimesTotal += (Number(curovertime.currentBalance) - Number(curovertime.remainBalance)) * (Number(curovertime.overtimeType.fund) / workingHours)
      }
    }
    finalEarningItems["overtimes"] = overtimesTotal
    const currentDeductions = await this.deductionClass.query()
    .where({ brandCode: currentUser.brandCode })
    .where({
      employeeId: currentEmployee.id
    })
    .where('date','like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
    .withGraphFetched({deductionType: true})
    if (currentDeductions.length) {
      for (let curdeduction of currentDeductions) {
        if (curdeduction.deductionType) finalDeductionItems[curdeduction.deductionType.name] += curdeduction.total
      }
    }
    const currentEarnings = await this.earningClass.query()
    .where({ brandCode: currentUser.brandCode })
    .where({
      employeeId: currentEmployee.id
    })
    .where('date','like', moment(payslipPayload.fromDate).format('YYYY-MM').toString() + '%')
    .withGraphFetched({earningType: true})
    if (currentEarnings.length) {
      for (let curearning of currentEarnings) {
        if (curearning.earningType) finalEarningItems[curearning.earningType.name] = curearning.total
      }
    }
    const earningSum = Object.values(finalEarningItems).reduce((a, b) => {return a + b}, 0)
    const deductionSum = Object.values(finalDeductionItems).reduce((a, b) => {return a + b}, 0)
    const netSalary = Number(earningSum + currentEmployee.salary) - Number(deductionSum)
    const payslipParamsToAdd = {
      basicSalary: currentEmployee.salary,
      employeeId: currentEmployee.id,
      netSalary: netSalary,
      fromDate: new Date(moment(payslipPayload.fromDate).format('YYYY-MM-01 03:00:00').toString()),
      createdBy: currentUser.username,
      brandCode: currentUser.brandCode
    }
    const identifiers = await this.modelClass.query().insert(payslipParamsToAdd)
    const createPayslip = await this.modelClass.query().findById(identifiers.id);
    Object.keys(finalEarningItems).forEach(async element => {
      const insertearningItems = await this.payslipEarningClass.query().insert({
        name: element,
        amount: finalEarningItems[element],
        payslipId: identifiers.id,
        createdBy: currentUser.username,
        brandCode: currentUser.brandCode
      })
    });
    Object.keys(finalDeductionItems).forEach(async element => {
      const insertDeductionItems = await this.payslipDeductionClass.query().insert({
        name: element,
        amount: finalDeductionItems[element],
        payslipId: identifiers.id,
        createdBy: currentUser.username,
        brandCode: currentUser.brandCode
      })
    });
    return {
      success: true,
      message: 'Payslip created successfully.',
      data: createPayslip,
    }
  }

  // Delete payslip
  async deleteById(payslipId: number, currentUser): Promise<ResponseData> {
    const trx = await this.modelClass.startTransaction()
    try {
      const payslips = await this.modelClass.query(trx)
      .findOne({
        brandCode: currentUser.brandCode,
        id: payslipId
      })
      if (payslips) {
        const deletedPayslip = await this.modelClass.query(trx)
        .findOne({
          brandCode: currentUser.brandCode,
          id: payslipId
        })  
        .delete();
        const payslipsDeductionDelete = await this.payslipDeductionClass.query(trx)
        .where({
          brandCode: currentUser.brandCode,
          payslipId: payslipId
        })
        .delete()
        const payslipsEarningDelete = await this.payslipEarningClass.query(trx)
        .where({
          brandCode: currentUser.brandCode,
          payslipId: payslipId
        })

        await trx.commit();
        return {
          success: true,
          message: 'Payslip deleted successfully.',
          data: deletedPayslip,
        };
      } else {
        return {
          success: false,
          message: 'No payslip found.',
          data: {},
        }
      }
    } catch(err) {
      await trx.rollback();
      return {
        success: false,
        message: `Something went wrong. couldnt delete Payslip.`,
        data: err,
      };
    }
  }
}

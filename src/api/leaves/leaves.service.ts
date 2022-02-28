import { Injectable, Inject } from '@nestjs/common';
import { LeaveModel } from 'src/database/models/leave.model';
import { ModelClass } from 'objection';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateApprovalDto, UpdateLeaveDto } from './dto/update-leave.dto';
import LeaveApprovalModel from 'src/database/models/leaveApproval.model';
import EmployeeModel from 'src/database/models/employee.model';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class LeavesService {
  constructor(
    @Inject('LeaveModel') private modelClass: ModelClass<LeaveModel>,
    @Inject('EmployeeModel') private employeeClass: ModelClass<EmployeeModel>,
    @Inject('LeaveApprovalModel') private leaveApprovalClass: ModelClass<LeaveApprovalModel>,
  ) {}

  // leave list
  async findAllApproval(currentUser): Promise<ResponseData> {
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      userId: currentUser.id
    })
    if (currentEmployee.hrMember == true) {
      const leaves = await this.leaveApprovalClass.query()
      .where({ brandCode: currentUser.brandCode })
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leaves,
      };
    } else {
      const leaves = await this.leaveApprovalClass.query()
      .where({ brandCode: currentUser.brandCode, managerId: currentEmployee.id })
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leaves,
      };
    }
  }

  // leave list to be approved
  async findAll(currentUser): Promise<ResponseData> {
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      userId: currentUser.id
    })
    if (currentEmployee.hrMember === true) {
      const leaves = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leaves,
      };  
    } else {
      const leaves = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode, employeeId: currentEmployee.id })
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leaves,
      };  
    }
  }

  // find one leave info by leaveId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const leave = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (leave) {
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leave,
      };
    } else {
      return {
        success: false,
        message: 'No leave details found.',
        data: {},
      };
    }
  }

  // Create leave before save encrypt password
  async create(payload: CreateLeaveDto, currentUser): Promise<ResponseData> {
    const leavePayload = payload
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      userId: currentUser.id
    })
    leavePayload['createdBy'] = currentUser.username
    leavePayload['brandCode'] = currentUser.brandCode
    const identifiersInst = await this.modelClass.query().insert(leavePayload);
    if (identifiersInst && currentEmployee.managerId) {
      const identifiers = await this.leaveApprovalClass.query().insert({leaveId: identifiersInst.id, managerId: currentEmployee.managerId});
    } else {
      return {
        success: false,
        message: "couldnt create the leave",
        data: {}
      }
    }
    const createLeave = await this.modelClass.query().findById(identifiersInst.id);
    return {
      success: true,
      message: 'Leave created successfully.',
      data: createLeave,
    };
  }

  async updateApproval(payload: UpdateApprovalDto, currentUser): Promise<ResponseData> {
    const leavePayload = payload
    const currentEMployee = await this.employeeClass.query()
    .findOne({userId: currentUser.id})

    const leave = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(leavePayload.id)
    .withGraphFetched({employee: {}});

    if (!currentEMployee) {
      return {
        success: false,
        message: "no employee found",
        data: {}
      }
    }
    if (currentEMployee.id !== leave.employee.userId) {
      return {
        success: false,
        message: "no manager found",
        data: {}
      }
    }
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (leave) {
      const updatedLeave = await this.modelClass
      .query()
      .update({
        status: leavePayload.status ? leavePayload.status : leave.status,
        updatedBy: currentUser.username,
      })
      .where({ id: leavePayload.id });
      const updatedLeaveApproval = await this.leaveApprovalClass
      .query()
      .update({
        status: leavePayload.status ? leavePayload.status : leave.status,
        updatedBy: currentUser.username,
      })
      .where({ id: leavePayload.id });
      return {
        success: true,
        message: 'Leave details updated successfully.',
        data: updatedLeave,
      };
    } else {
      return {
        success: false,
        message: 'No leave found.',
        data: {},
      };
    }
  }

  async update(payload: UpdateLeaveDto, currentUser): Promise<ResponseData> {
    const leavePayload = payload
    const leave = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(leavePayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (leave) {
      const updatedLeave = await this.modelClass
        .query()
        .update({
          name: leavePayload.name ? leavePayload.name : leave.name,
          updatedBy: currentUser.username,
        })
        .where({ id: leavePayload.id });
      return {
        success: true,
        message: 'Leave details updated successfully.',
        data: updatedLeave,
      };
    } else {
      return {
        success: false,
        message: 'No leave found.',
        data: {},
      };
    }
  }

  // Delete leave
  async deleteById(leaveId: number, currentUser): Promise<ResponseData> {
    const leaves = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: leaveId
      })
      .delete()
    if (leaves) {
      return {
        success: true,
        message: 'Leave deleted successfully.',
        data: leaves,
      };
    } else {
      return {
        success: false,
        message: 'No leave found.',
        data: {},
      };
    }
  }
}

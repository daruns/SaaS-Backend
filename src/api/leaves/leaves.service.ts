import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { LeaveModel } from 'src/database/models/leave.model';
import { ModelClass } from 'objection';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateApprovalDto, UpdateLeaveDto } from './dto/update-leave.dto';
import LeaveApprovalModel from 'src/database/models/leaveApproval.model';
import EmployeeModel from 'src/database/models/employee.model';
import { getUserType } from 'src/app/app.service';
import { UserLayers } from '../auth/dto/user-layers.dto';
import { LeaveTypeModel } from 'src/database/models/leaveType.model'
import { LeaveStatusLayers } from './dto/leave-status.dto';
import * as moment from 'moment';

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
    @Inject('LeaveTypeModel') private leaveTypeClass: ModelClass<LeaveTypeModel>,
    @Inject('LeaveApprovalModel') private leaveApprovalClass: ModelClass<LeaveApprovalModel>,
  ) {}

  // leave list
  async findMyLeaves(currentUser): Promise<ResponseData> {
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      userId: currentUser.id
    })
    if (currentEmployee) {
      const leaves = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode, employeeId: currentUser.myEmployeeProfile.id })
      .modifiers({
        leaveTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        leaveApprovalsParams(builder) {
          builder.select('id');
          builder.select('managerId');
          builder.select('status');
          builder.select('createdAt');
        },
        userParams(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
          builder.select('name');
        },
      })
      .withGraphFetched(
        `
          [
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      return {
        success: true,
        message: 'My Leave details fetch successfully.',
        data: leaves,
      };
    }
  }
  // leave list
  async findAllApprovals(currentUser): Promise<ResponseData> {
    if (currentUser.myEmployeeProfile && currentUser.myEmployeeProfile.hrMember === 1) {
      const leavesFnd = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .whereIn('status',[LeaveStatusLayers.completed,LeaveStatusLayers.pending,LeaveStatusLayers.rejected])
      .modifiers({
        leaveTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        leaveApprovalsParams(builder) {
          builder.select('id');
          builder.select('managerId');
          builder.select('status');
          builder.select('createdAt');
        },
        userParams(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
          builder.select('name');
        },
      })
      .withGraphFetched(
        `
          [
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      const result = leavesFnd.filter(props => {
        if (props.leaveApprovals.every(ee => ee.status !== 'rejected') && props.status === 'rejected') {
          return true 
        } else if (props.leaveApprovals.every(ee => ee.status === 'completed') && props.status === 'completed') {
          return true
        } else if (props.leaveApprovals.every(ee => ee.status === 'completed') && props.status === 'pending') {
          return true
        } else if (props.leaveApprovals.length === 0 && !props.employee.manager) {
          return true
        } else return false
      })
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: result,
      };
    }
    if (currentUser.myEmployeeProfile && getUserType(currentUser) === UserLayers.layerTwo) {
      const leaves = await this.leaveApprovalClass.query()
      .where({ brandCode: currentUser.brandCode, managerId: currentUser.myEmployeeProfile.id })
      .whereIn('status',[LeaveStatusLayers.completed,LeaveStatusLayers.pending,LeaveStatusLayers.rejected])
      const leavesFnd = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .whereIn('id',leaves.map(e => e.leaveId))
      .whereIn('status',[LeaveStatusLayers.completed,LeaveStatusLayers.pending,LeaveStatusLayers.rejected])
      .modifiers({
        leaveTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        leaveApprovalsParams(builder) {
          builder.select('id');
          builder.select('managerId');
          builder.select('status');
          builder.select('createdAt');
        },
        userParams(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
          builder.select('name');
        },
      })
      .withGraphFetched(
        `
          [
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )

      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leavesFnd,
      };
    }
    return {
      success: false,
      message: "You are not allowed for this section!",
      data: []
    }
  }

  // leave list to be approved
  async findAll(currentUser): Promise<ResponseData> {
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({userId: currentUser.id})
    if (getUserType(currentUser) === UserLayers.layerOne) {
      const leaves = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .modifiers({
        leaveTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        leaveApprovalsParams(builder) {
          builder.select('id');
          builder.select('managerId');
          builder.select('status');
          builder.select('createdAt');
        },
        userParams(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
          builder.select('name');
        },
      })
      .withGraphFetched(
        `
          [
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leaves,
      };
    }
    if (!currentEmployee) {
      return {
        success: false,
        message: "user not found",
        data: {},
      }
    }
    if (currentEmployee.hrMember == true) {
      const leaves = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .modifiers({
        leaveTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        leaveApprovalsParams(builder) {
          builder.select('id');
          builder.select('managerId');
          builder.select('status');
          builder.select('createdAt');
        },
        userParams(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
          builder.select('name');
        },
      })
      .withGraphFetched(
        `
          [
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      return {
        success: true,
        message: 'Leave details fetch successfully.',
        data: leaves,
      };
    } else {
      const leaves = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode, employeeId: currentEmployee.id })
      .modifiers({
        leaveTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        leaveApprovalsParams(builder) {
          builder.select('id');
          builder.select('managerId');
          builder.select('status');
          builder.select('createdAt');
        },
        userParams(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
          builder.select('name');
        },
      })
      .withGraphFetched(
        `
          [
            leaveType(leaveTypeParams),
            employee.[user(userParams)],
            leaveApprovals(leaveApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
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
  async createLeave(payload: CreateLeaveDto, currentUser): Promise<ResponseData> {
    const leavePayload = payload
    if (
      currentUser.myEmployeeProfile &&
      getUserType(currentUser) !== UserLayers.layerOne &&
      !currentUser.myEmployeeProfile?.hrMember
    ) {
      leavePayload.employeeId = currentUser.myEmployeeProfile.id
    }
    if (
      !leavePayload.employeeId &&
      getUserType(currentUser) !== UserLayers.layerOne &&
      (
        currentUser.myEmployeeProfile &&
        currentUser.myEmployeeProfile?.hrMember
      )
    ) {
      leavePayload.employeeId = currentUser.myEmployeeProfile.id
    }
    if (!leavePayload.employeeId) {
      return {
        success: false,
        message: "The employeeId is required!",
        data: {},
      }
    }
    const currentLeaveType = await this.leaveTypeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      id: leavePayload.leaveTypeId
    })
    if (!currentLeaveType) {
      return {
        success: false,
        message: "The leaveType doesnt exist!",
        data: {},
      }
    }
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      id: leavePayload.employeeId
    })
    if (!currentEmployee) {
      return {
        success: false,
        message: "The employee doesnt exist!",
        data: {},
      }
    }
    const currentLeaveTypeMax = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .where({
      employeeId: currentEmployee.id,
      leaveTypeId: currentLeaveType.id,
    })
    .whereIn('status', [LeaveStatusLayers.pending, LeaveStatusLayers.completed])
    let days = currentLeaveTypeMax.map((qqw) => {
      return Number(qqw.currentBalance - qqw.remainBalance)
    }).reduce((a,b) => {return a+b },0)
    console.log("days leave type max - currentLeaveTypeMax: ",days,currentLeaveType.days)
    if (currentLeaveType.days <= days) {
      return {
        success: false,
        message: "The leaveType exceeded the current leavetype limited days!",
        data: {},
      }
    }

    if (currentUser.myEmployeeProfile.hrMember) {
      leavePayload['status'] = LeaveStatusLayers.completed
    } else {
      leavePayload['status'] = LeaveStatusLayers.pending
    }
    leavePayload['createdBy'] = currentUser.username
    leavePayload['brandCode'] = currentUser.brandCode
    if (Number(new Date(leavePayload.from)) > Number(new Date(leavePayload.to))) {
      return {
        success: false,
        message: "The from is bigger than from!",
        data: {},
      }
    }
    const leaveDurationInDays = Number(new Date(leavePayload.to)) - Number(new Date(leavePayload.from)) / 86400000
    if (leaveDurationInDays >= currentEmployee.leaveBalance && !currentLeaveType.urgent) {
      return {
        success: false,
        message: "The duration is bigger than balance!",
        data: {},
      }
    }
    if (leaveDurationInDays > currentLeaveType.days) {
      return {
        success: false,
        message: "The duration is bigger than leave type days!",
        data: {},
      }
    }
    let initFrom = leavePayload.from.toString().split(" ").length === 1 ? leavePayload.from + " 00:00:00" : leavePayload.from
    let initTo = leavePayload.to.toString().split(" ").length === 1 ? leavePayload.to + " 00:00:00" : leavePayload.to
    let fromparsedAfter: moment.Moment = moment(initFrom).add(1,'days');
    let toparsedAfter: moment.Moment = moment(initTo).add(1,'days');
    let fromparsedwithoutAfter: moment.Moment = moment(initFrom);
    let toparsedwithoutAfter: moment.Moment = moment(initTo);
    if (currentLeaveType.durationType === "hours") {
      fromparsedAfter = fromparsedAfter.add(-1,'days');
      toparsedAfter = toparsedAfter.add(-1,'days');
      fromparsedwithoutAfter = fromparsedwithoutAfter;
      toparsedwithoutAfter = toparsedwithoutAfter;
      leavePayload.from = new Date(fromparsedwithoutAfter.add(3,'hours').toString())
      leavePayload.to = new Date(toparsedwithoutAfter.add(3,'hours').toString())
    }
    console.log("leave payload:",JSON.parse(JSON.stringify([Object.values(leavePayload),fromparsedAfter,toparsedAfter])))
    let fromparsed: string
    let toparsed: string
    let fromparsedwithout: string
    let toparsedwithout: string
    if (currentLeaveType.durationType === 'hours') {
      let baseDayFrom = fromparsedwithoutAfter.format("YYYY-MM-DD").toString()
      let baseDayTo = toparsedwithoutAfter.format("YYYY-MM-DD").toString()
      console.log("base day to and from: ",baseDayTo,baseDayFrom)
      if (baseDayFrom !== baseDayTo) {
        return {
          success: false,
          message: "from and to dates are not matching the requirements depending on the duration type",
          data: {},
        }
      }
      fromparsed = fromparsedAfter.format("YYYY-MM-DD HH:mm:00").toString()
      toparsed = toparsedAfter.format('YYYY-MM-DD HH:mm:00').toString()
      fromparsedwithout = fromparsedwithoutAfter.format('YYYY-MM-DD HH:mm:00').toString()
      toparsedwithout = toparsedwithoutAfter.format('YYYY-MM-DD HH:mm:00').toString()
    } else if (currentLeaveType.durationType === "days") {
      fromparsed = fromparsedAfter.format("YYYY-MM-DD 00:00:00").toString()
      toparsed = toparsedAfter.format('YYYY-MM-DD 00:00:00').toString()
      fromparsedwithout = fromparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString()
      toparsedwithout = toparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString()
    } else {
      return {
        success: true,
        message: "leaveType duration is not supported, must be on of ['hours','days'] you can update it or add new in leaveTypes controller",
        data: {}
      }
    }
    // ------------- TODO ---------------
    // TODO: if (durationType === 'hours') -> {
    //   we need to fix this bug when we want to add a leave like below
    //   from 12:00 to 14:00 while another leave exist like from 14:00 to XX:XX
    // }
    // when c
    // ------------- TODO ---------------
    const alllvs = await this.modelClass.query()
    .select('id')
    .select('from')
    .select('to')
    .where({employeeId: currentEmployee.id})
    .whereIn('status',[LeaveStatusLayers.completed,LeaveStatusLayers.pending])
    .whereRaw(`\`from\` < '${fromparsed}'`)
    .whereRaw(`\`to\` > '${toparsed}'`)
    console.log("allleaves", JSON.parse(JSON.stringify(alllvs.map(er => Object.values(er))) ))
    const alllvs1 = await this.modelClass.query()
    .select('id')
    .select('from')
    .select('to')
    .where({employeeId: currentEmployee.id})
    .whereIn('status',[LeaveStatusLayers.completed,LeaveStatusLayers.pending])
    .whereRaw(`\`from\` < '${fromparsed}'`)
    .whereRaw(`\`to\` > '${fromparsedwithout}'`)
    console.log("alllea111", JSON.parse(JSON.stringify(alllvs1.map(er => Object.values(er))) ))
    const alllvs2 = await this.modelClass.query()
    .select('id')
    .select('from')
    .select('to')
    .where({employeeId: currentEmployee.id})
    .whereIn('status',[LeaveStatusLayers.completed,LeaveStatusLayers.pending])
    .whereRaw(`\`from\` < '${toparsed}'`)
    .whereRaw(`\`to\` > '${toparsedwithout}'`)
    console.log("alllea222", JSON.parse(JSON.stringify(alllvs2.map(er => Object.values(er))) ))
    if (alllvs.length||alllvs1.length||alllvs2.length) {
      return {
        success: false,
        message: "The duration overlaps with previous leaves!",
        data: {},
      }
    }
    let newParams = {...leavePayload}
    newParams.currentBalance = currentEmployee.leaveBalance
    if (currentEmployee.leaveBalance !== 0) {
      if (currentLeaveType.durationType === 'hours') {
        newParams.remainBalance = currentEmployee.leaveBalance - ( ( (Number( new Date(toparsedwithout) )/ 86400000) - ( Number( new Date(fromparsedwithout) )/ 86400000 ) ))
      } else {
        newParams.remainBalance = currentEmployee.leaveBalance - ( ( (Number( new Date(toparsedwithout) )/ 86400000) - ( Number( new Date(fromparsedwithout) )/ 86400000 ) ) + 1)
      }
      console.log("remain balance: ",Number(new Date(toparsedwithout)), Number(new Date(fromparsedwithout)), currentEmployee.leaveBalance,newParams.remainBalance)
    }
    // return {
    //   success: false,
    //   message: "The duration is bigger than leave type days!",
    //   data: newParams,
    // }
    const identifiersInst = await this.modelClass.query().insert(newParams);
    if (identifiersInst) {
      let retnr = []
      // if (currentUser.myEmployeeProfile.hrMember && !currentUser.myEmployeeProfile.manager) {
        retnr = await this.getManagersLeaveApproval(currentEmployee,identifiersInst,currentUser,true)
      // }
      if (currentUser.myEmployeeProfile.hrMember === 1) {
        await this.leaveApprovalClass.query().insert({brandCode: currentUser.brandCode,leaveId: identifiersInst.id, managerId: currentUser.myEmployeeProfile.id, status: LeaveStatusLayers.completed});
      }
      if (currentUser.myEmployeeProfile) {
        retnr.forEach(async (ex) => {
          console.log("ex: ",ex)
          if (currentEmployee.managerId) {
            await this.leaveApprovalClass.query().insert({brandCode: currentUser.brandCode,leaveId: identifiersInst.id, managerId: ex.managerId,status: ex.status})
          }
        })
      }
      await this.employeeClass.query()
      .where({brandCode: currentUser.brandCode, id: currentEmployee.id})
      .update({
        leaveBalance: newParams.remainBalance
      })
      console.log("updated employee balance to ", currentEmployee.leaveBalance ," - - - ",newParams.remainBalance ,"!")
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
    const leave = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(leavePayload.id)
    .withGraphFetched({employee: {user:{}},leaveApprovals:{manager:{user:{}}}, leaveType:{}});
    if (!leave) {
      return {
        success: false,
        message: "no leave found",
        data: {}
      }
    }

    if (currentUser.myEmployeeProfile.hrMember === 1 || getUserType(currentUser) !== UserLayers.layerTwo) {
      return {
        success: false,
        message: "not allowed to perform this action",
        data: {}
      }
    }
    if (!leave.leaveApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.id)) {
      return {
        success: false,
        message: "no manager found",
        data: {}
      }
    }
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    let currentApproval = leave.leaveApprovals?.filter(wer => {return wer.managerId === currentUser.myEmployeeProfile.id})[0]
    let statusss;
    let newLeaveparams;
    let newEmployeeparams;
    if (leavePayload.status === LeaveStatusLayers.rejected) {
      statusss = LeaveStatusLayers.rejected
      newLeaveparams = {
        status: LeaveStatusLayers.rejected
      }
      newEmployeeparams = {
        leaveBalance: Number(leave.employee.leaveBalance) + (Number(leave.currentBalance) - Number(leave.remainBalance))
      }
    }
    if (leavePayload.status === LeaveStatusLayers.completed) {
      statusss = LeaveStatusLayers.completed
    }
    if (currentApproval?.status !== LeaveStatusLayers.pending) {
      return {
        success: false,
        message: "not allowed to reject after completed found",
        data: {}
      }
    }
    let updatedLeaveapprovalRes;
    updatedLeaveapprovalRes = await this.leaveApprovalClass
    .query()
    .update({
      status: statusss ? statusss : currentApproval.status,
      updatedBy: currentUser.username,
    })
    .where({ id: currentApproval.id });
    if (statusss === LeaveStatusLayers.rejected) {
      await this.modelClass.query()
      .update(newLeaveparams)
      .where({id: leave.id})
      await this.employeeClass.query()
      .update(newEmployeeparams)
      .where({id: leave.employeeId})
    }
    if (updatedLeaveapprovalRes && currentUser.myEmployeeProfile.hrMember !== 1 && currentUser.myEmployeeProfile.managerId && leave.leaveApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.managerId)) {
      let currentApprovalManager = leave.leaveApprovals?.filter(wer => {return wer.managerId === currentUser.myEmployeeProfile.id})[0]
      const updatedLeaveapproval = await this.leaveApprovalClass
      .query()
      .update({
        status: LeaveStatusLayers.pending,
        updatedBy: currentUser.username,
      })
      .where({ id: currentApprovalManager.id });  
    }
    return {
      success: true,
      message: 'Leave details updated successfully.',
      data: updatedLeaveapprovalRes,
    };
  }

  //by hr
  async approveLeave(payload: UpdateApprovalDto, currentUser): Promise<ResponseData> {
    const leavePayload = payload
    const leave = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(leavePayload.id)
    .withGraphFetched({employee: {user:{}},leaveApprovals:{manager:{user:{}}}, leaveType:{}});
    if (!leave) {
      return {
        success: false,
        message: "no leave found",
        data: {}
      }
    }

    if (leave.status !== LeaveStatusLayers.pending) {
      return {
        success: false,
        message: "no leave found",
        data: {}
      }
    }

    if (currentUser.myEmployeeProfile.hrMember !== 1) {
      return {
        success: false,
        message: "not allowed to perform this action",
        data: {}
      }
    }
    if (!leave.leaveApprovals.every(erwr => erwr.status === LeaveStatusLayers.completed)) {
      return {
        success: false,
        message: "no leave found",
        data: {}
      }
    }
    let statusss;
    let newLeaveparams;
    let newEmployeeparams;
    if (leavePayload.status === LeaveStatusLayers.rejected) {
      statusss = LeaveStatusLayers.rejected
      newLeaveparams = {
        status: LeaveStatusLayers.rejected,
        updatedBy: currentUser.username,
      }
      newEmployeeparams = {
        leaveBalance: Number(leave.employee.leaveBalance) + (Number(leave.currentBalance) - Number(leave.remainBalance)),
        updatedBy: currentUser.username,
      }
    }
    if (leavePayload.status === LeaveStatusLayers.completed) {
      statusss = LeaveStatusLayers.completed
      newLeaveparams = {
        status: LeaveStatusLayers.completed,
        updatedBy: currentUser.username,
      }
    }
    if (leave?.status !== LeaveStatusLayers.pending) {
      return {
        success: false,
        message: "not allowed to reject after completed found",
        data: {}
      }
    }
    let udpatedLeave;
    udpatedLeave = await this.modelClass.query()
    .update(newLeaveparams)
    .where({id: leave.id})
    if (statusss === LeaveStatusLayers.rejected) {
      if (udpatedLeave) {
        await this.employeeClass.query()
        .update(newEmployeeparams)
        .where({id: leave.employeeId})
      }
    }
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    return {
      success: true,
      message: 'Leave details updated successfully.',
      data: udpatedLeave,
    };
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

  async getManagersLeaveApproval(employeeProfile,addedLeave,currentUser,firstManager): Promise<any[]> {
    if (employeeProfile.managerId) {
      let status = ""
      let managerId = employeeProfile.managerId
      if (firstManager === true) {
        status = LeaveStatusLayers.pending
      }
      if (currentUser.myEmployeeProfile.hrMember === 1) {
        status = LeaveStatusLayers.completed
      }
      const identifiers:any[] = [{leaveId: addedLeave.id, managerId: managerId,status: status}]

      // check if the user type is admin along with managerial role
      const managerIdd = await this.employeeClass.query().findById(employeeProfile.managerId)
      if (managerIdd && managerIdd.managerId) {
        const parentManager:any[] = await this.getManagersLeaveApproval(managerIdd,addedLeave,currentUser,false)
        console.log("merged: ",parentManager.concat(identifiers))
        if (firstManager === true && currentUser.myEmployeeProfile.hrMember === 1) {
          status = LeaveStatusLayers.completed
          managerId = currentUser.myEmployeeProfile.id
        }
        return parentManager.concat(identifiers)
      }
      // const identifiers = await this.leaveApprovalClass.query().insert({leaveId: identifiersInst.id, managerId: currentEmployee.managerId});
      console.log("getManagersLeaveApproval: ",identifiers)
      return identifiers
    }
    return []
  }
}


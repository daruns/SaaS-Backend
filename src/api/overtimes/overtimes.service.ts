import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { OvertimeModel } from 'src/database/models/overtime.model';
import { ModelClass } from 'objection';
import { CreateOvertimeDto } from './dto/create-overtime.dto';
import { UpdateApprovalDto, UpdateOvertimeDto } from './dto/update-overtime.dto';
import OvertimeApprovalModel from 'src/database/models/overtimeApproval.model';
import EmployeeModel from 'src/database/models/employee.model';
import { getUserType } from 'src/app/app.service';
import { UserLayers } from '../auth/dto/user-layers.dto';
import { OvertimeTypeModel } from 'src/database/models/overtimeType.model'
import { OvertimeStatusLayers } from './dto/overtime-status.dto';
import * as moment from 'moment';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class OvertimesService {
  constructor(
    @Inject('OvertimeModel') private modelClass: ModelClass<OvertimeModel>,
    @Inject('EmployeeModel') private employeeClass: ModelClass<EmployeeModel>,
    @Inject('OvertimeTypeModel') private overtimeTypeClass: ModelClass<OvertimeTypeModel>,
    @Inject('OvertimeApprovalModel') private overtimeApprovalClass: ModelClass<OvertimeApprovalModel>,
  ) {}

  // overtime list
  async findMyOvertimes(currentUser): Promise<ResponseData> {
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      userId: currentUser.id
    })
    if (currentEmployee) {
      const overtimes = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode, employeeId: currentUser.myEmployeeProfile.id })
      .modifiers({
        overtimeTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        overtimeApprovalsParams(builder) {
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
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      return {
        success: true,
        message: 'My Overtime details fetch successfully.',
        data: overtimes,
      };
    }
  }
  // overtime list
  async findAllApprovals(currentUser): Promise<ResponseData> {
    if (currentUser.myEmployeeProfile && currentUser.myEmployeeProfile.hrMember === 1) {
      const overtimesFnd = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .whereIn('status',[OvertimeStatusLayers.completed,OvertimeStatusLayers.pending,OvertimeStatusLayers.rejected])
      .modifiers({
        overtimeTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        overtimeApprovalsParams(builder) {
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
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      const result = overtimesFnd.filter(props => {
        if (props.overtimeApprovals.every(ee => ee.status !== 'rejected') && props.status === 'rejected') {
          return true 
        } else if (props.overtimeApprovals.every(ee => ee.status === 'completed') && props.status === 'completed') {
          return true
        } else if (props.overtimeApprovals.every(ee => ee.status === 'completed') && props.status === 'pending') {
          return true
        } else if (props.overtimeApprovals.length === 0 && !props.employee.manager) {
          return true
        } else return false
      })
      return {
        success: true,
        message: 'Overtime details fetch successfully.',
        data: result,
      };
    }
    if (currentUser.myEmployeeProfile && getUserType(currentUser) === UserLayers.layerTwo) {
      const overtimes = await this.overtimeApprovalClass.query()
      .where({ brandCode: currentUser.brandCode, managerId: currentUser.myEmployeeProfile.id })
      .whereIn('status',[OvertimeStatusLayers.completed,OvertimeStatusLayers.pending,OvertimeStatusLayers.rejected])
      const overtimesFnd = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .whereIn('id',overtimes.map(e => e.overtimeId))
      .whereIn('status',[OvertimeStatusLayers.completed,OvertimeStatusLayers.pending,OvertimeStatusLayers.rejected])
      .modifiers({
        overtimeTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        overtimeApprovalsParams(builder) {
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
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )

      return {
        success: true,
        message: 'Overtime details fetch successfully.',
        data: overtimesFnd,
      };
    }
    return {
      success: false,
      message: "You are not allowed for this section!",
      data: []
    }
  }

  // overtime list to be approved
  async findAll(currentUser): Promise<ResponseData> {
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({userId: currentUser.id})
    if (getUserType(currentUser) === UserLayers.layerOne) {
      const overtimes = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .modifiers({
        overtimeTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        overtimeApprovalsParams(builder) {
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
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      return {
        success: true,
        message: 'Overtime details fetch successfully.',
        data: overtimes,
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
      const overtimes = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .modifiers({
        overtimeTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        overtimeApprovalsParams(builder) {
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
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      return {
        success: true,
        message: 'Overtime details fetch successfully.',
        data: overtimes,
      };
    } else {
      const overtimes = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode, employeeId: currentEmployee.id })
      .modifiers({
        overtimeTypeParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('days');
          builder.select('hours');
          builder.select('durationType');
          builder.select('fund');
        },
        overtimeApprovalsParams(builder) {
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
            overtimeType(overtimeTypeParams),
            employee.[user(userParams)],
            overtimeApprovals(overtimeApprovalsParams).[manager.[user(userParams)]]
          ]
        `
      )
      return {
        success: true,
        message: 'Overtime details fetch successfully.',
        data: overtimes,
      };
    }
  }

  // find one overtime info by overtimeId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const overtime = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
    if (overtime) {
      return {
        success: true,
        message: 'Overtime details fetch successfully.',
        data: overtime,
      };
    } else {
      return {
        success: false,
        message: 'No overtime details found.',
        data: {},
      };
    }
  }

  // Create overtime before save encrypt password
  async createOvertime(payload: CreateOvertimeDto, currentUser): Promise<ResponseData> {
    const overtimePayload = payload
    if (
      currentUser.myEmployeeProfile &&
      getUserType(currentUser) !== UserLayers.layerOne &&
      !currentUser.myEmployeeProfile?.hrMember
    ) {
      overtimePayload.employeeId = currentUser.myEmployeeProfile.id
    }
    if (
      !overtimePayload.employeeId &&
      getUserType(currentUser) !== UserLayers.layerOne &&
      (
        currentUser.myEmployeeProfile &&
        currentUser.myEmployeeProfile?.hrMember
      )
    ) {
      overtimePayload.employeeId = currentUser.myEmployeeProfile.id
    }
    if (!overtimePayload.employeeId) {
      return {
        success: false,
        message: "The employeeId is required!",
        data: {},
      }
    }
    const currentOvertimeType = await this.overtimeTypeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      id: overtimePayload.overtimeTypeId
    })
    if (!currentOvertimeType) {
      return {
        success: false,
        message: "The overtimeType doesnt exist!",
        data: {},
      }
    }
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      id: overtimePayload.employeeId
    })
    if (!currentEmployee) {
      return {
        success: false,
        message: "The employee doesnt exist!",
        data: {},
      }
    }
    const currentOvertimeTypeMax = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .where({
      employeeId: currentEmployee.id,
      overtimeTypeId: currentOvertimeType.id,
    })
    .whereIn('status', [OvertimeStatusLayers.pending, OvertimeStatusLayers.completed])
    let hours = currentOvertimeTypeMax.map((qqw) => {
      return Number(qqw.currentBalance - qqw.remainBalance)
    }).reduce((a,b) => {return a+b },0)
    if (currentOvertimeType.hours <= hours) {
      return {
        success: false,
        message: "The overtimeType exceeded the current overtimetype limited hours!",
        data: {},
      }
    }

    if (currentUser.myEmployeeProfile.hrMember) {
      overtimePayload['status'] = OvertimeStatusLayers.completed
    } else {
      overtimePayload['status'] = OvertimeStatusLayers.pending
    }
    overtimePayload['createdBy'] = currentUser.username
    overtimePayload['brandCode'] = currentUser.brandCode
    if (Number(new Date(overtimePayload.from)) > Number(new Date(overtimePayload.to))) {
      return {
        success: false,
        message: "The to is bigger than from!",
        data: {},
      }
    }
    const overtimeDurationInHours = Number(new Date(overtimePayload.to)) - Number(new Date(overtimePayload.from)) / 3600000
    console.log(`overtime durationDays ${overtimeDurationInHours}`)
    console.log(`overtimePayload.from ${overtimePayload.from} === ${overtimePayload.to}`)
    if (overtimeDurationInHours >= currentEmployee.overtimeBalance) {
      return {
        success: false,
        message: "The duration is bigger than balance!",
        data: {},
      }
    }
    if (overtimeDurationInHours > currentOvertimeType.hours) {
      return {
        success: false,
        message: "The duration is bigger than overtime type hours!",
        data: {},
      }
    }
    let initFrom = overtimePayload.from.toString().split(" ").length === 1 ? overtimePayload.from + " 00:00:00" : overtimePayload.from
    let initTo = overtimePayload.to.toString().split(" ").length === 1 ? overtimePayload.to + " 00:00:00" : overtimePayload.to
    let fromparsedAfter: moment.Moment = moment(initFrom).add(1,'days');
    let toparsedAfter: moment.Moment = moment(initTo).add(1,'days');
    let fromparsedwithoutAfter: moment.Moment = moment(initFrom);
    let toparsedwithoutAfter: moment.Moment = moment(initTo);
    if (currentOvertimeType.durationType === "hours") {
      fromparsedAfter = fromparsedAfter.add(-1,'days');
      toparsedAfter = toparsedAfter.add(-1,'days');
      fromparsedwithoutAfter = fromparsedwithoutAfter;
      toparsedwithoutAfter = toparsedwithoutAfter;
      overtimePayload.from = new Date(fromparsedwithoutAfter.add(3,'hours').toString())
      overtimePayload.to = new Date(toparsedwithoutAfter.add(3,'hours').toString())
    }
    console.log("overtime payload:",JSON.parse(JSON.stringify([Object.values(overtimePayload),fromparsedAfter,toparsedAfter])))
    let fromparsed: string
    let toparsed: string
    let fromparsedwithout: string
    let toparsedwithout: string
    if (currentOvertimeType.durationType === 'hours') {
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
    } else if (currentOvertimeType.durationType === "days") {
      fromparsed = fromparsedAfter.format("YYYY-MM-DD 00:00:00").toString()
      toparsed = toparsedAfter.format('YYYY-MM-DD 00:00:00').toString()
      fromparsedwithout = fromparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString()
      toparsedwithout = toparsedwithoutAfter.format('YYYY-MM-DD 00:00:00').toString()
    } else {
      return {
        success: true,
        message: "overtimeType duration is not supported, must be on of ['hours','days'] you can update it or add new in overtimeTypes controller",
        data: {}
      }
    }
    // ------------- TODO ---------------
    // TODO: if (durationType === 'hours') -> {
    //   we need to fix this bug when we want to add a overtime like below
    //   from 12:00 to 14:00 while another overtime exist like from 14:00 to XX:XX
    // }
    // when c
    // ------------- TODO ---------------
    const alllvs = await this.modelClass.query()
    .select('id')
    .select('from')
    .select('to')
    .where({employeeId: currentEmployee.id})
    .whereIn('status',[OvertimeStatusLayers.completed,OvertimeStatusLayers.pending])
    .whereRaw(`\`from\` < '${fromparsed}'`)
    .whereRaw(`\`to\` > '${toparsed}'`)
    console.log("allovertimes", JSON.parse(JSON.stringify(alllvs.map(er => Object.values(er))) ))
    const alllvs1 = await this.modelClass.query()
    .select('id')
    .select('from')
    .select('to')
    .where({employeeId: currentEmployee.id})
    .whereIn('status',[OvertimeStatusLayers.completed,OvertimeStatusLayers.pending])
    .whereRaw(`\`from\` < '${fromparsed}'`)
    .whereRaw(`\`to\` > '${fromparsedwithout}'`)
    console.log("alllea111", JSON.parse(JSON.stringify(alllvs1.map(er => Object.values(er))) ))
    const alllvs2 = await this.modelClass.query()
    .select('id')
    .select('from')
    .select('to')
    .where({employeeId: currentEmployee.id})
    .whereIn('status',[OvertimeStatusLayers.completed,OvertimeStatusLayers.pending])
    .whereRaw(`\`from\` < '${toparsed}'`)
    .whereRaw(`\`to\` > '${toparsedwithout}'`)
    console.log("alllea222", JSON.parse(JSON.stringify(alllvs2.map(er => Object.values(er))) ))
    if (alllvs.length||alllvs1.length||alllvs2.length) {
      return {
        success: false,
        message: "The duration overlaps with previous overtimes!",
        data: {},
      }
    }
    let newParams = {...overtimePayload}
    newParams.currentBalance = currentEmployee.overtimeBalance
    if (currentEmployee.overtimeBalance !== 0) {
      newParams.remainBalance = currentEmployee.overtimeBalance - ( ( (Number( new Date(toparsedwithout) )/ 3600000) - ( Number( new Date(fromparsedwithout) )/ 3600000 ) ))
      console.log("remain balance: ",Number(new Date(toparsedwithout)), Number(new Date(fromparsedwithout)), currentEmployee.overtimeBalance,newParams.remainBalance)
    }
    // return {
    //   success: false,
    //   message: "The duration is bigger than overtime type days!",
    //   data: newParams,
    // }
    const identifiersInst = await this.modelClass.query().insert(newParams);
    if (identifiersInst) {
      let retnr = []
      // if (currentUser.myEmployeeProfile.hrMember && !currentUser.myEmployeeProfile.manager) {
        retnr = await this.getManagersOvertimeApproval(currentEmployee,identifiersInst,currentUser,true)
      // }
      if (currentUser.myEmployeeProfile.hrMember === 1) {
        await this.overtimeApprovalClass.query().insert({brandCode: currentUser.brandCode,overtimeId: identifiersInst.id, managerId: currentUser.myEmployeeProfile.id, status: OvertimeStatusLayers.completed});
      }
      if (currentUser.myEmployeeProfile) {
        retnr.forEach(async (ex) => {
          console.log("ex: ",ex)
          if (currentEmployee.managerId) {
            await this.overtimeApprovalClass.query().insert({brandCode: currentUser.brandCode,overtimeId: identifiersInst.id, managerId: ex.managerId,status: ex.status})
          }
        })
      }
      await this.employeeClass.query()
      .where({brandCode: currentUser.brandCode, id: currentEmployee.id})
      .update({
        overtimeBalance: newParams.remainBalance
      })
      console.log("updated employee balance to ", currentEmployee.overtimeBalance ," - - - ",newParams.remainBalance ,"!")
    } else {
      return {
        success: false,
        message: "couldnt create the overtime",
        data: {}
      }
    }
    const createOvertime = await this.modelClass.query().findById(identifiersInst.id);
    return {
      success: true,
      message: 'Overtime created successfully.',
      data: createOvertime,
    };
  }

  async updateApproval(payload: UpdateApprovalDto, currentUser): Promise<ResponseData> {
    const overtimePayload = payload
    const overtime = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(overtimePayload.id)
    .withGraphFetched({employee: {user:{}},overtimeApprovals:{manager:{user:{}}}, overtimeType:{}});
    if (!overtime) {
      return {
        success: false,
        message: "no overtime found",
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
    if (!overtime.overtimeApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.id)) {
      return {
        success: false,
        message: "no manager found",
        data: {}
      }
    }
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    let currentApproval = overtime.overtimeApprovals?.filter(wer => {return wer.managerId === currentUser.myEmployeeProfile.id})[0]
    let statusss;
    let newOvertimeparams;
    let newEmployeeparams;
    if (overtimePayload.status === OvertimeStatusLayers.rejected) {
      statusss = OvertimeStatusLayers.rejected
      newOvertimeparams = {
        status: OvertimeStatusLayers.rejected
      }
      newEmployeeparams = {
        overtimeBalance: Number(overtime.employee.overtimeBalance) + (Number(overtime.currentBalance) - Number(overtime.remainBalance))
      }
    }
    if (overtimePayload.status === OvertimeStatusLayers.completed) {
      statusss = OvertimeStatusLayers.completed
    }
    if (currentApproval?.status !== OvertimeStatusLayers.pending) {
      return {
        success: false,
        message: "not allowed to reject after completed found",
        data: {}
      }
    }
    let updatedOvertimeapprovalRes;
    updatedOvertimeapprovalRes = await this.overtimeApprovalClass
    .query()
    .update({
      status: statusss ? statusss : currentApproval.status,
      updatedBy: currentUser.username,
    })
    .where({ id: currentApproval.id });
    if (statusss === OvertimeStatusLayers.rejected) {
      await this.modelClass.query()
      .update(newOvertimeparams)
      .where({id: overtime.id})
      await this.employeeClass.query()
      .update(newEmployeeparams)
      .where({id: overtime.employeeId})
    }
    if (updatedOvertimeapprovalRes && currentUser.myEmployeeProfile.hrMember !== 1 && currentUser.myEmployeeProfile.managerId && overtime.overtimeApprovals.some(erwr => erwr.managerId === currentUser.myEmployeeProfile.managerId)) {
      let currentApprovalManager = overtime.overtimeApprovals?.filter(wer => {return wer.managerId === currentUser.myEmployeeProfile.id})[0]
      const updatedOvertimeapproval = await this.overtimeApprovalClass
      .query()
      .update({
        status: OvertimeStatusLayers.pending,
        updatedBy: currentUser.username,
      })
      .where({ id: currentApprovalManager.id });  
    }
    return {
      success: true,
      message: 'Overtime details updated successfully.',
      data: updatedOvertimeapprovalRes,
    };
  }

  //by hr
  async approveOvertime(payload: UpdateApprovalDto, currentUser): Promise<ResponseData> {
    const overtimePayload = payload
    const overtime = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(overtimePayload.id)
    .withGraphFetched({employee: {user:{}},overtimeApprovals:{manager:{user:{}}}, overtimeType:{}});
    if (!overtime) {
      return {
        success: false,
        message: "no overtime found",
        data: {}
      }
    }

    if (overtime.status !== OvertimeStatusLayers.pending) {
      return {
        success: false,
        message: "no overtime found",
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
    if (!overtime.overtimeApprovals.every(erwr => erwr.status === OvertimeStatusLayers.completed)) {
      return {
        success: false,
        message: "no overtime found",
        data: {}
      }
    }
    let statusss;
    let newOvertimeparams;
    let newEmployeeparams;
    if (overtimePayload.status === OvertimeStatusLayers.rejected) {
      statusss = OvertimeStatusLayers.rejected
      newOvertimeparams = {
        status: OvertimeStatusLayers.rejected,
        updatedBy: currentUser.username,
      }
      newEmployeeparams = {
        overtimeBalance: Number(overtime.employee.overtimeBalance) + (Number(overtime.currentBalance) - Number(overtime.remainBalance)),
        updatedBy: currentUser.username,
      }
    }
    if (overtimePayload.status === OvertimeStatusLayers.completed) {
      statusss = OvertimeStatusLayers.completed
      newOvertimeparams = {
        status: OvertimeStatusLayers.completed,
        updatedBy: currentUser.username,
      }
    }
    if (overtime?.status !== OvertimeStatusLayers.pending) {
      return {
        success: false,
        message: "not allowed to reject after completed found",
        data: {}
      }
    }
    let udpatedOvertime;
    udpatedOvertime = await this.modelClass.query()
    .update(newOvertimeparams)
    .where({id: overtime.id})
    if (statusss === OvertimeStatusLayers.rejected) {
      if (udpatedOvertime) {
        await this.employeeClass.query()
        .update(newEmployeeparams)
        .where({id: overtime.employeeId})
      }
    }
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    return {
      success: true,
      message: 'Overtime details updated successfully.',
      data: udpatedOvertime,
    };
  }

  async update(payload: UpdateOvertimeDto, currentUser): Promise<ResponseData> {
    const overtimePayload = payload
    const overtime = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(overtimePayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (overtime) {
      const updatedOvertime = await this.modelClass
        .query()
        .update({
          updatedBy: currentUser.username,
        })
        .where({ id: overtimePayload.id });
      return {
        success: true,
        message: 'Overtime details updated successfully.',
        data: updatedOvertime,
      };
    } else {
      return {
        success: false,
        message: 'No overtime found.',
        data: {},
      };
    }
  }

  // Delete overtime
  async deleteById(overtimeId: number, currentUser): Promise<ResponseData> {
    const overtimes = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: overtimeId
      })
      .delete()
    if (overtimes) {
      return {
        success: true,
        message: 'Overtime deleted successfully.',
        data: overtimes,
      };
    } else {
      return {
        success: false,
        message: 'No overtime found.',
        data: {},
      };
    }
  }

  async getManagersOvertimeApproval(employeeProfile,addedOvertime,currentUser,firstManager): Promise<any[]> {
    if (employeeProfile.managerId) {
      let status = ""
      let managerId = employeeProfile.managerId
      if (firstManager === true) {
        status = OvertimeStatusLayers.pending
      }
      if (currentUser.myEmployeeProfile.hrMember === 1) {
        status = OvertimeStatusLayers.completed
      }
      const identifiers:any[] = [{overtimeId: addedOvertime.id, managerId: managerId,status: status}]

      // check if the user type is admin along with managerial role
      const managerIdd = await this.employeeClass.query().findById(employeeProfile.managerId)
      if (managerIdd && managerIdd.managerId) {
        const parentManager:any[] = await this.getManagersOvertimeApproval(managerIdd,addedOvertime,currentUser,false)
        console.log("merged: ",parentManager.concat(identifiers))
        if (firstManager === true && currentUser.myEmployeeProfile.hrMember === 1) {
          status = OvertimeStatusLayers.completed
          managerId = currentUser.myEmployeeProfile.id
        }
        return parentManager.concat(identifiers)
      }
      // const identifiers = await this.overtimeApprovalClass.query().insert({overtimeId: identifiersInst.id, managerId: currentEmployee.managerId});
      console.log("getManagersOvertimeApproval: ",identifiers)
      return identifiers
    }
    return []
  }
}


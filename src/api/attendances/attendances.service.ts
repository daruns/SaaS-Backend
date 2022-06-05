import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AttendanceModel } from 'src/database/models/attendance.model';
import { ModelClass } from 'objection';
import { EmployeeModel } from 'src/database/models/employee.model'
import * as moment from 'moment';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@Injectable()
export class AttendancesService {
  constructor(
    @Inject('AttendanceModel') private modelClass: ModelClass<AttendanceModel>,
    @Inject('EmployeeModel') private employeeClass: ModelClass<EmployeeModel>,
  ) {}

  // attendance list
  async findAll(currentUser): Promise<ResponseData> {
    const attendances = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode,checkedIn: 1 })
    .withGraphFetched({employee: {user: {}}})
    return {
      success: true,
      message: 'Attendances details fetch successfully.',
      data: this.parseTable(attendances),
    }
  }
  // attendance list
  async findAllByUser(currentUser): Promise<ResponseData> {
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode})
    .findOne({userId: currentUser.id})
    .withGraphFetched({attendances: {}});
    if (!currentEmployee) {
      return {
        success: false,
        message: "You are not an employee",
        data: []
      }
    }
    if (currentEmployee?.hrMember === true) {
      const attendances = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      return {
        success: true,
        message: 'Attendances details fetch successfully.',
        data: attendances,
      };
    } else {
      return {
        success: true,
        message: 'Attendances details fetch successfully.',
        data: currentEmployee.attendances,
      };
    }
  }
  // Create attendance before save encrypt password
  async create(currentUser): Promise<ResponseData> {
    if (!currentUser.myEmployeeProfile) {
      return {
        success: true,
        message: "not allowed to perform this action",
        data: {}
      }
    }
    const attendancePayload = {}
    const lastAtt = await this.modelClass.query().orderBy('id','desc').findOne({employeeId: currentUser.myEmployeeProfile.id})
    var checkedOrNot = true
    if (lastAtt) {
      checkedOrNot = !lastAtt.checkedIn
    }
    attendancePayload['employeeId'] = currentUser.myEmployeeProfile.id
    attendancePayload['checkedIn'] = checkedOrNot
    attendancePayload['createdBy'] = currentUser.username
    attendancePayload['brandCode'] = currentUser.brandCode
    const identifiers = await this.modelClass.query().insert(attendancePayload);
    const createAttendance = await this.modelClass.query().findById(identifiers.id);
    return {
      success: true,
      message: 'Attendance created successfully.',
      data: createAttendance,
    };
  }
  parseTable(data) {
    const now = new Date();
    const thismonthDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    let finarr = []
    let employeesInd = {}
    const daysArr = Array.from({length: thismonthDays}, (e, i)=> i+1)
    for (let item of data) {
      let currentcheckedIn = item["checkedIn"]
      let currenEmployeeId = item["employeeId"]
      let parsedday = Number(moment(item["createdAt"]).format("D"))

      if (currentcheckedIn) {
        if (typeof employeesInd[currenEmployeeId] !== 'number') {
          employeesInd[currenEmployeeId] = finarr.length
          finarr.push({
            employeeId: currenEmployeeId,
            employee: item['employee'],
            attendances: daysArr.map(dy => {return {checked: parsedday === dy ? currentcheckedIn : 0, day: dy}} )
          })
        } else {
          finarr[Number(employeesInd[currenEmployeeId])]['attendances'].forEach((elem,ind) => {
            if (elem['day'] === parsedday) finarr[Number(employeesInd[currenEmployeeId ]) ]['attendances'][ind]["checked"] = currentcheckedIn
          })
        }
      }
    }
    return finarr
  }
}

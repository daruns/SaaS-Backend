import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AttendanceModel } from 'src/database/models/attendance.model';
import { ModelClass } from 'objection';
import { EmployeeModel } from 'src/database/models/employee.model'
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
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode})
    .findOne({userId: currentUser.id})
    .withGraphFetched({attendances: {}});
    if (currentEmployee.hrMember === true) {
      const attendances = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .withGraphFetched({
        designations: {}
      })
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
    const currentEmployee = await this.employeeClass.query()
    .where({ brandCode: currentUser.brandCode})
    .findOne({userId: currentUser.id});
    console.log(currentEmployee)
    if (!currentEmployee) {
      throw new UnauthorizedException()
    }
    const attendancePayload = {}
    const lastAtt = await this.modelClass.query().orderBy('createdAt','desc').findOne({employeeId: currentEmployee.id})
    var checkedOrNot = true
    if (lastAtt) {
      checkedOrNot = !lastAtt.checkedIn
    }
    console.log("deljfnel: " ,lastAtt, checkedOrNot)
    attendancePayload['employeeId'] = currentEmployee.id
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
}

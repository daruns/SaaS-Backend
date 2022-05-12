import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { ClientContactModel } from "./clientContact.model";
import { MeetingModel } from './meeting.model';
import { SocialMediaModel } from './socialMedia.model';
import { InvoiceItemModel } from './invoiceItem.model';
import ProjectModel from './project.model';
import QuoteModel from './quote.model';
import DesignationModel from './designation.model';
import { DeviceModel } from 'aws-sdk/clients/workmail';
import AttendanceModel from './attendance.model';

const tableName = 'employees'
export class EmployeeModel extends BaseModel {
  static tableName = tableName;
  name: string
  managerId: number
  userId: number
  hrMember: boolean
  designationId: number
  leaveBalance: number
  overtimeBalance: number
  workingHours: number
  salary: number
  brandCode: string

  user: UserModel;
  designation: DesignationModel;
  department: DeviceModel;
  manager: EmployeeModel;
  attendances: AttendanceModel[];

  static relationMappings = {
    // list of all user on current user
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.userId`,
        to: 'users.id',
      },
    },
    // list of all designation on current designation
    designation: {
      modelClass: `${__dirname}/designation.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.designationId`,
        to: 'designations.id',
      },
    },
    // list of all department on current department
    department: {
      modelClass: `${__dirname}/department.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.departmentId`,
        to: 'departments.id',
      },
    },
    // list of all manager on current manager
    manager: {
      modelClass: `${__dirname}/employee.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.managerId`,
        to: 'employees.id',
      },
    },
    // list of all clientContacts on current user
    attendances: {
      modelClass: `${__dirname}/attendance.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'attendances.employeeId',
      },
    },
    // // list of all clientContacts on current user
    // meetings: {
    //   modelClass: `${__dirname}/meeting.model`,
    //   relation: Model.HasManyRelation,
    //   join: {
    //     from: `${tableName}.id`,
    //     to: 'meetings.clientId',
    //   },
    // },
    // socialMedias: {
    //   modelClass: `${__dirname}/socialMedia.model`,
    //   relation: Model.HasManyRelation,
    //   join: {
    //     from: `${tableName}.id`,
    //     to: 'socialMedias.clientId',
    //   },
    // },
    // invoices: {
    //   modelClass: `${__dirname}/invoice.model`,
    //   relation: Model.HasManyRelation,
    //   join: {
    //     from: `${tableName}.id`,
    //     to: 'invoices.clientId',
    //   },
    // },
    // quotes: {
    //   modelClass: `${__dirname}/quote.model`,
    //   relation: Model.HasManyRelation,
    //   join: {
    //     from: `${tableName}.id`,
    //     to: 'quotes.clientId',
    //   },
    // },
    // projects: {
    //   modelClass: `${__dirname}/project.model`,
    //   relation: Model.HasManyRelation,
    //   join: {
    //     from: `${tableName}.id`,
    //     to: 'projects.clientId',
    //   },
    // },
  };
}

export default EmployeeModel

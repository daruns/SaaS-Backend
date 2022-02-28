import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { EmployeeModel } from 'src/database/models/employee.model';
import { ModelClass } from 'objection';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { FileParamDto, FileUploadService, ResponseData } from 'src/app/app.service';
import { UserModel } from 'src/database/models/user.model';
import { DesignationModel } from 'src/database/models/designation.model';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { AddFileDto } from 'src/app/app.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EmployeeModel') private modelClass: ModelClass<EmployeeModel>,
    @Inject('UserModel') private userClass: ModelClass<UserModel>,
    @Inject('DesignationModel') private designationClass: ModelClass<DesignationModel>,
    private readonly usersService: UsersService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // employee list
  async findAll(currentUser): Promise<ResponseData> {
    const employees = await this.modelClass
      .query()
      .where({ brandCode: currentUser.brandCode })
      .modifiers({
        selectDepartmentParams(builder) {
          builder.select('id');
          builder.select('name');
        },
        selectUserParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('avatar');
          builder.select('phoneNumber');
          builder.select('username');
          builder.select('email');
        },
      })
      .withGraphFetched(
        `
          [
            designation(selectDepartmentParams).[department(selectDepartmentParams)],
            user(selectUserParams),
            manager
          ]
        `
      )
    if (employees.length) {
      return {
        success: true,
        message: 'Employee details fetch successfully.',
        data: employees,
      };
    } else {
      return {
        success: false,
        message: 'No employees details found.',
        data: {},
      };
    }
  }

  // find one employee info by id
  async findById(id: number, currentUser): Promise<ResponseData> {
    const employee = await this.modelClass
      .query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .modifiers({
        selectDepartmentParams(builder) {
          builder.select('id');
          builder.select('name');
        },
        selectUserParams(builder) {
          builder.select('id');
          builder.select('name');
          builder.select('avatar');
          builder.select('phoneNumber');
          builder.select('username');
          builder.select('email');
        },
      })
      .withGraphFetched(
        `
          [
            designation(selectDepartmentParams).[department(selectDepartmentParams)],
            user(selectUserParams),
            manager
          ]
        `
      )
    if (employee) {
      return {
        success: true,
        message: 'Employee details fetch successfully.',
        data: employee,
      };
    } else {
      return {
        success: false,
        message: 'No employee details found.',
        data: {},
      };
    }
  }

  async createHr(payload: CreateEmployeeDto, currentUser): Promise<ResponseData> {
    const newEmployee = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({name: payload.name})
    if (newEmployee) {
      return {
        success: false,
        message: 'Employee already exists with this name!',
        data: {},
      };
    }
    var newUserParams = {}
    var newUserParamsCust = {}
    var newParams = {}
    const designationFnd = await this.designationClass.query().findById(payload.designationId)
    if (!designationFnd) {
      return {
        success: false,
        message: "designation not found!",
        data: {}
      }
    }
    if (!payload.email || !payload.username) {
      return {
        success: false,
        message: "Email and Username should not be empty",
        data: {}
      }
    }
    const userEmail = await this.userClass.query().findOne({email: `${payload.email}`})
    if (userEmail) {
      return {
        success: false,
        message: 'User Already exist with this Email address.',
        data: {},
      }
    }
    const userUsername = await this.userClass.query().findOne({username: `${payload.username}`})
    if (userUsername) {
      return {
        success: false,
        message: 'User Already exist with this Username.',
        data: {},
      };
    }
    const randomUsernameSuffix = Math.floor(Math.random() * 100000)
    let fixedUsername = payload.username ? payload.username : `${payload.name?.toLowerCase().replace(' ','')}_${randomUsernameSuffix}`
    if (payload.password) {
      const hashedPassword = await bcrypt.hash(payload.password ? payload.password : fixedUsername, 10)
      newUserParamsCust ['password'] = hashedPassword
    }    
    newUserParamsCust ['name'] = payload.name
    newUserParamsCust ['email'] = payload.email
    newUserParamsCust ['username'] = fixedUsername
    newUserParamsCust ['phoneNumber'] = payload.phoneNumber ? payload.phoneNumber : ''
    newUserParamsCust ['userType'] = 'agent'
    newUserParamsCust ['createdBy'] = currentUser.username
    newUserParamsCust ['brandCode'] = currentUser.brandCode
    newUserParamsCust ['status'] = 'active'
    const trx = await this.modelClass.startTransaction()
    var result : any
    try {
      const userInstd = await this.userClass.query(trx).insert(newUserParamsCust)
      if (!userInstd) return {
        success: false,
        message: 'user didnt insert',
        data: userInstd
      }
      newUserParams = userInstd
      newParams = {
        name: payload.name,
        leaveBalance: payload.leaveBalance,
        salary: payload.salary,
        status : "active",
        userId: newUserParams['id'],
        hrMember: true,
        createdBy : currentUser.username,
        brandCode: currentUser.brandCode,
        designationId: payload.designationId,
      }
      var createdEmployee = await this.modelClass.query(trx).insert(newParams)
      const identifier = await this.modelClass.query(trx).findById(createdEmployee.id)
      await trx.commit();

      result = identifier
      console.log('Employee and User created successfully');
      return {
        success: true,
        message: 'Employee created successfully.',
        data: result,
      };  
    } catch (err) {
      await trx.rollback();
      console.log(`Something went wrong. Employee couldnt be inserted\n ${err}`);
      result = err
      return {
        success: false,
        message: `Something went wrong. Employee couldnt be inserted.`,
        data: err,
      };
    }
  }

  // Create employee
  async create(payload:CreateEmployeeDto, currentUser): Promise<ResponseData> {
    const currentEMployee = await this.modelClass.query()
    .findOne({userId: currentUser.id, hrMember: true});
    if (!currentEMployee) { 
      throw new UnauthorizedException()
    }
    const newEmployee = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({name: payload.name})
    if (newEmployee) {
      return {
        success: false,
        message: 'Employee already exists with this name!',
        data: {},
      };
    }
    var newUserParams = {}
    var newUserParamsCust = {}
    var newParams = {}
    if (payload.managerId) {
      const managerFnd = await this.modelClass.query().findById(payload.managerId)
      if (!managerFnd) {
        return {
          success: false,
          message: "manager not found!",
          data: {}
        }
      }
      newParams['managerId'] = managerFnd.id
    }
    const designationFnd = await this.designationClass.query().findById(payload.designationId)
    if (!designationFnd) {
      return {
        success: false,
        message: "designation not found!",
        data: {}
      }
    }
    if (!payload.email || !payload.username) {
      return {
        success: false,
        message: "Email and Username should not be empty while",
        data: {}
      }
    }
    const userEmail = await this.userClass.query().findOne({email: `${payload.email}`})
    if (userEmail) {
      return {
        success: false,
        message: 'User Already exist with this Email address.',
        data: {},
      }
    }
    const userUsername = await this.userClass.query().findOne({username: `${payload.username}`})
    if (userUsername) {
      return {
        success: false,
        message: 'User Already exist with this Username.',
        data: {},
      };
    }
    const randomUsernameSuffix = Math.floor(Math.random() * 100000)
    let fixedUsername = payload.username ? payload.username : `${payload.name?.toLowerCase().replace(' ','')}_${randomUsernameSuffix}`
    if (payload.password) {
      const hashedPassword = await bcrypt.hash(payload.password ? payload.password : fixedUsername, 10)
      newUserParamsCust ['password'] = hashedPassword
    }
    newUserParamsCust ['name'] = payload.name
    newUserParamsCust ['email'] = payload.email
    newUserParamsCust ['username'] = fixedUsername
    newUserParamsCust ['phoneNumber'] = payload.phoneNumber ? payload.phoneNumber : ''
    newUserParamsCust ['userType'] = 'agent'
    newUserParamsCust ['createdBy'] = currentUser.username
    newUserParamsCust ['brandCode'] = currentUser.brandCode
    newUserParamsCust ['status'] = 'active'
    const trx = await this.modelClass.startTransaction()
    var result : any
    try {
      if (!newUserParams['id']) {
        console.log("195---------------------",newUserParamsCust)
        const userInstd = await this.userClass.query(trx).insert(newUserParamsCust)
        console.log("197---------------------",userInstd)
        if (!userInstd) return {
          success: false,
          message: 'user didnt insert',
          data: userInstd
        }
        newUserParams = userInstd
      }
      newParams = {
        name: payload.name,
        leaveBalance: payload.leaveBalance,
        salary: payload.salary,
        hrMember: false,
        status : "active",
        userId: newUserParams['id'],
        createdBy : currentUser.username,
        brandCode: currentUser.brandCode,
        designationId: payload.designationId,
      }
      
      var createdEmployee = await this.modelClass.query(trx).insert(newParams)
      const identifier = await this.modelClass.query(trx).findById(createdEmployee.id)
      console.log("219---------------------",createdEmployee.id,identifier)
      await trx.commit();

      result = identifier
      console.log('Employee and User created successfully');
      return {
        success: true,
        message: 'Employee created successfully.',
        data: result,
      };  
    } catch (err) {
      await trx.rollback();
      console.log(`Something went wrong. Employee couldnt be inserted\n ${err}`);
      result = err
      return {
        success: false,
        message: `Something went wrong. Employee couldnt be inserted.`,
        data: err,
      };
    }
  }

  async update(payload: UpdateEmployeeDto,currentUser): Promise<ResponseData> {
    // only HR and admin and owner can change 
    const employee = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(payload.id);
    if (employee) {
      const updatedEmployee = await this.modelClass
      .query()
      .update({
        managerId: payload.managerId ? payload.managerId : employee.managerId,
        leaveBalance: payload.leaveBalance ? payload.leaveBalance : employee.leaveBalance,
        salary: payload.salary ? payload.salary : employee.salary,
        designationId: payload.designationId ? payload.designationId : employee.designationId,
        userId: payload.userId ? payload.userId : employee.userId,
        name: payload.name ? payload.name : employee.name,
        // status: payload.status ? payload.status : employee.status,
        updatedBy: currentUser.username,
      })
      .where({ id: payload.id });
      if (updatedEmployee) {
        return {
          success: true,
          message: 'Employee details updated successfully.',
          data: updatedEmployee,
        };
      } else {
        return {
          success: false,
          message: 'Employee Not Updated!',
          data: updatedEmployee
        }
      }
    } else {
      return {
        success: false,
        message: 'No employee found.',
        data: {},
      };
    }
  }

  // Delete employee
  async deleteById(payload: {id: number}, currentUser): Promise<ResponseData> {
    const employee = await this.modelClass
      .query()
      .findOne({
        brandCode: currentUser.brandCode,
        id: payload.id,
      })
    if (employee) {
      await this.modelClass
      .query()
      .findOne({
        brandCode: currentUser.brandCode,
        id: payload.id,
      }).delete();
      if (employee.userId) {
        await this.userClass
        .query()
        .findOne({id: employee.userId, brandCode: currentUser.brandCode})
        .delete()
      }
      return {
        success: true,
        message: 'Employee deleted successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'No employee found.',
        data: {},
      };
    }
  }
  async findByUSerId(id: number, currentUser): Promise<ResponseData> {
    const employee = await this.modelClass
    .query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({userId: id})
    if (employee) {
      return {
        success: true,
        message: 'Employee details fetch successfully.',
        data: employee,
      };
    } else {
      return {
        success: false,
        message: 'No employee details found.',
        data: {},
      };
    }
  }
}

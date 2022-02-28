import { Injectable, Inject } from '@nestjs/common';
import { DepartmentModel } from 'src/database/models/department.model';
import { ModelClass } from 'objection';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class DepartmentsService {
  constructor(
    @Inject('DepartmentModel') private modelClass: ModelClass<DepartmentModel>,
  ) {}

  // department list
  async findAll(currentUser): Promise<ResponseData> {
    const departments = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .withGraphFetched({
      designations: {}
    })
    return {
      success: true,
      message: 'InventoryItem details fetch successfully.',
      data: departments,
    };
  }

  // find one department info by departmentId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const department = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .withGraphFetched({
        designations: {}
      })
    if (department) {
      return {
        success: true,
        message: 'Department details fetch successfully.',
        data: department,
      };
    } else {
      return {
        success: false,
        message: 'No department details found.',
        data: {},
      };
    }
  }

  // Create department before save encrypt password
  async create(payload: CreateDepartmentDto, currentUser): Promise<ResponseData> {
    const departmentPayload = payload
    const newDepartment = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: departmentPayload.name
    })
    if (!newDepartment) {
      departmentPayload['createdBy'] = currentUser.username
      departmentPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(departmentPayload);
      const createDepartment = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'Department created successfully.',
        data: createDepartment,
      };
    } else {
      return {
        success: false,
        message: 'Department already exists with this name!!!',
        data: {},
      };
    }
  }

  async update(payload: UpdateDepartmentDto, currentUser): Promise<ResponseData> {
    const departmentPayload = payload
    const department = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(departmentPayload.id);
    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (department) {
      const updatedDepartment = await this.modelClass
        .query()
        .update({
          name: departmentPayload.name ? departmentPayload.name : department.name,
          updatedBy: currentUser.username,
        })
        .where({ id: departmentPayload.id });
      return {
        success: true,
        message: 'Department details updated successfully.',
        data: updatedDepartment,
      };
    } else {
      return {
        success: false,
        message: 'No department found.',
        data: {},
      };
    }
  }

  // Delete department
  async deleteById(departmentId: number, currentUser): Promise<ResponseData> {
    const departments = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: departmentId
      })
      .delete()
    if (departments) {
      return {
        success: true,
        message: 'Department deleted successfully.',
        data: departments,
      };
    } else {
      return {
        success: false,
        message: 'No department found.',
        data: {},
      };
    }
  }
}

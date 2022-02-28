import { Injectable, Inject } from '@nestjs/common';
import { DesignationModel } from 'src/database/models/designation.model';
import { DepartmentModel } from 'src/database/models/department.model';
import { ModelClass } from 'objection';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class DesignationsService {
  constructor(
    @Inject('DesignationModel') private modelClass: ModelClass<DesignationModel>,
    @Inject('DepartmentModel') private departmentClass: ModelClass<DepartmentModel>,
  ) {}

  // designation list
  async findAll(currentUser): Promise<ResponseData> {
    const designations = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .withGraphFetched({
      department: {}
    })
    return {
      success: true,
      message: 'Departments details fetch successfully.',
      data: designations,
    };
  }

  // find one designation info by designationId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const designation = await this.modelClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findById(id)
      .withGraphFetched({
        department: {}
      })
    if (designation) {
      return {
        success: true,
        message: 'Designation details fetch successfully.',
        data: designation,
      };
    } else {
      return {
        success: false,
        message: 'No designation details found.',
        data: {},
      };
    }
  }

  // Create designation before save encrypt password
  async create(payload: CreateDesignationDto, currentUser): Promise<ResponseData> {
    const designationPayload = payload
    const newDesignation = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findOne({
      name: designationPayload.name,
      departmentId: designationPayload.departmentId,
    })

    const departmentFnd = await this.departmentClass.query().findById(designationPayload.departmentId)
    if (!departmentFnd) {
      return {
        success: false,
        message: "Department not found!",
        data: {}
      }
    }

    if (!newDesignation) {
      designationPayload['createdBy'] = currentUser.username
      designationPayload['brandCode'] = currentUser.brandCode
      const identifiers = await this.modelClass.query().insert(designationPayload);
      const createDesignation = await this.modelClass.query().findById(identifiers.id);
      return {
        success: true,
        message: 'Designation created successfully.',
        data: createDesignation,
      };
    } else {
      return {
        success: false,
        message: 'Designation already exists with this name!',
        data: {},
      };
    }
  }

  async update(payload: UpdateDesignationDto, currentUser): Promise<ResponseData> {
    const designationPayload = payload
    const designation = await this.modelClass.query()
    .where({ brandCode: currentUser.brandCode })
    .findById(designationPayload.id);

    if (designationPayload.departmentId) {
      const departmentFnd = await this.departmentClass.query()
      .where({ brandCode: currentUser.brandCode })
      .findOne({
        name: designationPayload.name,
      })
      if (!departmentFnd) {
        return {
          success: false,
          message: 'Department not found',
          data: {}
        }
      }
    }

    // IMPLEMENT and restrict if the new name is duplicate or not and so for all other tables
    if (designation) {
      const updatedDesignation = await this.modelClass
        .query()
        .update({
          name: designationPayload.name ? designationPayload.name : designation.name,
          departmentId: designationPayload.departmentId ? designationPayload.departmentId : designation.departmentId,
          updatedBy: currentUser.username,
        })
        .where({ id: designationPayload.id });
      return {
        success: true,
        message: 'Designation details updated successfully.',
        data: updatedDesignation,
      };
    } else {
      return {
        success: false,
        message: 'No designation found.',
        data: {},
      };
    }
  }

  // Delete designation
  async deleteById(designationId: number, currentUser): Promise<ResponseData> {
    const designations = await this.modelClass.query()
      .where({
        brandCode: currentUser.brandCode,
        id: designationId
      })
      .delete()
    if (designations) {
      return {
        success: true,
        message: 'Designation deleted successfully.',
        data: designations,
      };
    } else {
      return {
        success: false,
        message: 'No designation found.',
        data: {},
      };
    }
  }
}

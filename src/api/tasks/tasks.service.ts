import { Injectable, Inject } from '@nestjs/common';
import { TaskModel } from 'src/database/models/task.model';
import { ModelClass } from 'objection';
import moment = require('moment');
import { CreateTaskDto } from './dto/create-task.dto';
import { throwError } from 'rxjs';
import { TaskMemberModel } from 'src/database/models/taskMember.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserModel } from 'src/database/models/user.model';
import { AddMembersToTaskDto } from './dto/add-membersToTask.dto';
import { BoardsService } from '../boards/boards.service';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskModel') private modelClass: ModelClass<TaskModel>,
    @Inject('TaskMemberModel') private memberModelClass: ModelClass<TaskMemberModel>,
    @Inject('UserModel') private userModel: ModelClass<UserModel>,
    private readonly boardsService: BoardsService,
  ) {}

  // task list
  async findAll(currentUser): Promise<ResponseData> {
    const tasks = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .withGraphFetched({
      members: {},
    });
    return {
      success: true,
      message: 'Task details fetch successfully.',
      data: tasks,
    };
  }

  // find one task info by taskId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const task = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
      .withGraphFetched({
        members: {},
      });
    if (task) {
      return {
        success: true,
        message: 'Task details fetch successfully.',
        data: task,
      };
    } else {
      return {
        success: false,
        message: 'No task details found.',
        data: {},
      };
    }
  }

  // Create task before save encrypt password
  async create(payload: CreateTaskDto, currentUser): Promise<ResponseData> {
    const taskPayload = payload
    const taskFnd = await this.modelClass.query().findOne({name: taskPayload.name,boardId: taskPayload.boardId, brandCode: currentUser.brandCode })
    if (taskFnd) {
      return {
        success: false,
        message: 'Task already exist with that name.',
        data: {},
      };
    }

    if (taskPayload.boardId) {
      const boardFnd = await this.boardsService.findById(taskPayload.boardId,currentUser)
      if (!boardFnd.success) {
        return {
          success: false,
          message: 'Task Error: Board doesnt exist.',
          data: {},
        }
      } else {
        taskPayload['projectId'] = boardFnd.data.projectId
      }
    } else {
      return {
        success: false,
        message: 'Task Error: boardId is required.',
        data: {},
      }
    }

    taskPayload['brandCode'] = currentUser.brandCode
    taskPayload['createdBy'] = currentUser.username
    const {members, ...taskParams} = taskPayload
    console.log(members)
    console.log(taskParams)

    var result : any
    const trx = await this.modelClass.startTransaction()

    try {
      // start operation for adding task and members with relatedQuery depending on parent
      const createdTask = await this.modelClass.query(trx).insert(taskParams)
      if (createdTask) {

        for (let member of members) {
          const memberfnd = await this.userModel.query().findOne({id: member, brandCode: currentUser.brandCode})
          if (!memberfnd) {
            return {
              success: false,
              message: 'Member Error: User ' + member + ' doesnt exist.',
              data: {},
            };
          }
          const membersParams = {memberId: member , taskId: createdTask.id}
          let finishedInsert = await this.memberModelClass.query(trx).insert(membersParams)
          if (!finishedInsert) {
            throw finishedInsert
          }
        }

        result = await this.modelClass.query(trx).findById(createdTask.id).withGraphFetched({
          members: {},
        })
        await trx.commit()
        return {
          success: true,
          message: 'Task created successfully.',
          data: result,
        };      
      }
    } catch(err) {
      trx.rollback();
      result = err
      return {
        success: false,
        message: `Something went wrong. Task were not inserted.`,
        data: result,
      };
    }
  }

  async update(payload: UpdateTaskDto, currentUser): Promise<ResponseData> {
    const taskPayload = payload
    const task = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(taskPayload.id);
    if (task) {
      if (taskPayload.boardId) {
        const boardFnd = await this.boardsService.findById(taskPayload.boardId,currentUser)
        console.log(boardFnd)
        taskPayload['projectId'] = boardFnd.data.projectId
        if (!boardFnd.success) {
          return {
            success: false,
            message: 'Task Error: Board doesnt exist.',
            data: {},
          };
        }
      }

      const updatedInvoice = await this.modelClass.query()
        .update({
          name: taskPayload.name ? taskPayload.name : task.name,
          description: taskPayload.description ? taskPayload.description : task.description,
          priority: taskPayload.priority ? taskPayload.priority : task.priority,
          actualStartDate: taskPayload.actualStartDate ? taskPayload.actualStartDate : task.actualStartDate,
          actualdEndDate: taskPayload.actualdEndDate ? taskPayload.actualdEndDate : task.actualdEndDate,        
          boardId: taskPayload.boardId ? taskPayload.boardId : task.boardId,
          projectId: taskPayload['projectId'],
          status: taskPayload.status ? taskPayload.status : task.status,
          deleted: taskPayload.deleted ? taskPayload.deleted : task.deleted,
          updatedBy: currentUser.username,
        })
        .where({ id: taskPayload.id });
      return {
        success: true,
        message: 'Invoice details updated successfully.',
        data: updatedInvoice,
      };
    } else {
      return {
        success: false,
        message: 'No task found.',
        data: {},
      };
    }
  }

  async addMembers(payload: AddMembersToTaskDto, currentUser): Promise<ResponseData> {
    const taskPayload = payload
    console.log(payload)
    const task = await this.memberModelClass.query()
    .where({taskId:taskPayload.id})
    .whereIn('memberId',taskPayload.members)
    if (!task.length) {
      const taskFnd = await this.modelClass.query().findById(taskPayload.id)
      .findOne({brandCode: currentUser.brandCode})
      console.log(taskFnd)
      if (!taskFnd) {
        return {
          success: false,
          message: 'Task Add Members Error: task doesnt exist doesnt exist.',
          data: {},
        };
      }

      for (let memberId of taskPayload.members) {
        const addMember = await this.memberModelClass.query()  
        .insert({memberId: memberId, taskId: taskPayload.id});
        if (!addMember) throwError(addMember)
      }
      return {
        success: true,
        message: 'Member Added on the Task successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'Members are already exist on this task.',
        data: {},
      };
    }
  }

  async removeMembers(payload: AddMembersToTaskDto, currentUser): Promise<ResponseData> {
    const taskPayload = payload
    console.log(payload)
    const task = await this.memberModelClass.query()
    .where({taskId:taskPayload.id})
    .whereIn('memberId',taskPayload.members)
    if (task.length) {
      const taskFnd = await this.modelClass.query().findById(taskPayload.id)
      .findOne({brandCode: currentUser.brandCode})
      console.log(taskFnd)
      if (!taskFnd) {
        return {
          success: false,
          message: 'Task Remove Members Error: task doesnt exist doesnt exist.',
          data: {},
        };
      }

      const addMember = await this.memberModelClass.query()  
      .delete()
      .where({taskId: taskPayload.id})
      .whereIn('memberId', taskPayload.members)
      if (!addMember) throwError(addMember)
      return {
        success: true,
        message: 'Members Deleted on the Task successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'Members doesnt exist on this project.',
        data: {},
      };
    }
  }

  // Delete task
  async deleteById(taskId: number, currentUser): Promise<ResponseData> {
    const tasks = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .where({ id: taskId })
      .delete()
    if (tasks) {
      return {
        success: true,
        message: 'Invoice deleted successfully.',
        data: tasks,
      };
    } else {
      return {
        success: false,
        message: 'No task found.',
        data: {},
      };
    }
  }
}

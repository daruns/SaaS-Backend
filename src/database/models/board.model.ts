import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { ProjectModel } from './project.model';

export class ClientContactModel extends BaseModel {
  static tableName = 'clientContacts';

  name: string
  description: string
  brandCode: string
  projectId: number

  project: ProjectModel[];

  static relationMappings = {
    // list of all client on current user
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'clientContacts.clientId',
        to: 'clients.id',
      },
    },
    project: {
      modelClass: `${__dirname}/invoice.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'clientContacts.id',
        to: 'projects.clientContactid',
      },
    },
  };
}

import { BaseModel } from './base.model';
import { Model } from 'objection';

const tableName = 'attachments'
export class AttachmentModel extends BaseModel {
  static tableName = tableName;

  name: string
  description: string
  key: string
  url: string
  contentType: string
  size: number
  brandCode: string

  static relationMappings = {
  };
}
 export default AttachmentModel
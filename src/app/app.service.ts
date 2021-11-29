import { Req, Res, Injectable, BadRequestException, UploadedFile, Inject, HttpException } from '@nestjs/common';
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { parsePhoneNumberFromString, isSupportedCountry } from 'libphonenumber-js';
import { extname, parse } from 'path';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import  { v4 as uuid} from "uuid"
import { AttachmentModel } from 'src/database/models/attachment.model';
import { ModelClass } from 'objection';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(`Unsupported file type ${extname(file.originalname)}`, false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const documentFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|doc|DOC|pdf|PDF|xlsx|XLSX|csv|CSV)$/)) {
    callback(`Unsupported file type ${extname(file.originalname)}`, false)
  }
  callback(null, true);
};

export class PhoneNumberRegex {
  static reg = /^\+964\d{1,12}$/
}

export class linkAddressRegex {
  static reg = /((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)/
}

export class AddFileDto {
    @IsInt()
    @IsNotEmpty()
    id: number
    @IsNotEmpty()
    files: Array<Express.Multer.File>
}
export interface FileParamDto {
  originalname: string
  mimetype: string
  buffer: Buffer
  size: number
}

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

const validCountries: Array<string> = ['IQ'];
export const ToPhone = Transform(
  (value: any) => {
    if (typeof value !== 'string') return false;

    const parsed = parsePhoneNumberFromString(value);
    if (!parsed) return false;
    if (!isSupportedCountry(parsed.country)) return false;

    return parsed.number;
  },
  { toClassOnly: true },
);

@Injectable()
export class AppService {
  async getHello(): Promise<ResponseData> {
    return {
      success: true,
      message: 'successfully requested hello world',
      data: 'Hello World!'
    };
  }
}

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class FileUploadService {
  constructor(
    @Inject("AttachmentModel") private attachmentModel: ModelClass<AttachmentModel>
  ) {}

  async addFile(file: FileParamDto, currentUser): Promise<ResponseData> {
    const {buffer, originalname,size, mimetype} = file
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Body: buffer,
      Key: uuid() + originalname,
      // ACL: file.publicRead ? file.publicRead : "public-read",  ###### TODO: need to put public read for specific files
      ACL: "public-read",
    }
    return await s3.upload(params)
    .promise()
    .then(
      async (data) => {
        const insertedAttach = await this.attachmentModel.query().insert({
          name: originalname,
          description: data.ETag,
          url: data.Location,
          key: data.Key,
          contentType: mimetype,
          size: size,
          brandCode: currentUser.brandCode,
          createdBy: currentUser.username
        })
        return {
          success: true,
          message: "file uploaded to s3 bucket successfully",
          data: insertedAttach
        }
      },
      err => {
        return {
          success: false,
          message: "file didnt upload to s3 bucket!",
          data: err
        }
      }
    );
  }

  async removeFile(id: number, currentUser): Promise<ResponseData> {
    const currentAttach = await this.attachmentModel.query()
    .where({
      brandCode: currentUser.brandCode,
    })
    .findById(id)
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: currentAttach.key,
    }

    return await s3.deleteObject(params)
    .promise()
    .then(
      async (data) => {
        const currentAttach = await this.attachmentModel.query()
        .where({
          brandCode: currentUser.brandCode,
        })
        .findById(id)
        .delete()
        return {
          success: true,
          message: "file uploaded to s3 bucket successfully",
          data: data
        }
      },
      err => {
        return {
          success: false,
          message: "file didnt upload to s3 bucket!",
          data: err
        }
      }
    );
  }
}

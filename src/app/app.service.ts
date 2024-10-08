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
import moment = require('moment');
import { UserLayers } from 'src/api/auth/dto/user-layers.dto';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(`Unsupported file type ${extname(file.originalname)}`, false);
  }
  callback(null, true);
};

export const ToExstName = (filename) => {
  return (`.${filename.split(".").pop()}`)
}
export const SkipEmpty = Transform(
  (value: string) => {
    const parsed = value;
    if (parsed === "") return parsed;
    if (!(parsed.length >= 8)) return false;
  },
  { toClassOnly: true },
)

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

export const getUserType = (user) => {
  if (user && typeof user?.userType === 'string' && Object.values(UserLayers).includes(user?.userType)) {
    return `${user?.userType?.toLowerCase()}`
  } else return user?.userType
}
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

export const DefaultToNow = Transform(
  (value: any) => {
    let valuePrsd = value.toString().split(" ").length === 1 ? value.toString().split(" ") + " 00:00:00" : value
    value =  valuePrsd
    if (moment(value).isValid()) {
      value = moment(value).format('YYYY-MM-DD HH:mm:ss').toString()
    } else {
      value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString()
    }
    if (!moment(value,'YYYY-MM-DD HH:mm', true).isValid()) {
      const finVal = moment(value,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString()
      return finVal
    } else if (!moment(value,'YYYY-MM-DD HH:mm:ss',true).isValid()) {
      const finVal = moment(value,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString()
      return finVal
    } else {
      const finVal = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString()
      return finVal
    }
  },
  {toClassOnly: true}
)

export const DefaultTo = (param) => Transform(
  (value: any) => {
    if (value === null) {
      return param
    }
    if (value === '' ) {
      return param
    }
    return value
  },
  { toClassOnly: true }
)

export const DefaultToEmpty = Transform(
  (value: any) => {
    console.log("Date -type: ",typeof value, "|| value: ", value)
    if (value === '' || value === null) return ''
    if (moment(value).isValid()) {
      value = moment(value).format('YYYY-MM-DD HH:mm:ss').toString()
    } else {
      value = ''
    }
    if (!moment(value,'YYYY-MM-DD HH:mm', true).isValid()) {
      const finVal = moment(value,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString()
      return finVal
    } else if (!moment(value,'YYYY-MM-DD HH:mm:ss',true).isValid()) {
      const finVal = moment(value,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString()
      return finVal
    } else {
      return value
    }
  },
  { toClassOnly: true},
)

export const ToInteger = Transform(
  (value: any) => {
    if (typeof value !== 'number') {
      const parsedVal = parseInt(value)
      if (parsedVal.toString() !== 'NaN') {
        return parsedVal
      } else {
        return null
      }
    } else {
      return value
    }
  },
  {toClassOnly: true}
)
export const ToLower = Transform(
  (value: any) => {
    if (typeof value === 'string') {
      return value.toLowerCase();
    } else {
      return value
    }
  },
  { toClassOnly: true },
);

export const DefaultToFalse = Transform(
  (value: any) => {
    if (typeof value === 'undefined') {
      return false;
    } else {
      return value
    }
  },
  { toClassOnly: true },
);

export const ToRate = Transform(
  (value: string|number) => {
    const parsed = Number(value);
    if (parsed === NaN) return false;
    if (!(parsed >= 0) && !(parsed < 11)) return false;
    return parsed;
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
  async getFile(filename: string) {
    // Using async/await
    try {
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: filename,
      }

      await s3.headObject(params).promise();
      return await s3.getObject(params).createReadStream()
      // Do stuff with signedUrl
    } catch (error) {
      if (error.name === 'NotFound') {
        return false
      } else {
        console.log("something went wrong please contact customer service", error)
        // Handle other errors here....
        return false
      }
    }
  }

  async addFile(file: FileParamDto,  folder: string, currentUser): Promise<ResponseData> {
    const {buffer, originalname,size, mimetype} = file
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Body: buffer,
      Key: `${folder}/` + uuid() + "." + originalname.split(".").pop(),
      // Key: `${folder}/${Gen_v4()}.${extension}`, #### TODO: Folder will be users and client logo and expense and project
      // ACL: file.publicRead ? file.publicRead : "public-read", ###### TODO: need to put public read for specific files
      // ContentType: contentType,
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

import { Injectable, BadRequestException } from '@nestjs/common';
import { Transform } from "class-transformer";
import { parsePhoneNumberFromString, isSupportedCountry } from 'libphonenumber-js';
import { extname, parse } from 'path';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
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
  if (!file.originalname.match(/\.(doc|DOC|pdf|PDF)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export class PhoneNumberRegex {
  static reg = /^\+964\d{1,12}$/
}

export class linkAddressRegex {
  static reg = /((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)/
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

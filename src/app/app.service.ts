import { Injectable } from '@nestjs/common';
import { Transform } from "class-transformer";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export class PhoneNumberRegex {
  static reg = /^\+964\d{1,12}$/
}

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

const validCountries = ['IQ'];
export const ToPhone = Transform(
  (value: any) => {
if (typeof value.value !== 'string') return false;
		
    const parsed = parsePhoneNumberFromString(value.value);
    if (!parsed) return false;
    if (!validCountries.includes(parsed.country)) return false;
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

import { Injectable } from '@nestjs/common';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

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

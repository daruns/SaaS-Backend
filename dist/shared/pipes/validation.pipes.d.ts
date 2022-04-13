import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class CustomValidatePipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private buildError;
    private toValidate;
}

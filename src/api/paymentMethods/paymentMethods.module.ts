import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './paymentMethods.controller';
import { PaymentMethodsService } from './paymentMethods.service';

@Module({
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}

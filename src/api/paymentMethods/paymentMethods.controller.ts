import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Post,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';
import { PaymentMethodsService } from './paymentMethods.service';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('paymentMethods')
export class PaymentMethodsController {
  constructor(
    private readonly paymentMethodsService: PaymentMethodsService,
    ) {}

  @Get()
  @Can(Subjects.financePaymentMethods,Action.Read)
  async findAll(@Request() req) {
    const paymentMethods = await this.paymentMethodsService.findAll(req.user);
    return paymentMethods;
  }

  @Get(':id')
  @Can(Subjects.financePaymentMethods,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const paymentMethod = await this.paymentMethodsService.findById(id, req.user);
    return paymentMethod;
  }

  @Post('create')
  @Can(Subjects.financePaymentMethods,Action.Create)
  async create(@Body() paymentMethod: CreatePaymentMethodDto, @Request() req) {
    const createdPaymentMethod = await this.paymentMethodsService.create(paymentMethod, req.user);
    return createdPaymentMethod
  }

  @Post('update')
  @Can(Subjects.financePaymentMethods,Action.Update)
  update(@Body() payload: UpdatePaymentMethodDto, @Request() req) {
    return this.paymentMethodsService.update(payload, req.user);
  }

  @Post('delete')
  // delete paymentMethod by id
  @Can(Subjects.financePaymentMethods,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.paymentMethodsService.deleteById(payload.id, req.user);
  }
}

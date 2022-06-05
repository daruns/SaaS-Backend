import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import UserModel from 'src/database/models/user.model';
import { CanService } from '../can/can.service';
import { JwtAuthGuard } from './jwt-auth.guard';

export class CanGuard extends AuthGuard('jwt'){
  constructor(
    private readonly reflector: Reflector,
    private readonly can: CanService
  ) {super()}
  // @ts-ignore: Unreachable code error
  async handleRequest(err,user, info: Error,context) {
    const request = context.switchToHttp().getRequest();

    const canAttributes = this.reflector.get<{subject: string, action: string}>('can-attributes', context.getHandler());
    if (canAttributes && canAttributes.subject && canAttributes.action && user) {
      const canActivate:boolean = await this.can.can(user,canAttributes.action,canAttributes.subject)
      if(canActivate !== true) throw new UnauthorizedException()
    }
    return true
  }
}

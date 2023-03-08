import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { User } from './../../user/entities/user.entity';
import { META_ROLES } from '../decorators/role-protected/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string = this.reflector.get( META_ROLES , context.getHandler() )
    console.log('validRoles',validRoles)
    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;
    
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    console.log('user role',user)

    if ( !user ) 
      throw new BadRequestException('User not found');
    

    if ( validRoles === user.role ) {
        return true;
    }
    
    throw new ForbiddenException(
      `User ${ user.name } need a valid role: [${ validRoles }]`
    );
  }
}
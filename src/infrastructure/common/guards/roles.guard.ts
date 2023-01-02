import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private getRole = (userInfo) => {
    const userRoles: Array<any> | undefined = userInfo["dac:roles"];
    if(!userRoles) return false
    
    const acl = userRoles.filter(d => d).flat();

    const roles = acl.map(el => el.split(":").pop())

    return roles;
  }
  private checkRole = (userRoles, requiredRoles) => {
    return userRoles.map(userRole => requiredRoles.includes(userRole)).includes(true);
  }

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<any>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userRoles = this.getRole(user);

    if(!userRoles) return false;

    return this.checkRole(userRoles, requiredRoles);
  }
}
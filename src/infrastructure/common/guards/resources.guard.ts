import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResourcesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private getResources = (userInfo) => {
    return [].concat.apply([], userInfo['dac:members'].filter((el) => el !== null));
  };

  private checkResource = (dacResources, resource) => {
    return dacResources.map((el) => el.includes(resource)).includes(true);
  };

  canActivate(context: ExecutionContext): boolean {

    const { user, method, route, body } = context.switchToHttp().getRequest();

    if(method !== "PUT") return true

    if(method === "PUT" && route.path !== "/dac/info") {
      const userResources = this.getResources(user);
      return this.checkResource(userResources, body.acl);
    }

    if(method === "PUT" && route.path === "/dac/info") {
      const userResources = this.getResources(user);     
      const isController = userResources.filter(dac => dac.split(":")[0] === body.dacId);
      return isController.length > 0 ? true : false;
    }

    return true
  }
}

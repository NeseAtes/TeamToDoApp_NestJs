import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permission } from 'shared/enums/permission.enum';

async function matchPermissions(userPermissions: number, requiredPermissions: Permission[]) {
  for (const permission of requiredPermissions) {
    const hasPermission = (permission & userPermissions) === permission;
    if (!hasPermission) {
      return false;
    }
  }

  return true;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<Permission[]>('permissions', context.getHandler());

    const request = context.switchToHttp().getRequest();

    return matchPermissions(request.user.role.permissions, permissions);
  }
}

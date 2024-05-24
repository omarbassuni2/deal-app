import {
  CanActivate,
  ExecutionContext,
  Inject,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'src/users/dto/user.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

export class AuthorizationGuard implements CanActivate {
  @Inject(Reflector) private reflector: Reflector;

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => role === user.role);
  }
}

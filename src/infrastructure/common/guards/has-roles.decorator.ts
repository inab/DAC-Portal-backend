import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...roles: any) => SetMetadata('roles', roles);
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDTO } from './user-dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    const userDTO : UserDTO = {
        id: user.sub,
        name: user.name,
        email: user.email,
        roles: user['dac:roles'],
        memberships: user['dac:members']
    }

    return userDTO;
  },
);
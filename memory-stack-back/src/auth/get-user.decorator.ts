import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): UserEntity => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  },
);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * This decorator is used to get the current user from the request object
 * and can be used to get a specific property from the user object
 */
export const LoggedInUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

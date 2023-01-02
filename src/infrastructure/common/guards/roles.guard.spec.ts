import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('AuthenticatedGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  it('should return false if user has no roles assigned', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(true);
    const context = createMock<ExecutionContext>();
    const canActivate = rolesGuard.canActivate(context);
    expect(canActivate).toBe(false); 
  })

  it('should return true if user has the proper roles', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(["dac-admin", "dac-member"]);

    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: { 
            'dac:roles': [ [ 'IPC00000000001:dac-admin', 'IPC00000000002:dac-admin' ] ]
          }
        }),
      }),
    });

    const canActivate = rolesGuard.canActivate(context);
 
    expect(canActivate).toBe(true); 
  })

  /*
  describe('canActivate', () => {
    it('should return true when user has either dac-admin or dac-member role', () => {
      const mockContext = createMock<ExecutionContext>();
      console.log("mockcontext")
      console.log(mockContext)
      
      mockContext.switchToHttp().getRequest.mockReturnValue({
        // method attached to `req` instance by Passport lib
        originalUrl: '/',
        method: 'GET',
        params: undefined,
        query: undefined,
        body: undefined,
      });    
      console.log("mockcontext")
      console.log(mockContext)      
      expect(mockContext.switchToHttp()).toBeDefined();
      console.log("mock context")
      console.log(mockContext)
      mockContext.switchToHttp().getRequest.mockReturnValue({
        // method attached to `req` instance by Passport lib
        isAuthenticated: () => true,
      });
      console.log("mock context")
      console.log(mockContext)
      const canActivate = rolesGuard.canActivate(mockContext);

      expect(canActivate).toBe(true); 
    });

    it('should thrown an Unauthorized (HTTP 401) error when user is not authenticated', () => {
      const mockContext = createMock<ExecutionContext>();
      mockContext.switchToHttp().getRequest.mockReturnValue({
        // method attached to `req` instance by Passport lib
        isAuthenticated: () => false,
      });

      const callCanActivate = () => rolesGuard.canActivate(mockContext);

      expect(callCanActivate).toThrowError(UnauthorizedException);
    });
  });*/
});
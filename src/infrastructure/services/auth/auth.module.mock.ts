import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy';
import { MockAuthService } from './auth.service.mock';

@Module({
  imports: [ 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [ MockAuthService, JwtStrategy],
  exports: [ MockAuthService ],
})
export class MockAuthModule {}
import { Module } from '@nestjs/common';
import { KeycloakAuthGuard } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { KCAuthModule } from '../../../infrastructure/helpers/auth/keycloak.module';

@Module({
  imports: [ PassportModule, KeycloakAuthModule ],
  providers: [ KeycloakAuthGuard ],
  exports: [ KeycloakAuthGuard, KCAuthModule ],
})
export class KeycloakAuthModule {}
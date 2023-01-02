import { Module } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: 'IPC',
      clientId: 'dac-portal-api',
      secret: process.env.KEYCLOAK_DAC_API_CLIENT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [KeycloakConnectModule]
})
export class KCAuthModule {}
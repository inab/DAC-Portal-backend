import request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakConnectModule } from 'nest-keycloak-connect/keycloak-connect.module';
import { AppModule } from './../src/app.module';
import { MockAuthModule } from '../src/infrastructure/services/auth/auth.module.mock';
import { MockAuthService } from '../src/infrastructure/services/auth/auth.service.mock';
import { KeycloakAuthGuard } from '../src/infrastructure/services/auth/auth.service';
import { JwtAuthGuard } from '../src/infrastructure/services/auth/jwt-auth-guard';

describe('e2e tests', () => {
  let app: INestApplication;
  let auth: any = MockAuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule, 
        MockAuthModule, 
        KeycloakConnectModule.register({
          authServerUrl: 'mock',
          realm: 'mock',
          clientId: 'mock',
          secret: 'mock',
        }),     
      ],
      providers: [
        MockAuthService, JwtService, JwtAuthGuard, KeycloakAuthGuard
      ],
    })
      .overrideGuard(KeycloakAuthGuard)
      .useClass(JwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    auth = moduleFixture.get<MockAuthService>(MockAuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('has to return 403 (Unauthorized) if the user does not have the proper role - /dac/requests', async () => {
    const token = await auth.generateJwt("user")
    const response = await request(app.getHttpServer())
      .get('/dac/requests')
      .query({ "status": "Pending" })
      .auth(token, { type: 'bearer' })

    expect(response.status).toBe(403)
  });

  it('has to return all the accepted requests (1) from DACs - /dac/requests', async () => {
    const token = await auth.generateJwt("dac-admin")
    const response = await request(app.getHttpServer())
      .get('/dac/requests')
      .query({ "status": "Accepted" })
      .auth(token, { type: 'bearer' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  });

  it('has to return all the pending requests (1) from DACs - /dac/requests', async () => {
    const token = await auth.generateJwt("dac-admin")
    const response = await request(app.getHttpServer())
      .get('/dac/requests')
      .query({ "status": "Pending" })
      .auth(token, { type: 'bearer' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  });
});

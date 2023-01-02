import { Test, TestingModule } from '@nestjs/testing';
import { RequestsDacController } from '../../../controllers/requests/dac/requests.controller';
import { AcceptAccessRequest } from '../../../../application/requests/AcceptAccessRequest';
import { RejectAccessRequest } from '../../../../application/requests/RejectAccessRequest';
import { GetRequestsByStatus } from '../../../../application/requests/GetRequestsByStatus';
import { ConfigModule } from '@nestjs/config';
import { IRequestsRepositoryToken } from '../../../../domain/ports/repositories/requests/requests.interfaces';
import { configToken } from '../../../config/env.config';
import { MockRequestsRepository } from '../../../../infrastructure/repositories/requests/requests.repository.mock';
import { KeycloakConnectModule } from 'nest-keycloak-connect/keycloak-connect.module';
import { RevokeUserPermissions } from '../../../../application/requests/RevokeUserPermissions';
import { JwtAuthGuard } from '../../../../infrastructure/services/auth/jwt-auth-guard';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';

describe('RequestsDacController', () => {
  let dacController: RequestsDacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsDacController],
      providers: [
        AcceptAccessRequest, 
        RejectAccessRequest, 
        GetRequestsByStatus,
        RevokeUserPermissions,
        {
          provide: IRequestsRepositoryToken,
          useClass: MockRequestsRepository,
        },
        {
          provide: configToken,
          useClass: ConfigModule,
        },
      ],
    }).overrideGuard(KeycloakAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    dacController = module.get<RequestsDacController>(RequestsDacController);
  });

  it('should be defined', () => {
    expect(dacController).toBeDefined();
  });
});

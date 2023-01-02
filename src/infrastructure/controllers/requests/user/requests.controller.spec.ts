import { Test, TestingModule } from '@nestjs/testing';
import { RequestsUserController } from './requests.controller';
import { CreateAccessRequest } from '../../../../application/requests/CreateAccessRequest';
import { GetRequestById } from '../../../../application/requests/GetRequestById';
import { ConfigModule } from '@nestjs/config';
import { configToken } from '../../../config/env.config';
import { IRequestsRepositoryToken } from '../../../../domain/ports/repositories/requests/requests.interfaces';
import { MockRequestsRepository } from '../../../../infrastructure/repositories/requests/requests.repository.mock';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';

describe('RequestsUserController', () => {
  let controller: RequestsUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsUserController],
      providers: [
        CreateAccessRequest, 
        GetRequestById,
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

    controller = module.get<RequestsUserController>(RequestsUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

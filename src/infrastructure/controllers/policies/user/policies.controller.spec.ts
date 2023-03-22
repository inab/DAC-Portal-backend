import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesUserController } from './policies.controller';
import { FindPolicyById } from '../../../../application/policies/FindPolicyById';
import { FindPolicyByFileId } from '../../../../application/policies/FindPolicyByFileId';
import { ConfigModule } from '@nestjs/config';
import { IPoliciesRepositoryToken } from '../../../../domain/ports/repositories/policies/policies.interfaces';
import { configToken } from '../../../config/env.config';
import { MockPoliciesRepository } from '../../../../infrastructure/repositories/policies/policies.repository.mock';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';

describe('PoliciesUserController', () => {
  let controller: PoliciesUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesUserController],
      providers: [
        FindPolicyById,
        FindPolicyByFileId,
        {
          provide: IPoliciesRepositoryToken,
          useClass: MockPoliciesRepository,
        },
        {
          provide: configToken,
          useClass: ConfigModule,
        },
      ],
    }).overrideGuard(KeycloakAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PoliciesUserController>(PoliciesUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

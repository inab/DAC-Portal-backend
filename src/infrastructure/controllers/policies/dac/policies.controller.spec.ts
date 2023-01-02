import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesDacController } from './policies.controller';
import { GetAllPolicies } from '../../../../application/policies/GetAllPolicies';
import { UpdatePolicyById } from '../../../../application/policies/UpdatePolicyById';
import { IPoliciesRepositoryToken } from '../../../../domain/ports/repositories/policies/policies.interfaces';
import { MockPoliciesRepository } from '../../../../infrastructure/repositories/policies/policies.repository.mock';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { configToken } from '../../../config/env.config';
import { PolicyPresenter } from './dac-policy-dto-presenter';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';


describe('PoliciesDacController', () => {
  let controller: PoliciesDacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesDacController],
      providers: [
        GetAllPolicies,
        UpdatePolicyById,
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

    controller = module.get<PoliciesDacController>(PoliciesDacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

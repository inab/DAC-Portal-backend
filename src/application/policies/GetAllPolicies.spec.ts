import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { IPoliciesRepositoryToken } from '../../domain/ports/repositories/policies/policies.interfaces';
import { configToken } from '../../infrastructure/config/env.config';
import { MockPoliciesRepository } from '../../infrastructure/repositories/policies/policies.repository.mock';
import { GetAllPolicies } from './GetAllPolicies';

describe('PoliciesService', () => {
  let useCase: GetAllPolicies;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPolicies,
        {
          provide: IPoliciesRepositoryToken,
          useClass: MockPoliciesRepository,
        },
        {
          provide: configToken,
          useClass: ConfigModule,
        }, 
      ],
    }).compile();

    useCase = module.get<GetAllPolicies>(GetAllPolicies);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});

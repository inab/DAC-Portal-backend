import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { IPoliciesRepositoryToken } from '../../domain/ports/repositories/policies/policies.interfaces';
import { configToken } from '../../infrastructure/config/env.config';
import { MockPoliciesRepository } from '../../infrastructure/repositories/policies/policies.repository.mock';
import { FindPolicyById } from './FindPolicyById';

describe('FindPolicyById', () => {
  let useCase: FindPolicyById;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPolicyById,
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

    useCase = module.get<FindPolicyById>(FindPolicyById);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});

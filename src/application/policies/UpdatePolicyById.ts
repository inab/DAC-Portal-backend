import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configToken } from '../../infrastructure/config/env.config';
import { IPoliciesRepository, IPoliciesRepositoryToken } from '../../domain/ports/repositories/policies/policies.interfaces';
import { Policy } from '../../domain/models/policy';

@Injectable()
export class UpdatePolicyById {
  constructor(
    @Inject(IPoliciesRepositoryToken) private readonly policiesRepository: IPoliciesRepository,
    @Inject(configToken) private readonly configService: ConfigService,
  ) {}

  async run(id: string, value: string) {
    const policy = Policy.create(id, value);
    return this.policiesRepository.updatePolicyById(policy.id.value, policy.value);
  }
}

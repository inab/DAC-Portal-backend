import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configToken } from '../../infrastructure/config/env.config';
import { IPoliciesRepository, IPoliciesRepositoryToken } from '../../domain/ports/repositories/policies/policies.interfaces';

@Injectable()
export class GetAllPolicies {
  constructor(
    @Inject(IPoliciesRepositoryToken) private readonly policiesRepository: IPoliciesRepository,
    @Inject(configToken) private readonly configService: ConfigService,
  ) {}

  async run(id: string) {
    return this.policiesRepository.getAllPolicies(id);
  }
}

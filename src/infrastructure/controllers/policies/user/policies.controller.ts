import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';
import { FindPolicyById } from '../../../../application/policies/FindPolicyById';
import { GetOnePolicyDTO } from './get-one-policy.dto';

@Controller('user/policies')
@UseGuards(KeycloakAuthGuard)

export class PoliciesUserController {
  constructor(
    private readonly findPolicyById: FindPolicyById
  ) {}

  @Get()
  async findOne(@Query() getOnePolicyDTO: GetOnePolicyDTO) {
    const { id } = getOnePolicyDTO;
    return await this.findPolicyById.run(id);
  }
}

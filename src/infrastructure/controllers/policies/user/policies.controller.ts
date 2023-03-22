import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindPolicyById } from '../../../../application/policies/FindPolicyById';
import { FindPolicyByFileId } from '../../../../application/policies/FindPolicyByFileId';
import { GetOnePolicyDTO } from './get-one-policy.dto';

@Controller('user/policies')

export class PoliciesUserController {
  constructor(
    private readonly findPolicyById: FindPolicyById,
    private readonly findPolicyByFileId: FindPolicyByFileId
  ) {}

  @Get()
  async findOne(@Query() getOnePolicyDTO: GetOnePolicyDTO) {
    const { id } = getOnePolicyDTO;
    return await this.findPolicyById.run(id);
  }

  @Get('/file')
  async findOneByFile(@Query() getOnePolicyDTO: GetOnePolicyDTO) {
    const { id } = getOnePolicyDTO;
    return await this.findPolicyByFileId.run(id);
  }
}

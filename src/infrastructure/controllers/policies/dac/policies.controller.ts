import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { HasResources } from '../../../../infrastructure/common/guards/has-resources.decorator';
import { HasRoles } from '../../../../infrastructure/common/guards/has-roles.decorator';
import { ResourcesGuard } from '../../../../infrastructure/common/guards/resources.guard';
import { RolesGuard } from '../../../../infrastructure/common/guards/roles.guard';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';
import { GetAllPolicies } from '../../../../application/policies/GetAllPolicies';
import { UpdatePolicyById } from '../../../../application/policies/UpdatePolicyById';
import { UserDTO } from '../../auth/user-dto';
import { User } from '../../auth/user.decorator';
import { PolicyPresenter } from './dac-policy-dto-presenter';
import { UpdatePolicyDTO } from './update-policy.dto';

@Controller('dac/policies')
@HasRoles("dac-admin", "dac-member")
@HasResources()
@UseGuards(KeycloakAuthGuard, RolesGuard, ResourcesGuard)

export class PoliciesDacController {
  constructor(
    private readonly getAllPolicies: GetAllPolicies,
    private readonly updatePolicyById: UpdatePolicyById
  ) {}

  @Get()
  async findAllPolicies(@User() userDTO: UserDTO) : Promise<any> {
    const { id } = userDTO;
    const documents : Array<PolicyPresenter> = await this.getAllPolicies.run(id);
    return documents.map(doc => new PolicyPresenter(doc.id, doc, doc.dacId));
  }

  @Put()
  async updatePolicy(@Body() updatePolicyDTO: UpdatePolicyDTO) {
    const { id, value } = updatePolicyDTO;
    const policyId : string = await this.updatePolicyById.run(id, value)
    return new PolicyPresenter(policyId, updatePolicyDTO)
  }

}

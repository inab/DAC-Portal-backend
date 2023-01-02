import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { RejectAccessRequest } from '../../../../application/requests/RejectAccessRequest';
import { GetRequestsByStatus } from '../../../../application/requests/GetRequestsByStatus';
import { AcceptAccessRequest } from '../../../../application/requests/AcceptAccessRequest';
import { GetRequestsDTO } from './get-requests.dto';
import { User } from '../../auth/user.decorator';
import { UserDTO } from '../../auth/user-dto';
import { HasResources } from '../../../../infrastructure/common/guards/has-resources.decorator';
import { HasRoles } from '../../../../infrastructure/common/guards/has-roles.decorator';
import { ResourcesGuard } from '../../../../infrastructure/common/guards/resources.guard';
import { RolesGuard } from '../../../../infrastructure/common/guards/roles.guard';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';
import { AcceptRequestDTO } from './accept-request.dto';
import { RejectRequestDTO } from './reject-request.dto';
import { RevokeUserPermissionsDTO } from './revoke-permissions.dto';
import { RevokeUserPermissions } from '../../../../application/requests/RevokeUserPermissions';
//import { JwtAuthGuard } from '../../../../infrastructure/services/auth/jwt-auth-guard';

@Controller('dac/requests')
@HasRoles('dac-admin', 'dac-member')
@HasResources()
@UseGuards(KeycloakAuthGuard, RolesGuard, ResourcesGuard)

export class RequestsDacController {
  constructor(
    private readonly rejectAccessRequest: RejectAccessRequest,
    private readonly acceptAccessRequest: AcceptAccessRequest,
    private readonly getRequestsByStatus: GetRequestsByStatus,
    private readonly revokeUserPermissions: RevokeUserPermissions,
  ) {}

  @Put('reject')
  async rejectRequests(
    @Body() rejectRequestDTO: RejectRequestDTO,
  ) {
    const { id } = rejectRequestDTO;
    return await this.rejectAccessRequest.run(id);
  }

  @Put('accept')
  async acceptRequests(
    @User() userDTO: UserDTO,
    @Body() acceptRequestDTO: AcceptRequestDTO,
  ) {
    const { id } = userDTO;
    return await this.acceptAccessRequest.run(id, acceptRequestDTO);
  }

  @Put('revoke')
  async revokePermissions(
    @User() userDTO: UserDTO,
    @Body() revokeUserPermissionsDTO: RevokeUserPermissionsDTO,
  ) {
    const { id } = userDTO;
    return await this.revokeUserPermissions.run(id, revokeUserPermissionsDTO);
  }

  @Get()
  async getRequests(
    @User() userDTO: UserDTO,
    @Query() getRequestsDTO: GetRequestsDTO,
  ) {
    const { id, status } = { ...userDTO, ...getRequestsDTO };
    return await this.getRequestsByStatus.run(id, status);
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { KeycloakAuthGuard } from '../../../../infrastructure/services/auth/auth.service';
import { CreateAccessRequest } from '../../../../application/requests/CreateAccessRequest';
import { GetRequestById } from '../../../../application/requests/GetRequestById';
import { UserDTO } from '../../auth/user-dto';
import { User } from '../../auth/user.decorator';
import { CreateRequestDTO } from './create-request.dto';

@Controller("user/requests")
@UseGuards(KeycloakAuthGuard)

export class RequestsUserController {
  constructor(
    private readonly createAccessRequest : CreateAccessRequest,
    private readonly getUserRequests: GetRequestById,
  ) {}

  @Post()
  async createRequests(
    @User() userDTO: UserDTO,
    @Body() createRequestDTO: CreateRequestDTO) {
      const { id } = userDTO;
      return await this.createAccessRequest.run(id, createRequestDTO);
  }

  @Get()
  async getRequests(@User() userDTO: UserDTO) {
    const { id } = userDTO;
    return await this.getUserRequests.run(id);
  }
}

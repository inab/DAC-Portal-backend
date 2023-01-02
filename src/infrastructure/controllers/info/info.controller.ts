import { Body, Controller, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { KeycloakAuthGuard } from '../../services/auth/auth.service';
import { HasRoles } from '../../common/guards/has-roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ResourcesGuard } from '../../common/guards/resources.guard';
import { HasResources } from '../../common/guards/has-resources.decorator';
import { UserDTO } from '../auth/user-dto';
import { DacInfoDTO } from './dac-info-dto';
import { User } from '../auth/user.decorator';
import { GetDACInfo } from '../../../application/info/GetDACInfo';
import { UpdateDACInfo } from '../../../application/info/UpdateDACInfo';
import { InfoPresenter } from './dac-info-dto-presenter';

@Controller('dac/info')
@HasRoles("dac-admin", "dac-member")
@HasResources()
@UseGuards(KeycloakAuthGuard, RolesGuard, ResourcesGuard)

export class InfoController {
  constructor(
    private readonly getDACInfo: GetDACInfo,
    private readonly updateDACInfo: UpdateDACInfo
  ) {}

  @Get()
  async getData(@User() userDTO: UserDTO): Promise<any> {
    const { id } = userDTO;
    const documents : Array<DacInfoDTO> = await this.getDACInfo.run(id);
    return documents.map<DacInfoDTO>(doc => new InfoPresenter(doc.id, doc))
  }

  @Put()
  async updateInfo(@Body() dacInfoDTO: DacInfoDTO): Promise<any> {
    const id : string = await this.updateDACInfo.run(dacInfoDTO);
    return new InfoPresenter(id, dacInfoDTO)
  }
}

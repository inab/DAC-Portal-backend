import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { ResourcesGuard } from '../../common/guards/resources.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { KeycloakAuthGuard } from '../../services/auth/auth.service';
import { configToken } from '../../config/env.config';
import { InfoController } from './info.controller';
import { MockInfoRepository } from '../../repositories/info/info.repository.mock';
import { IInfoRepositoryToken } from '../../../domain/ports/repositories/info/info.interfaces';
import { GetDACInfo } from '../../../application/info/GetDACInfo';
import { UpdateDACInfo } from '../../../application/info/UpdateDACInfo';
import { InfoPresenter } from './dac-info-dto-presenter';

describe('DacController', () => {
  let controller: InfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoController],
      providers: [
        GetDACInfo,
        UpdateDACInfo,
        {
          provide: IInfoRepositoryToken,
          /*useValue: {
                  getData: jest.fn().mockResolvedValue("hola")
              },*/
          useClass: MockInfoRepository,
        },
        {
          provide: configToken,
          useClass: ConfigModule,
        },
      ],
      imports: [
        KeycloakConnectModule.register({
          authServerUrl: 'mock',
          realm: 'mock',
          clientId: 'mock',
          secret: 'mock',
        }),
      ],
    }).compile();

    controller = await module.resolve(InfoController);
  });

  it('should exist', async () => {
    expect(controller).toBeDefined();
  });

  it('should ensure that Guards are properly applied to the controller', async () => {
    const guards = Reflect.getMetadata('__guards__', InfoController);

    const authGuard = new guards[0]();
    const rolesGuard = new guards[1]();
    const resourcesGuard = new guards[2]();

    expect(authGuard).toBeInstanceOf(KeycloakAuthGuard);
    expect(rolesGuard).toBeInstanceOf(RolesGuard);
    expect(resourcesGuard).toBeInstanceOf(ResourcesGuard);
  });

  it('should give a dacId object', async () => {
    const dacInfoDTO = {
      adminName: 'Alfred',
      adminSurname: 'Molina',
      dacId: 'IPC00000000001',
      dacName: 'IPC Test I',
      dacStudy: 'IPC Study I',
      datasets: 'IPC Dataset I',
      emailAddress: 'alfred@gmail.com',
      id: '5901aaf9-770f-415d-8e85-c6c877e93e6f',
      status: false,
      studyDescription: 'IPC Study description I',
    };

    const document = new InfoPresenter('5901aaf9-770f-415d-8e85-c6c877e93e6f', dacInfoDTO);
    
    expect(
      await controller.getData({
        id: 'test',
        name: '',
        email: '',
        roles: [],
        memberships: [],
      }),
    ).toStrictEqual([document]);
  });
});

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { configToken } from '../../infrastructure/config/env.config';
import { MockInfoRepository } from '../../infrastructure/repositories/info/info.repository.mock';
import { IInfoRepositoryToken } from '../../domain/ports/repositories/info/info.interfaces';
import { UpdateDACInfo } from './UpdateDACInfo';

describe('RequestsService', () => {
  let useCase: UpdateDACInfo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          UpdateDACInfo,
        { 
            provide: IInfoRepositoryToken, 
            /*useValue: {
                getData: jest.fn().mockResolvedValue("hola")
            },*/
            useClass: MockInfoRepository
        },
        { 
            provide: configToken, 
            useClass: ConfigModule 
        }, 
      ],      
    }).compile();

    useCase = module.get<UpdateDACInfo>(UpdateDACInfo);
  });

  it('should be defined', async() => {
    expect(useCase).toBeDefined();
  });
});

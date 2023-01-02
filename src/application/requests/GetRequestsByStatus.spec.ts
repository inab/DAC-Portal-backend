import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { IRequestsRepositoryToken } from '../../domain/ports/repositories/requests/requests.interfaces';
import { configToken } from '../../infrastructure/config/env.config';
import { MockRequestsRepository } from '../../infrastructure/repositories/requests/requests.repository.mock';
import { GetRequestsByStatus } from './GetRequestsByStatus';

describe('GetRequestsByStatus', () => {
  let service: GetRequestsByStatus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRequestsByStatus,
        { 
          provide: IRequestsRepositoryToken, 
          /*useValue: {
              getData: jest.fn().mockResolvedValue("hola")
          },*/
          useClass: MockRequestsRepository
      },
      { 
          provide: configToken, 
          useClass: ConfigModule 
      }, 
      ],
    }).compile();

    service = module.get<GetRequestsByStatus>(GetRequestsByStatus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

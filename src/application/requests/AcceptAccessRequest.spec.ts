import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { IRequestsRepositoryToken } from '../../domain/ports/repositories/requests/requests.interfaces';
import { configToken } from '../../infrastructure/config/env.config';
import { MockRequestsRepository } from '../../infrastructure/repositories/requests/requests.repository.mock';
import { AcceptAccessRequest } from './AcceptAccessRequest';

describe('AcceptAccessRequest', () => {
  let service: AcceptAccessRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcceptAccessRequest,
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

    service = module.get<AcceptAccessRequest>(AcceptAccessRequest);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

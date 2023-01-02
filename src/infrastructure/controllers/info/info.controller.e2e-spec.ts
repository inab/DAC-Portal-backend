import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GetDACInfo } from '../../../application/info/GetDACInfo';
import { UpdateDACInfo } from '../../../application/info/UpdateDACInfo';
import { InfoPresenter } from './dac-info-dto-presenter';
import { InfoController } from './info.controller';

describe('Cats', () => {
  let app: INestApplication;
  let infoService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [InfoController],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
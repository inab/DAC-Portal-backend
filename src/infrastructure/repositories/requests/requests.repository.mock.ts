import { Injectable } from '@nestjs/common';

@Injectable()
export class MockRequestsRepository {
  async getData() {
    return [ { "dacId": "IPC00000000001" } ];
  }
}

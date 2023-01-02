import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPoliciesRepository {
  async getData() {
    return [ { "dacId": "IPC00000000001" } ];
  }
}

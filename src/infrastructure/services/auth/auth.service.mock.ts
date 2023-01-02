import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MockAuthService {
  constructor(private jwtService: JwtService) {}

  private payloadFactory = {
    'dac-admin': {
      sub: 'b9716083-b4c9-48f3-aae1-db81190aae81',
      name: 'dac-admin-1',
      email: 'dac-admin1@test.com',
      'dac:roles': [['IPC00000000001:dac-admin', 'IPC00000000002:dac-admin']],
      'dac:members': [
        ['IPC00000000001:nc:172.21.0.1:7080:001'],
        ['IPC00000000001:nc:172.21.0.1:7080:002'],
      ],
    },
    user: {
      sub: 'b9716083-b4c9-48f3-aae1-db81190aae81',
      name: 'dac-admin-1',
      email: 'dac-admin1@test.com',
    },
  };

  async generateJwt(type: string) {
    const payload: any = this.payloadFactory[type];
    return await this.jwtService.sign(payload);
  }
}

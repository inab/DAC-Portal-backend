import { Injectable } from '@nestjs/common';

@Injectable()
export class MockInfoRepository {
  async getAllDacInfoByUserId(userId: string) {
    return [
      {
        adminName: "Alfred",
        adminSurname: "Molina",
        dacId: "IPC00000000001",
        dacName: "IPC Test I",
        dacStudy: "IPC Study I",
        datasets: "IPC Dataset I",
        emailAddress: "alfred@gmail.com",
        id: "5901aaf9-770f-415d-8e85-c6c877e93e6f",
        status: false,
        studyDescription: "IPC Study description I"
      }
    ];
  }
}
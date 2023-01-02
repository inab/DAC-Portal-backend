import { UUID } from '../value-objects/uuid';

export class Info {
  readonly id: UUID;
  readonly dacId: string;
  readonly dacName: string;
  readonly dacStudy: string;
  readonly datasets: string;
  readonly adminName: string;
  readonly adminSurname: string;
  readonly emailAddress: string;
  readonly studyDescription: string;
  readonly status: boolean;

  private constructor(
    id: UUID,
    dacId: string,
    dacName: string, 
    dacStudy: string,
    datasets: string,
    adminName: string,
    adminSurname: string,
    emailAddress: string,
    studyDescription: string,
    status: boolean   
  ) {
    this.id = id;
    this.dacId = dacId;
    this.dacName = dacName;
    this.dacStudy = dacStudy;
    this.datasets = datasets;
    this.adminName = adminName;
    this.adminSurname =  adminSurname;
    this.emailAddress = emailAddress;
    this.studyDescription = studyDescription;
    this.status = status; 
  }
  
  static create(
    id: string,
    dacId: string,
    dacName: string,
    dacStudy: string,
    datasets: string,
    adminName: string,
    adminSurname: string,
    emailAddress: string,
    studyDescription: string,
    status: boolean
  ): Info {
    const info = new Info(
      new UUID(id), 
      dacId, 
      dacName,
      dacStudy,
      datasets,
      adminName,
      adminSurname,
      emailAddress,
      studyDescription,
      status
    );
    return info;
  }
}
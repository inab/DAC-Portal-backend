import { DacInfoDTO } from './dac-info-dto';

export class InfoPresenter {
  id: string;
  dacId: string;
  dacName: string;
  dacStudy: string;
  datasets: string;
  adminName: string;
  adminSurname: string;
  emailAddress: string;
  studyDescription: string;
  status: boolean;

  constructor(id: string, info: DacInfoDTO) {
    this.id = id;
    this.dacId = info.dacId;
    this.dacName = info.dacName;
    this.dacStudy = info.dacStudy;
    this.datasets = info.datasets;
    this.adminName = info.adminName;
    this.adminSurname = info.adminSurname;
    this.emailAddress = info.emailAddress;
    this.studyDescription = info.studyDescription;
    this.status = info.status;
  }
}
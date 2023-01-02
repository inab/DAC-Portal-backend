import { DacPolicyDTO } from './dac-policy.dto';

export class PolicyPresenter {
  id: string;
  dacId: string;
  fileId: string;
  acl: string;
  value: string;

  constructor(
    id: string = "", 
    policy: DacPolicyDTO = { 
      id: undefined, 
      fileId: undefined, 
      acl: undefined, 
      value: undefined
    }, 
    dacId: string = ""
    ) {
    this.id = id;
    this.dacId = dacId;
    this.fileId = policy.fileId;
    this.acl = policy.acl;
    this.value = policy.value;
  }
}
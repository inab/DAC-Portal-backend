import { Info } from "./info";
import { Policy } from "./policy";
import { Request } from "./request";
import { User } from "./user";

export class Dac {
  dacId: string;
  policies: Array<Policy>;
  memberships: Array<User>;
  requests: Array<Request>;
  info: Info;
}
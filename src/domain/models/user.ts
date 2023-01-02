export class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly roles: Array<string>;
  readonly memberships: Array<string>;

  constructor(
    id: string,
    name: string,
    email: string,
    roles: Array<string>,
    memberships: Array<string>,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.memberships = memberships;
  }
}

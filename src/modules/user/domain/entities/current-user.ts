interface Props {
  id: string;
  email: string;
  userName: string;
}

export class CurrentUser {
  readonly id: string;
  email: string;
  userName: string;

  constructor({
    id,
    email,
    userName,
  }: Props) {
    this.id = id;
    this.email = email;
    this.userName = userName;
  }
}

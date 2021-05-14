export class User {
  session: {
    user: UserDetail
    token?: string
  };
}

export class UserDetail {
  id: number;
  name: string;
  email: string;
  roles: Array<any>;
}

export class CreateUser {
  name: string;
  email: string;
  password: string;
}

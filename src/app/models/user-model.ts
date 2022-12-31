import { Role } from './role-model';

export class User {
  id!: string;
  title!: string;
  username?: string;
  password?: string;
  token?: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: Role;
  isDeleting: boolean = false;
}

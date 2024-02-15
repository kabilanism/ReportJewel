export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  token: string;
  roles: string[];
}

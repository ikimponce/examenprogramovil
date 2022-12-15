export interface AuthToken {
  id: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

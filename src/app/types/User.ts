export interface User {
  id: string;
  rut?: string;
  first_name: string;
  last_name: string;
  mothers_last_name?: string;
  email: string;
  password?: string;
  direccion?: string;
  telefono?: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

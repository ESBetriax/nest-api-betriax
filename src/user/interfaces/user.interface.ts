import { Role } from '../types/role.type';

export interface UserInterface {
  email: string;
  isActive: boolean;
  role?: Role;
}

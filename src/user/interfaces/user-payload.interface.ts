import { Role } from '../types/role.type';

export interface UserPayload {
  email: string;
  isActive: boolean;
  role?: Role;
}

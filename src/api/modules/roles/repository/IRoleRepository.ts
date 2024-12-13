import { Role } from "../model/Role";

export interface IRoleRepository {
  find(id: number): Promise<Role | undefined>;
  findAll(): Promise<Role[]>;
}

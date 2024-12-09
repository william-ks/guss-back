import { Role } from "../../entities/Role";

export interface IRoleRepository {
  find(id: number): Promise<Role | undefined>;
}

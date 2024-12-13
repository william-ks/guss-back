import { RoleRepository } from "../../repository/implementation/prisma/RoleRepository";

export class ReadAllRolesService {
  constructor(private rolesRepository: RoleRepository) {}

  async execute() {
    const roles = await this.rolesRepository.findAll();

    return roles;
  }
}

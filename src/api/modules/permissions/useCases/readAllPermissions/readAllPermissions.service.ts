import { IPermissionRepository } from "../../repository/IPermissionRepository";

export class ReadAllPermissionService {
  constructor(private permissionRepository: IPermissionRepository) {}

  async execute() {
    const permissions = await this.permissionRepository.findAll();

    return permissions;
  }
}

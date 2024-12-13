import { PermissionRepository } from "../../../permissions/repository/implementation/prisma/PermissionRepository";
import { RoleRepository } from "../../../roles/repository/implementation/prisma/RoleRepository";
import { ManagerRepository } from "../../repository/implementation/prisma/ManagerRepository";
import { UpdateSelfManagerService } from "../updateSelf/updateSelfManager.service";
import { UpdateOtherController } from "./updateOther.controller";
import { UpdateOtherService } from "./updateOther.service";

const managerRepository = new ManagerRepository();
const permissionRepository = new PermissionRepository();
const updateManagerService = new UpdateSelfManagerService(managerRepository);
const roleRepository = new RoleRepository();

const updateOtherService = new UpdateOtherService(
  managerRepository,
  permissionRepository,
  updateManagerService,
  roleRepository,
);
const updateOtherController = new UpdateOtherController(updateOtherService);

export { updateOtherController };

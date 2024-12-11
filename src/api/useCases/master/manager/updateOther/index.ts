import { ManagerRepository } from "../../../../repositories/manager/implementation/ManagerRepository";
import { PermissionRepository } from "../../../../repositories/permissions/implementation/PermissionRepository";
import { RoleRepository } from "../../../../repositories/role/implementation/RoleRepository";
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

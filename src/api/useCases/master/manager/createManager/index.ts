import { HandlePass } from "../../../../providers/passwords/implementations/HandlePass";
import { ManagerRepository } from "../../../../repositories/manager/implementation/ManagerRepository";
import { PermissionRepository } from "../../../../repositories/permissions/implementation/PermissionRepository";
import { RoleRepository } from "../../../../repositories/role/implementation/RoleRepository";
import { CreateManagerController } from "./createManager.controller";
import { CreateManagerService } from "./createManager.service";

const handlePass = new HandlePass();
const managerRepository = new ManagerRepository();
const roleRepository = new RoleRepository();
const permissionRepository = new PermissionRepository();
const createManagerService = new CreateManagerService(
  managerRepository,
  handlePass,
  roleRepository,
  permissionRepository,
);
const createManagerController = new CreateManagerController(
  createManagerService,
);

export { createManagerController };

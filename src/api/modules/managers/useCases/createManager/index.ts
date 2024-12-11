import { HandlePass } from "../../../../providers/passwords/implementations/HandlePass";
import { PermissionRepository } from "../../../permissions/repository/implementation/PermissionRepository";
import { RoleRepository } from "../../../roles/repository/implementation/RoleRepository";
import { ManagerRepository } from "../../repository/implementation/ManagerRepository";
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

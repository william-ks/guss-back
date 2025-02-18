import { PermissionMemoryRepository } from "../../../Permission/repository/memory/PermissionMemoryRepository";
import { RoleRepository } from "../../../Role/repository/RoleRepository";
import { ManagerRepository } from "../../repository/ManagerRepository";
import {
	TUpdateOtherManagerBody,
	TUpdateOtherManagerParams,
	updateOtherManagerSchema,
} from "./entities/updateOtherManager.schema";
import { UpdateOtherManagerController } from "./updateOtherManager.controller";
import { UpdateOtherManagerService } from "./updateOtherManager.service";

const managerRepository = new ManagerRepository();
const roleRepository = new RoleRepository();
const permissionRepository = new PermissionMemoryRepository();
const updateOtherManagerService = new UpdateOtherManagerService(
	managerRepository,
	roleRepository,
	permissionRepository,
);
const updateOtherManagerController = new UpdateOtherManagerController(
	updateOtherManagerService,
);

export {
	TUpdateOtherManagerBody,
	TUpdateOtherManagerParams,
	updateOtherManagerController,
	updateOtherManagerSchema,
};

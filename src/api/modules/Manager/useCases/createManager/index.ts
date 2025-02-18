import { PasswordProvider } from "../../../../providers/PasswordProvider/PasswordProvider";
import { PermissionMemoryRepository } from "../../../Permission/repository/memory/PermissionMemoryRepository";
import { RoleRepository } from "../../../Role/repository/RoleRepository";
import { ManagerRepository } from "../../repository/ManagerRepository";
import { CreateManagerController } from "./createManager.controller";
import { CreateManagerService } from "./createManager.service";
import {
	createManagerSchema,
	TCreateManagerBody,
} from "./entities/createManager.schema";

const managerRepository = new ManagerRepository();
const handlePass = new PasswordProvider();
const roleRepository = new RoleRepository();
const permissionRepository = new PermissionMemoryRepository();
const createManagerService = new CreateManagerService(
	managerRepository,
	handlePass,
	roleRepository,
	permissionRepository,
);
const createManagerController = new CreateManagerController(
	createManagerService,
);

export { createManagerController, createManagerSchema, TCreateManagerBody };

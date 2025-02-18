import { RoleRepository } from "../../repository/RoleRepository";
import { CreateRoleController } from "./createRole.controller";
import { CreateRoleService } from "./createRole.service";
import { createRoleSchema, TCreateRoleBody } from "./entities/createRole.schema";

const roleRepository = new RoleRepository();
const createRoleService = new CreateRoleService(roleRepository);
const createRoleController = new CreateRoleController(createRoleService);

export { createRoleController, createRoleSchema, TCreateRoleBody };
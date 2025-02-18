import { ManagerRepository } from "../../repository/ManagerRepository";
import { UpdateSelfManagerController } from "./updateSelfManager.controller";
import { UpdateSelfManagerService } from "./updateSelfManager.service";
import {
	updateSelfManagerSchema,
	TUpdateSelfManagerBody,
} from "./entities/updateSelfManager.schema";
import { PasswordProvider } from "../../../../providers/PasswordProvider/PasswordProvider";

const managerRepository = new ManagerRepository();
const handlePass = new PasswordProvider();
const updateSelfManagerService = new UpdateSelfManagerService(
	managerRepository,
	handlePass,
);
const updateSelfManagerController = new UpdateSelfManagerController(
	updateSelfManagerService,
);

export {
	updateSelfManagerController,
	updateSelfManagerSchema,
	TUpdateSelfManagerBody,
};

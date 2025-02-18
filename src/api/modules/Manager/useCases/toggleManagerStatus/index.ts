import { ManagerRepository } from "../../repository/ManagerRepository";
import { ToggleManagerStatusController } from "./toggleManagerStatus.controller";
import { ToggleManagerStatusService } from "./toggleManagerStatus.service";
import {
	toggleManagerStatusSchema,
	TToggleManagerStatusBody,
	TToggleManagerStatusParams,
} from "./entities/toggleManagerStatus.schema";

const managerRepository = new ManagerRepository();

const toggleManagerStatusService = new ToggleManagerStatusService(
	managerRepository,
);

const toggleManagerStatusController = new ToggleManagerStatusController(
	toggleManagerStatusService,
);

export {
	toggleManagerStatusController,
	toggleManagerStatusSchema,
	TToggleManagerStatusBody,
	TToggleManagerStatusParams,
};

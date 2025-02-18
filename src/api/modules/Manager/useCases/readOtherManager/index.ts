import { ManagerRepository } from "../../repository/ManagerRepository";
import {
	readOtherManagerSchema,
	TReadOtherManagerParams,
} from "./entities/readOtherManager.schema";
import { ReadOtherManagerController } from "./readOtherManager.controller";
import { ReadOtherManagerService } from "./readOtherManager.service";

const managerRepository = new ManagerRepository();
const readOtherManagerService = new ReadOtherManagerService(managerRepository);
const readOtherManagerController = new ReadOtherManagerController(
	readOtherManagerService,
);

export {
	readOtherManagerController,
	readOtherManagerSchema,
	TReadOtherManagerParams,
};

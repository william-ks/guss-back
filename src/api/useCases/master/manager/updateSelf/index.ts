import { ManagerRepository } from "../../../../repositories/manager/implementation/ManagerRepository";
import { UpdateSelfManagerController } from "./updateSelfManager.controller";
import { UpdateSelfManagerService } from "./updateSelfManager.service";

const managerRepository = new ManagerRepository();
const updateSelfManagerService = new UpdateSelfManagerService(
  managerRepository,
);

const updateSelfManagerController = new UpdateSelfManagerController(
  updateSelfManagerService,
);

export { updateSelfManagerController };

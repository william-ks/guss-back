import { ManagerRepository } from "../../../../repositories/manager/implementation/ManagerRepository";
import { ToggleStatusManagerController } from "./toggleStatusManager.controller";
import { ToggleStatusManagerService } from "./toggleStatusManager.service";

const managerRepository = new ManagerRepository();
const toggleStatusGestorService = new ToggleStatusManagerService(
  managerRepository,
);

const toggleStatusManagerController = new ToggleStatusManagerController(
  toggleStatusGestorService,
);

export { toggleStatusManagerController };

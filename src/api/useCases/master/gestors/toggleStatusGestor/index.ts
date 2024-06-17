import { GestorRepository } from "../../../../repositories/gestor/implementation/GestorRepository";
import { ToggleStatusGestorController } from "./toggleStatusGestor.controller";
import { ToggleStatusGestorSerice } from "./toggleStatusGestor.service";

const gestorRepository = new GestorRepository();
const toggleStatusGestorService = new ToggleStatusGestorSerice(
  gestorRepository,
);
const toggleStatusGestorController = new ToggleStatusGestorController(
  toggleStatusGestorService,
);

export { toggleStatusGestorController };

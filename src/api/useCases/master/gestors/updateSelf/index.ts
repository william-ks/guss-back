import { GestorRepository } from "../../../../repositories/gestor/implementation/GestorRepository";
import { UpdateSelfGestorController } from "./updateSelfGestor.controller";
import { UpdateSelfGestorService } from "./updateSelfGestor.service";

const gestorRepository = new GestorRepository();
const updateSelfGestorService = new UpdateSelfGestorService(gestorRepository);
const updateSelfGestorController = new UpdateSelfGestorController(
  updateSelfGestorService,
);

export { updateSelfGestorController };

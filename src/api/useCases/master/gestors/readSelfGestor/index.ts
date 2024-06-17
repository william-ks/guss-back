import { GestorRepository } from "../../../../repositories/gestor/implementation/GestorRepository";
import { ReadSelfGestorController } from "./readSelfGestor.controller";
import { ReadSelfGestorService } from "./readSelfGestor.service";

const gestorRepository = new GestorRepository();
const readSelfService = new ReadSelfGestorService(gestorRepository);
const readSelfGestorController = new ReadSelfGestorController(readSelfService);

export { readSelfGestorController };

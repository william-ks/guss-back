import { IGestorRepository } from "../../../../repositories/gestor/IGestorRepository";
import { IToggleStatusGestorDTO } from "./toggleStatusGestor.DTO";

export class ToggleStatusGestorSerice {
  constructor(private readonly gestorRepository: IGestorRepository) {}

  async execute({ status, gestorToToggle }: IToggleStatusGestorDTO) {}
}

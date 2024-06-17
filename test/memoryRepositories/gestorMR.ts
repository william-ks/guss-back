import { Gestor } from "../../src/api/entities/gestor";
import {
  IFindBy,
  IGestorRepository,
  ISaveGestor,
} from "./../../src/api/repositories/gestor/IGestorRepository";

export class gestorMR implements IGestorRepository {
    

  async findBy({ key, value }: IFindBy): Promise<Gestor> {}

  async save(props: ISaveGestor): Promise<void> {}
}

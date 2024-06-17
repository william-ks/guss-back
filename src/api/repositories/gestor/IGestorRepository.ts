import { Gestor } from "../../entities/gestor";

export interface IGestorRepository {
  findBy({ key, value }: IFindBy): Promise<Gestor>;
  findAll(): Promise<Gestor[]>;
  save(props: ISaveGestor): Promise<void>;
  toggleStatus(props: IToggleStatus): Promise<void>;
}

export interface IFindBy {
  key: "email" | "email" | "id";
  value: string;
}

export interface IToggleStatus {
  id: string;
  status: boolean;
}

export interface ISaveGestor {
  name: string;
  email: string;
  officeId: string;
  password: string;
  Feature?: {
    id: string;
  }[];
}

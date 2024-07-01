import { Gestor } from "../../entities/gestor";

export interface IGestorRepository {
  findBy({ key, value }: IFindBy): Promise<Gestor>;
  findAnother({ id, key, value }: IFindAnother): Promise<Gestor>;
  findAll(): Promise<Gestor[]>;
  save(props: ISaveGestor): Promise<void>;
  update(props: IUpdateGestor): Promise<void>;
  toggleStatus(props: IToggleStatus): Promise<void>;
}

export interface IFindBy {
  key: "email" | "id" | "cpf";
  value: string;
}

export interface IFindAnother extends IFindBy {
  id: string;
}

export interface IUpdateGestor {
  id: string;
  name?: string;
  email?: string;
  officeId?: string;
  password?: string;
  cpf?: string;
  birthDate?: string;
  address?: string;
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
  cpf?: string;
  birthDate?: string;
  address?: string;
}

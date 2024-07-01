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
  key: "email" | "id" | "cpf" | "public_id";
  value: string | number;
}

export interface IFindAnother extends IFindBy {
  id: number;
}

export interface IUpdateGestor {
  id: number;
  name?: string;
  email?: string;
  officeId?: number;
  password?: string;
  cpf?: string;
  birthDate?: string;
  address?: string;
}

export interface IToggleStatus {
  public_id: string;
  status: boolean;
}

export interface ISaveGestor {
  public_id: string;
  name: string;
  email: string;
  officeId: number;
  password: string;
  cpf?: string;
  birthDate?: string;
  address?: string;
}

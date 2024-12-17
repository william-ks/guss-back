import { StringConfigurationOptions } from "aws-sdk/clients/securityhub";
import { Manager } from "../model/Manager";

export interface IManagerRepository {
  findBy({ key, value }: IFindBy): Promise<Manager>;
  findAnother({ id, key, value }: IFindAnother): Promise<Manager>;
  findAll(): Promise<Manager[]>;
  save(props: ISaveManager): Promise<void>;
  update(props: IUpdateManager): Promise<void>;
  toggleStatus(props: IToggleStatus): Promise<void>;
}

export interface IFindBy {
  key: "email" | "id" | "cpf" | "publicId";
  value: string | number;
}

export interface IFindAnother extends IFindBy {
  id: number;
}

export interface IUpdateManager {
  id: number;
  name?: string;
  email?: string;
  roleId?: number;
  password?: string;
  cpf?: string;
  birthday?: string;
  address?: string;
  permissions?: {
    id: number;
    toAdd: boolean;
    toRemove: boolean;
  }[];
}

export interface IToggleStatus {
  publicId: string;
  status: boolean;
}

export interface ISaveManager {
  publicId: string;
  name: string;
  photo: string;
  email: string;
  roleId: number;
  password: string;
  cpf?: string;
  birthday?: string;
  permissions?: number[];
}

import { Manager } from "../../model/Manager";

export interface ICreateManagerDTO {
  actualManager: Manager;
  name: string;
  photo?: string;
  email: string;
  roleId: number;
  cpf: string;
  birthday?: string;
  address?: string;
  permissions: number[];
}

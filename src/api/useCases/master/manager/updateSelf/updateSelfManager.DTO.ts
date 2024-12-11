export interface IUpdateSelfManagerDTO {
  id: number;
  photo?: string;
  name?: string;
  roleId?: number;
  email?: string;
  birthday?: string;
  cpf?: string;
  permissions?: {
    id: number;
    toAdd: boolean;
    toRemove: boolean;
  }[];
}

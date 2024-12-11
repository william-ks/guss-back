export interface ICreateManagerDTO {
  name: string;
  email: string;
  roleId: number;
  cpf: string;
  birthday?: string;
  address?: string;
  permissions: number[];
  managerPermissions: {
    id: number;
  }[];
}

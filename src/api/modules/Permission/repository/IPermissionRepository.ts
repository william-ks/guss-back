import { Permission } from "../model/Permission";

export interface IPermissionRepository {
	save(props: ICreatePermission): Promise<void>;
	listAll(): Promise<Permission[]>;
	findByCode(code: string): Promise<Permission>;
}

export interface ICreatePermission extends Omit<Permission, "id"> {}

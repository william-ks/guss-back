import { Role } from "../model/Role";

export interface IRoleRepository {
	save(props: ICreateRole): Promise<void>;
	listAll(): Promise<Role[]>;
	findUniqueById(id: number): Promise<Role | null>;
	findUniqueByTitle(title: string): Promise<Role | null>;
	update(props: IUpdateRole): Promise<void>;
	softDelete(id: number): Promise<void>;
}

export interface ICreateRole {
	title: string;
	points: number;
}

export interface IUpdateRole extends Omit<Role, "id"> {
	id: number;
}

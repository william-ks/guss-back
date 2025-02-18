import { Manager } from "../model/Manager";

export interface IManagerRepository {
	save(props: ICreateManager): Promise<void>;
	listAll(): Promise<Manager[]>;
	findAnother({ id, key, value }: IFindAnother): Promise<Manager>;
	findUniqueBy({ key, value }: IFindUniqueBy): Promise<Manager | null>;
	update(props: IUpdateManager): Promise<void>;
	softDelete(id: number): Promise<void>;
}

export interface ICreateManager {
	publicId: string;
	name: string;
	email: string;
	address?: string;
	photo: string;
	roleId: number;
	birthday?: string;
	cpf: string;
	password: string;
	phone?: string;
	isDefaultPassword?: boolean;
	permissions: string[];
}

export interface IFindUniqueBy {
	key: "id" | "publicId" | "email" | "cpf";
	value: string | number;
}

export interface IFindAnother extends IFindUniqueBy {
	id: number;
}

export interface IUpdateManager {
	id: number;
	address?: string;
	name?: string;
	email?: string;
	photo?: string;
	roleId?: number;
	birthday?: string;
	cpf?: string;
	password?: string;
	phone?: string;
	isDefaultPassword?: boolean;
	permissions?: string[];
	isActive?: boolean;
	isDeleted?: boolean;
	primaryColor?: string;
	grayColor?: string;
	theme?: string;
}

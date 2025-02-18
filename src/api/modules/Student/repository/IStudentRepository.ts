import { Student } from "../model/Student";

export interface IStudentRepository {
	save(props: ICreateStudent): Promise<void>;
	listAll(): Promise<Student[]>;
	findAnother({ id, key, value }: IFindAnother): Promise<Student>;
	findUniqueBy({ key, value }: IFindUniqueBy): Promise<Student | null>;
	update(props: IUpdateStudent): Promise<void>;
	softDelete(id: number): Promise<void>;
}

export interface ICreateStudent extends Omit<Student, "id"> {}

export interface IFindUniqueBy {
	key: "id" | "publicId" | "email" | "cpf";
	value: string | number;
}

export interface IFindAnother extends IFindUniqueBy {
	id: number;
}

export interface IUpdateStudent extends Partial<Omit<Student, "id">> {
	id: number;
}

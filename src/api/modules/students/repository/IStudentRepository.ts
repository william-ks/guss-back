import { Student } from "../model/Student";

export interface IFindBy {
  key: "email" | "email" | "id" | "publicId";
  value: string | number;
}

export interface ICreateStudent {
  name: string;
  publicId: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
  birthday?: string;
  class_time?: string;
}

export interface IStudentRepository {
  findBy({ key, value }: IFindBy): Promise<Student>;
  create(data: ICreateStudent): Promise<void>;
}

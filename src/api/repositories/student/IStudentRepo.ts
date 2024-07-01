import { Student } from "../../entities/Student";

export interface IFindBy {
  key: "email" | "email" | "id";
  value: string;
}

export interface ICreateStudent {
  name: string;
  email: string;
  password: string;
  celphone?: string;
  cpf?: string;
  birthDate?: string;
  class_time?: string;
}

export interface IStudentRepo {
  find_by({ key, value }: IFindBy): Promise<Student>;
  create(data: ICreateStudent): Promise<void>;
}

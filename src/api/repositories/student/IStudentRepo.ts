import { Student } from "../../entities/Student";

export interface IFindBy {
  key: "email" | "email" | "id" | "public_id";
  value: string | number;
}

export interface ICreateStudent {
  name: string;
  public_id: string;
  email: string;
  password: string;
  celphone?: string;
  cpf?: string;
  birthday?: string;
  class_time?: string;
}

export interface IStudentRepo {
  find_by({ key, value }: IFindBy): Promise<Student>;
  create(data: ICreateStudent): Promise<void>;
}

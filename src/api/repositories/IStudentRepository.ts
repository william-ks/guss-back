import { Student } from "../entities/Student";

export interface ICreateRepository {}

export interface IStudentRepository {
  create(student: ICreateRepository): Promise<Student>;
}

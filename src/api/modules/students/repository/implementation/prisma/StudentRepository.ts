import { prismaDb } from "../../../../../../config/prisma";
import { Student } from "../../../model/Student";
import {
  ICreateStudent,
  IFindBy,
  IStudentRepository,
} from "../../IStudentRepository";

export class StudentRepository implements IStudentRepository {
  async findBy({ key, value }: IFindBy): Promise<Student> {
    const student = await prismaDb.student.findFirst({
      where: {
        [key]: value,
      },
    });

    return student;
  }

  async create(data: ICreateStudent): Promise<void> {
    await prismaDb.student.create({
      data: {
        ...data,
      },
    });
  }
}

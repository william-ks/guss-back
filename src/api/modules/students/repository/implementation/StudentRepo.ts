import { Student } from "../../../../entities/Student";
import { db } from "../../../../../config/prisma";
import { ICreateStudent, IFindBy, IStudentRepo } from "../IStudentRepo";

export class StudentRepo implements IStudentRepo {
  async find_by({ key, value }: IFindBy): Promise<Student> {
    const student = await db.student.findFirst({
      where: {
        [key]: value,
      },
    });

    return student;
  }

  async create(data: ICreateStudent): Promise<void> {
    await db.student.create({
      data: {
        ...data,
      },
    });
  }
}

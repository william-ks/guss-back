import { prisma } from "../../../../config/prisma";
import { Student } from "../model/Student";
import {
	ICreateStudent,
	IFindUniqueBy,
	IUpdateStudent,
	IStudentRepository,
	IFindAnother,
} from "./IStudentRepository";

class StudentRepository implements IStudentRepository {
	async listAll(): Promise<Student[]> {
		const students = await prisma.student.findMany({
			where: {
				isDeleted: false,
			},
		});

		return students;
	}

	async findAnother({ id, key, value }: IFindAnother): Promise<Student> {
		const student = await prisma.student.findFirst({
			where: {
				[key]: value,
				id: { not: id },
			},
		});

		return student;
	}

	async findUniqueBy({ key, value }: IFindUniqueBy): Promise<Student | null> {
		const student = await prisma.student.findFirst({
			where: {
				[key]: value,
				isDeleted: false,
			},
		});

		return student ? student : null;
	}

	async update(props: IUpdateStudent): Promise<void> {
		const { id, ...dataToUpdate } = props;

		await prisma.student.update({
			where: {
				id: id,
				isDeleted: false,
			},
			data: {
				...dataToUpdate,
			},
		});
	}

	async softDelete(id: number): Promise<void> {
		await prisma.student.update({
			where: {
				id,
			},
			data: {},
		});
	}

	async save(props: ICreateStudent): Promise<void> {
		await prisma.student.create({
			data: {
				...props,
			},
		});
	}
}

export { StudentRepository };

import { prisma } from "../../../../config/prisma";
import { Classroom } from "../model/Classroom";
import {
ICreateClassroom,
IFindUniqueBy,
IUpdateClassroom,
IClassroomRepository,
} from "./IClassroomRepository";


class ClassroomRepository implements IClassroomRepository {
    async listAll(): Promise<Classroom[]> {
        const classrooms = await prisma.classroom.findMany({
            where: {
                isDeleted: false,
            },
        });
    
        return classrooms;
    }
    
    async findUniqueBy({ key, value }: IFindUniqueBy): Promise<Classroom | null> {
        const classroom = await prisma.classroom.findFirst({
            where: {
                [key]: value,
                isDeleted: false,
            },
        });

        return classroom ? classroom : null;
    }
    
    async update(props: IUpdateClassroom): Promise<void> {
        const { id, ...dataToUpdate } = props;

        await prisma.classroom.update({
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
        await prisma.classroom.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
    }

    async save(props: ICreateClassroom): Promise<void> {
        await prisma.classroom.create({
            data: {
                ...props,
            },
        });
    }
}

export { ClassroomRepository };

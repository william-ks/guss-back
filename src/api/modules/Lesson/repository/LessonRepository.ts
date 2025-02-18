import { prisma } from "../../../../config/prisma";
import { Lesson } from "../model/Lesson";
import {
ICreateLesson,
IFindUniqueBy,
IUpdateLesson,
ILessonRepository,
} from "./ILessonRepository";


class LessonRepository implements ILessonRepository {
    async listAll(): Promise<Lesson[]> {
        const lessons = await prisma.lesson.findMany({
            where: {
                isDeleted: false,
            },
        });
    
        return lessons;
    }
    
    async findUniqueBy({ key, value }: IFindUniqueBy): Promise<Lesson | null> {
        const lesson = await prisma.lesson.findFirst({
            where: {
                [key]: value,
                isDeleted: false,
            },
        });

        return lesson ? lesson : null;
    }
    
    async update(props: IUpdateLesson): Promise<void> {
        const { id, ...dataToUpdate } = props;

        await prisma.lesson.update({
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
        await prisma.lesson.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
    }

    async save(props: ICreateLesson): Promise<void> {
        await prisma.lesson.create({
            data: {
                ...props,
            },
        });
    }
}

export { LessonRepository };

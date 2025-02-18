import { Lesson } from "../model/Lesson"

export interface ILessonRepository{
    save(props: ICreateLesson): Promise<void>;
    listAll(): Promise<Lesson[]>;
    findUniqueBy({ key, value }: IFindUniqueBy): Promise<Lesson | null>;
    update(props: IUpdateLesson): Promise<void>;
    softDelete(id: number): Promise<void>;
}

export interface ICreateLesson extends Omit<Lesson, "id"> {}

export interface IFindUniqueBy {
    key: "id" | "publicId" | "email";
    value: string | number;
}

export interface IUpdateLesson extends Omit<Lesson, "id"> {
    id: number;
}
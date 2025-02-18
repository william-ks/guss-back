import { Classroom } from "../model/Classroom"

export interface IClassroomRepository{
    save(props: ICreateClassroom): Promise<void>;
    listAll(): Promise<Classroom[]>;
    findUniqueBy({ key, value }: IFindUniqueBy): Promise<Classroom | null>;
    update(props: IUpdateClassroom): Promise<void>;
    softDelete(id: number): Promise<void>;
}

export interface ICreateClassroom extends Omit<Classroom, "id"> {}

export interface IFindUniqueBy {
    key: "id" | "publicId" | "email";
    value: string | number;
}

export interface IUpdateClassroom extends Omit<Classroom, "id"> {
    id: number;
}
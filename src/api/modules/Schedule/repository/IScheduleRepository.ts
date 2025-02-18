import { Schedule } from "../model/Schedule"

export interface IScheduleRepository{
    save(props: ICreateSchedule): Promise<void>;
    listAll(): Promise<Schedule[]>;
    findUniqueBy({ key, value }: IFindUniqueBy): Promise<Schedule | null>;
    update(props: IUpdateSchedule): Promise<void>;
    softDelete(id: number): Promise<void>;
}

export interface ICreateSchedule extends Omit<Schedule, "id"> {}

export interface IFindUniqueBy {
    key: "id" | "publicId" | "email";
    value: string | number;
}

export interface IUpdateSchedule extends Omit<Schedule, "id"> {
    id: number;
}
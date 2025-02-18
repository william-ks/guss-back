import { prisma } from "../../../../config/prisma";
import { Schedule } from "../model/Schedule";
import {
ICreateSchedule,
IFindUniqueBy,
IUpdateSchedule,
IScheduleRepository,
} from "./IScheduleRepository";


class ScheduleRepository implements IScheduleRepository {
    async listAll(): Promise<Schedule[]> {
        const schedules = await prisma.schedule.findMany({
            where: {
                isDeleted: false,
            },
        });
    
        return schedules;
    }
    
    async findUniqueBy({ key, value }: IFindUniqueBy): Promise<Schedule | null> {
        const schedule = await prisma.schedule.findFirst({
            where: {
                [key]: value,
                isDeleted: false,
            },
        });

        return schedule ? schedule : null;
    }
    
    async update(props: IUpdateSchedule): Promise<void> {
        const { id, ...dataToUpdate } = props;

        await prisma.schedule.update({
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
        await prisma.schedule.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
    }

    async save(props: ICreateSchedule): Promise<void> {
        await prisma.schedule.create({
            data: {
                ...props,
            },
        });
    }
}

export { ScheduleRepository };

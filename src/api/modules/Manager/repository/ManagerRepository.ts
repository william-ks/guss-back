import { prisma } from "../../../../config/prisma";
import { Manager } from "../model/Manager";
import {
	ICreateManager,
	IFindUniqueBy,
	IUpdateManager,
	IManagerRepository,
	IFindAnother,
} from "./IManagerRepository";

class ManagerRepository implements IManagerRepository {
	async listAll(): Promise<Manager[]> {
		const managers = await prisma.manager.findMany({
			where: {
				isDeleted: false,
			},
			include: {
				role: {
					select: {
						id: true,
						title: true,
						points: true,
					},
				},
			},
		});

		return managers;
	}

	async findUniqueBy({ key, value }: IFindUniqueBy): Promise<Manager | null> {
		const manager = await prisma.manager.findFirst({
			where: {
				[key]: value,
				isDeleted: false,
			},
			include: {
				role: {
					select: {
						id: true,
						title: true,
						points: true,
					},
				},
			},
		});

		return manager ? manager : null;
	}

	async findAnother({ id, key, value }: IFindAnother): Promise<Manager> {
		const found = await prisma.manager.findFirst({
			where: {
				[key]: value,
				AND: {
					NOT: {
						id,
					},
				},
			},
			include: {
				role: {
					select: {
						id: true,
						title: true,
						points: true,
					},
				},
			},
		});

		return found;
	}

	async update(props: IUpdateManager): Promise<void> {
		const { id, ...dataToUpdate } = props;
		await prisma.manager.update({
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
		await prisma.manager.update({
			where: {
				id,
			},
			data: {},
		});
	}

	async save(props: ICreateManager): Promise<void> {
		await prisma.manager.create({
			data: {
				...props,
			},
		});
	}
}

export { ManagerRepository };

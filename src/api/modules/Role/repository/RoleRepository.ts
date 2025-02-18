import { prisma } from "../../../../config/prisma";
import { Role } from "../model/Role";
import { ICreateRole, IUpdateRole, IRoleRepository } from "./IRoleRepository";

class RoleRepository implements IRoleRepository {
	async listAll(): Promise<Role[]> {
		const roles = await prisma.role.findMany({
			where: {
				isDeleted: false,
			},
			orderBy: {
				title: "asc",
			},
		});

		return roles;
	}

	async findUniqueById(id: number): Promise<Role | null> {
		const role = await prisma.role.findFirst({
			where: {
				id: id,
				isDeleted: false,
			},
		});

		return role ? role : null;
	}

	async findUniqueByTitle(title: string): Promise<Role | null> {
		const role = await prisma.role.findFirst({
			where: {
				title,
				isDeleted: false,
			},
		});

		return role ? role : null;
	}

	async update(props: IUpdateRole): Promise<void> {
		const { id, ...dataToUpdate } = props;
	}

	async softDelete(id: number): Promise<void> {
		await prisma.role.update({
			where: {
				id,
			},
			data: {
				isDeleted: true,
			},
		});
	}

	async save(props: ICreateRole): Promise<void> {
		await prisma.role.create({
			data: {
				...props,
			},
		});
	}
}

export { RoleRepository };

import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({});

const createRoles = async () => {
	const roles = [
		{
			title: "Developer",
			points: 100,
		},
		{
			title: "Owner",
			points: 80,
		},
		{
			title: "Gestor",
			points: 60,
		},
		{
			title: "Teacher",
			points: 40,
		},
	];

	const existRoles = await db.role.findMany();

	if (existRoles.length >= roles.length) {
		return;
	}

	if (existRoles.length <= 0) {
		for (const role of roles) {
			await db.role.create({
				data: {
					title: role.title,
					points: role.points,
				},
			});
		}

		return;
	}

	if (existRoles.length < roles.length) {
		const rolesToCreate = roles.filter((role) => {
			return !existRoles.find(
				(existRole) => existRole.title === role.title,
			);
		});

		for (const role of rolesToCreate) {
			await db.role.create({
				data: {
					title: role.title,
					points: role.points,
				},
			});
		}

		return;
	}
};

const createDefaultDev = async () => {
	const manager = await db.manager.findFirst();

	if (manager) {
		return;
	}

	await db.manager.create({
		data: {
			publicId: nanoid(),
			name: "developer",
			photo: "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg",
			email: "dev@gmail.com",
			password:
				"$2a$10$aq4R41Eg4sIZS7P8/kjYa.HIgcZvn6IwNQIT0cPE.hbEUzKuT8tK6",
			cpf: "000.000.000-00",
			roleId: 1,
		},
	});
};

const main = async () => {
	await createRoles();
	await createDefaultDev();
};

main();

import { PermissionsDb } from "../../../../shared/PermissionsDb";
import { generatePermissions } from "../../functions/generatePermissions";
import { ICreatePermission } from "../IPermissionRepository";
import { IPermissionRepository } from "../IPermissionRepository";
import { fastify } from "../../../../../app";

class PermissionMemoryRepository implements IPermissionRepository {
	async save(props: ICreatePermission) {
		PermissionsDb.push({
			id: PermissionsDb.length + 1,
			name: props.name,
			code: props.code,
			tags: props.tags,
		});
	}

	async listAll() {
		if (PermissionsDb.length <= 0) {
			await generatePermissions(fastify);
		}

		return PermissionsDb.sort((a, b) => a.name.localeCompare(b.name));
	}

	async findByCode(code: string) {
		const permission = PermissionsDb.find(
			(permission) => permission.code === code,
		);

		return permission;
	}
}

export { PermissionMemoryRepository };

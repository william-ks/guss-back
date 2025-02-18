import { PermissionsDb } from "../../../../shared/PermissionsDb";
import { IPermissionRepository } from "../../../Permission/repository/IPermissionRepository";
import { IRoleRepository } from "../../../Role/repository/IRoleRepository";
import { IManagerRepository } from "../../repository/IManagerRepository";
import { IUpdateOtherManagerDTO } from "./entities/updateOtherManager.DTO";

class UpdateOtherManagerService {
	constructor(
		private managerRepository: IManagerRepository,
		private roleRepository: IRoleRepository,
		private permissionRepository: IPermissionRepository,
	) {}

	async execute(props: IUpdateOtherManagerDTO) {
		const { idToUpdate, actualManager, ...preDataToUpdate } = props;

		const fieldsToUpdate = Object.keys(preDataToUpdate).filter((key) => {
			if (key === "permissions") {
				return (
					preDataToUpdate[key] !== null &&
					preDataToUpdate[key] !== undefined &&
					preDataToUpdate[key].length > 0
				);
			}

			return (
				preDataToUpdate[key] !== null &&
				preDataToUpdate[key] !== undefined
			);
		});

		if (fieldsToUpdate.length <= 0) {
			throw {
				code: 400,
				message:
					"There is not enough data to update the current manager's information.",
			};
		}

		const managerToUpdate = await this.managerRepository.findUniqueBy({
			key: "publicId",
			value: idToUpdate,
		});

		if (!managerToUpdate) {
			throw {
				code: 404,
				message: "Manager not found.",
			};
		}

		if (managerToUpdate.id === actualManager.id) {
			throw {
				code: 401,
				message: "You can't update your own permissions.",
			};
		}

		const dataToUpdate: IDataToUpdate = {};

		for (const field of fieldsToUpdate) {
			if (field === "permissions") {
				await this.permissionsValitation({
					actualManagerPermissions: actualManager.permissions,
					managerToUpdatePermissions: managerToUpdate.permissions,
					permissionsToUpdate: preDataToUpdate[
						field
					] as IPermissionDTO[],
				});

				dataToUpdate.permissions = managerToUpdate.permissions.filter(
					(el) => {
						const isUpdating = preDataToUpdate[field].find((ls) => {
							return ls.code === el;
						});

						if (!isUpdating) return el;
					},
				);

				for (const permission of preDataToUpdate[field]) {
					if (permission.toAdd) {
						dataToUpdate.permissions.push(permission.code);
					}
				}
			}

			if (field === "roleId") {
				await this.validateRoleId({
					actualManagerRolePoints: actualManager.role.points,
					roleId: preDataToUpdate[field],
				});

				dataToUpdate[field] = preDataToUpdate[field];
			}
		}

		await this.managerRepository.update({
			id: managerToUpdate.id,
			...dataToUpdate,
		});
	}

	async permissionsValitation(props: IPermissionsValidation) {
		const {
			actualManagerPermissions,
			managerToUpdatePermissions,
			permissionsToUpdate,
		} = props;

		const haveInvalidPermissions = permissionsToUpdate.find(
			(permission) => {
				return permission.toAdd === permission.toRemove;
			},
		);

		if (haveInvalidPermissions) {
			throw {
				code: 400,
				message:
					"You can't add and remove a permission at the same time.",
			};
		}

		for (const permission of permissionsToUpdate) {
			const existPermission = await this.permissionRepository.findByCode(
				permission.code,
			);

			if (!existPermission) {
				throw {
					code: 404,
					message: `Permission not found: ${permission.code}.`,
				};
			}

			if (!actualManagerPermissions.includes(permission.code)) {
				throw {
					code: 401,
					message: `You don't have permission to ${permission.toAdd ? "add" : "remove"} ${permission.code} permission.`,
				};
			}

			if (
				permission.toAdd &&
				managerToUpdatePermissions.includes(permission.code)
			) {
				throw {
					code: 400,
					message: `User already have this permission ${permission.code}.`,
				};
			}

			if (
				permission.toRemove &&
				!managerToUpdatePermissions.includes(permission.code)
			) {
				throw {
					code: 400,
					message: `User not have this permission ${permission.code}.`,
				};
			}
		}
	}

	async validateRoleId(props: IValidateRoleId) {
		const { actualManagerRolePoints, roleId } = props;

		const roleFound = await this.roleRepository.findUniqueById(roleId);

		if (!roleFound) {
			throw {
				code: 404,
				message: `RoleId not found: ${roleId}`,
			};
		}

		if (actualManagerRolePoints < roleFound.points) {
			throw {
				code: 401,
				message: `You can't assign a manager with role ${roleFound.title}`,
			};
		}
	}
}

interface IPermissionsValidation {
	managerToUpdatePermissions: string[];
	actualManagerPermissions: string[];
	permissionsToUpdate: IPermissionDTO[];
}

interface IValidateRoleId {
	roleId: number;
	actualManagerRolePoints: number;
}

interface IPermissionDTO {
	code: string;
	toAdd: boolean;
	toRemove: boolean;
}

interface IDataToUpdate {
	permissions?: string[];
	roleId?: number;
}

export { UpdateOtherManagerService };

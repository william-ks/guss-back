import { Manager } from "../../Manager/model/Manager";

export class Role {
	public readonly id?: number;
	public title: string;
	public points: number;
	public managers?: Manager[];
	public roleDefaultPermission?: string[];
	public isDeleted?: boolean;

	constructor(props: Role) {
		Object.assign(this, props);

		if (!props.isDeleted) {
			this.isDeleted = false;
		}
	}
}

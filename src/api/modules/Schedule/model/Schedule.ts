import { nanoid } from "nanoid";

export class Schedule {
	public readonly id?: number;
	public readonly publicId: string;
	public name: string;
	public description?: string;

	public isDefault: boolean;
	// public isActive: boolean;
	public isDeleted: boolean;

	public createdAt: Date;
	public updatedAt: Date;

	constructor(props: Omit<Schedule, "publicId">, publicId?: string) {
		Object.assign(this, props);

		if (!publicId) {
			this.publicId = nanoid();
		} else {
			this.publicId = publicId;
		}

		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

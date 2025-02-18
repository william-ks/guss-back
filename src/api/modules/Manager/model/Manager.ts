import { nanoid } from "nanoid";
import { CourseClass } from "../../CourseClass/model/CourseClass";
import { Role } from "../../Role/model/Role";

export class Manager {
	public readonly id?: number;
	public readonly publicId: string;
	public photo?: string;
	public name: string;
	public email: string;
	public password: string;
	public cpf: string;
	public phone?: string;
	public birthday?: string;
	public address?: string;
	public roleId: number;
	public role?: Role;
	public courseClasses?: CourseClass[];
	public isDefaultPassword?: boolean;
	public permissions: string[];
	public isActive?: boolean;
	public isDeleted?: boolean;
	public primaryColor?: string;
	public grayColor?: string;
	public theme?: string;
	public createdAt?: Date;
	public updatedAt?: Date;

	constructor(props: Omit<Manager, "publicId">, publicId?: string) {
		Object.assign(this, props);

		if (!publicId) {
			this.publicId = nanoid();
		} else {
			this.publicId = publicId;
		}

		if (!props.courseClasses) {
			this.courseClasses = [];
		}

		if (!props.photo) {
			this.photo = process.env.DEFAULT_PROFILE_IMG;
		}

		if (!props.isDefaultPassword) {
			this.isDefaultPassword = true;
		}

		if (!props.isActive) {
			this.isActive = true;
		}

		if (!props.isDeleted) {
			this.isDeleted = false;
		}
	}
}

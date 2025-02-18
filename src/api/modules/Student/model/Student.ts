import { nanoid } from "nanoid";
import { CourseClass } from "../../CourseClass/model/CourseClass";

export class Student {
	public readonly id?: number;
	public readonly publicId: string;
	public name: string;
	public email: string;
	public password: string;
	public photo?: string;
	public phone?: string;
	public cpf?: string;
	public address?: string;
	public birthday?: string;
	public description?: string;
	public courseClass?: CourseClass[];
	public isActive?: boolean;
	public isDeleted?: boolean;
	public primaryColor?: string;
	public grayColor?: string;
	public theme?: string;
	public createdAt?: Date;
	public updatedAt?: Date;

	constructor(props: Omit<Student, "publicId">, publicId?: string) {
		Object.assign(this, props);

		if (!publicId) {
			this.publicId = nanoid();
		} else {
			this.publicId = publicId;
		}

		if (!props.photo) {
			this.photo = process.env.DEFAULT_PROFILE_IMG;
		}

		if (!props.isActive) {
			this.isActive = true;
		}

		if (!props.isDeleted) {
			this.isDeleted = false;
		}
	}
}

import { nanoid } from "nanoid";
import { Student } from "../../Student/model/Student";
import { Manager } from "../../Manager/model/Manager";

export class Classroom {
	public readonly id?: number;
	public readonly publicId: string;
	public name: string;
	public students?: Student[];
	public teacher?: Manager;
	public teacherId: number;
	public classSchedule?: string;

	public isActive: boolean;
	public isDeleted: boolean;
	public createdAt: Date;
	public updatedAt: Date;

	constructor(props: Omit<Classroom, "publicId">, publicId?: string) {
		Object.assign(this, props);

		if (!publicId) {
			this.publicId = nanoid();
		} else {
			this.publicId = publicId;
		}
	}
}

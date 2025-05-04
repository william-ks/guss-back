import { Schedule } from "../../Schedule/model/Schedule";

export class Lesson {
	public readonly id?: number;
	public name: string;
	public description?: string;
	public order?: number;

	public startAt?: Date;
	public endAt?: Date;

	public level: string;

	public schedule?: Schedule;
	public scheduleId: number;

	// public isActive: boolean;
	public isDeleted: boolean;

	public createdAt: Date;
	public updatedAt: Date;

	constructor(props: Omit<Lesson, "id">) {
		Object.assign(this, props);
	}
}

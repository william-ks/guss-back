export class Permission {
	public id: number;
	public name: string;
	public code: string;
	public tags: string[];

	constructor(props: Permission) {
		Object.assign(this, props);
	}
}

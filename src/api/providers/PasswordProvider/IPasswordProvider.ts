export interface IPasswordProvider {
	hash(password: string): Promise<string>;
	validate(password: string, hash: string): Promise<boolean>;
	generatePass(length?: number): string;
}

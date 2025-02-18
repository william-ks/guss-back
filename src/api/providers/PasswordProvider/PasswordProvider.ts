import bcrypt from "bcrypt";
import { IPasswordProvider } from "./IPasswordProvider";

export class PasswordProvider implements IPasswordProvider {
	private saltRounds: number;

	constructor(saltRounds: number = 10) {
		this.saltRounds = saltRounds;
	}

	async hash(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, this.saltRounds);
		return hashedPassword;
	}

	async validate(password: string, hash: string): Promise<boolean> {
		const isValid = await bcrypt.compare(password, hash);
		return isValid;
	}

	generatePass(length?: number): string {
		const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
		const symbols = "!@#$%^&*;:";
		const numbers = "0123456789";
		const minLength = 8;
		const maxLength = 25;

		let defaultLength = length;

		if (!length || length < minLength || length > maxLength) {
			defaultLength = Math.floor(Math.random() * (50 - 8 + 1)) + 8;
		}

		let password = "";

		password +=
			uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];

		password +=
			lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];

		password += symbols[Math.floor(Math.random() * symbols.length)];

		password += numbers[Math.floor(Math.random() * numbers.length)];

		const allChars = uppercaseChars + lowercaseChars + symbols + numbers;

		for (let i = 0; i < defaultLength - 4; i++) {
			password += allChars[Math.floor(Math.random() * allChars.length)];
		}

		// Embaralha a senha
		password = password
			.split("")
			.sort(() => Math.random() - 0.5)
			.join("");

		return password;
	}
}

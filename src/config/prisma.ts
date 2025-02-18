import { PrismaClient } from "@prisma/client";

class PrismaManager {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async testConnection() {
		try {
			await this.prisma.$connect();
			this.log(
				"✅ Conexão com o banco de dados estabelecida com sucesso.",
			);
		} catch (error) {
			this.error("❌ Erro ao conectar-se ao banco de dados:", error);
			process.exit(1); // Encerra a aplicação caso a conexão falhe
		}
	}

	public async closeConnection() {
		try {
			await this.prisma.$disconnect();
			this.log("✅ Conexão com o banco de dados encerrada com sucesso.");
		} catch (error) {
			this.error(
				"❌ Erro ao encerrar a conexão com o banco de dados:",
				error,
			);
		}
	}

	public setupGracefulShutdown() {
		process.on("SIGINT", async () => {
			this.log("🛑 Aplicação encerrando (SIGINT)...");
			await this.closeConnection();
			process.exit(0);
		});

		process.on("SIGTERM", async () => {
			this.log("🛑 Aplicação encerrando (SIGTERM)...");
			await this.closeConnection();
			process.exit(0);
		});

		process.on("uncaughtException", async (error) => {
			this.error("❌ Erro não tratado:", error);
			await this.closeConnection();
			process.exit(1);
		});

		process.on("unhandledRejection", async (reason) => {
			this.error("❌ Rejeição não tratada:", reason);
			await this.closeConnection();
			process.exit(1);
		});
	}

	private log(message: string) {
		if (
			process.env.NODE_ENV === "DEVELOPMENT" &&
			process.env.DEBUG === "TRUE"
		) {
			console.log(message);
		}
	}

	private error(message: string, error?: unknown) {
		if (
			process.env.NODE_ENV === "DEVELOPMENT" &&
			process.env.DEBUG === "TRUE"
		) {
			console.error(message, error);
		}
	}

	public getClient(): PrismaClient {
		return this.prisma;
	}
}

const prismaManager = new PrismaManager();
prismaManager.testConnection();
prismaManager.setupGracefulShutdown();

export const prisma = prismaManager.getClient();

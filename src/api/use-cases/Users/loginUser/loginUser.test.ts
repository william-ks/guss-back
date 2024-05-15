import { beforeAll, describe, expect, test } from "vitest";
import { MemoryOfficeRepository } from "../../../../../test/memory/MemoryOfficeRepository";
import { MemoryUserRepository } from "../../../../../test/memory/MemoryUserRepository";
import { Office } from "../../../entities/Office";
import { HandlePass } from "../../../providers/implementations/HandlePass";
import { HandleToken } from "../../../providers/implementations/handleToken";
import { LoginUserService } from "./loginUser.service";

describe("Login User Service", () => {
  const handlePass = new HandlePass();
  const handleToken = new HandleToken();
  const officeRepository = new MemoryOfficeRepository();
  const userRepository = new MemoryUserRepository();
  const loginUserService = new LoginUserService(
    userRepository,
    handlePass,
    handleToken,
  );

  const fakeUser = {
    name: "Aatrox",
    email: "aatrox@gmail.com",
    password: "9DPGRY60a@bJ",
  };

  beforeAll(() => {
    officeRepository.db.offices.push(
      new Office(
        {
          title: "Dev",
        },
        "1",
      ),
    );

    userRepository.db.users.push({
      id: "faae00bb-cda1-49b7-aee8-7dc59d5ab889",
      name: "Aatrox",
      email: "aatrox@gmail.com",
      officeId: "1",
      password: "$2b$10$MOnXGk0Ib9DAH0aE5tjQneU0dTYrwYdnrzMrvxrmcwmqDLSk0FQXC",
      is_active: true,
      started_at: new Date(),
    });
  });

  test("Correct User Login - OK", async () => {
    const data = await loginUserService.execute({
      email: fakeUser.email,
      password: fakeUser.password,
    });

    expect(data.user).toHaveProperty("name", fakeUser.name);
    expect(data).toHaveProperty("token");
  });

  test("Incorrect E-mail - NOT", async () => {
    try {
      await loginUserService.execute({
        email: fakeUser.email + "1",
        password: fakeUser.password,
      });
    } catch (error) {
      expect(error.code).toBe(404);
      expect(error.message).toBe("Usuário não encontrado.");
    }
  });

  test("Invalid Pass - NOT", async () => {
    try {
      await loginUserService.execute({
        email: fakeUser.email,
        password: fakeUser.password + ",",
      });
    } catch (error) {
      expect(error.code).toBe(400);
      expect(error.message).toBe("Usuário e/ou senha incorretos.");
    }
  });
});

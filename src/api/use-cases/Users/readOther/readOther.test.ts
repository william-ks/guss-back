import { beforeAll, describe, expect, test } from "vitest";
import { MemoryOfficeRepository } from "../../../../../test/memory/MemoryOfficeRepository";
import { MemoryUserRepository } from "../../../../../test/memory/MemoryUserRepository";
import { Office } from "../../../entities/Office";
import { ReadOtherService } from "./readOther.Service";

describe("Read another user", () => {
  const userRepository = new MemoryUserRepository();
  const officeRepository = new MemoryOfficeRepository();
  const readOtherService = new ReadOtherService(userRepository);

  const mainUser = {
    id: "faae00bb-cda1-49b7-aee8-7dc59d5ab889",
    name: "Aatrox",
    email: "aatrox@gmail.com",
    officeId: "1",
    password: "$2b$10$MOnXGk0Ib9DAH0aE5tjQneU0dTYrwYdnrzMrvxrmcwmqDLSk0FQXC",
    is_active: true,
    started_at: new Date(),
  };

  const userWanted = {
    id: "faae00bb-cda1",
    name: "Jynx",
    email: "jynx@gmail.com",
    officeId: "1",
    password: "$2b$10$MOnXGk0Ib9DAH0aE5tjQneU0dTYrwYdnrzMrvxrmcwmqDLSk0FQXC",
    is_active: true,
    started_at: new Date(),
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

    userRepository.db.users.push(mainUser);

    userRepository.db.users.push(userWanted);
  });

  test("Have Permission to read - OK", async () => {
    const user = await readOtherService.execute({
      userId: mainUser.id,
      wantedId: userWanted.id,
    });

    expect(user).toHaveProperty("name", userWanted.name);
  });

  test("Don't exist user - NOT", async () => {
    try {
      await readOtherService.execute({
        userId: mainUser.id,
        wantedId: "randomID",
      });
    } catch (e) {
      expect(e.code).toBe(404);
      expect(e.message).toBe("Usuário não encontrado.");
    }
  });
});

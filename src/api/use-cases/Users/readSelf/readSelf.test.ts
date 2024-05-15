import { ReadSelfService } from "./readSelf.service";
import { beforeAll, describe, expect, test } from "vitest";
import { Office } from "../../../entities/Office";
import { MemoryUserRepository } from "../../../../../test/memory/MemoryUserRepository";
import { MemoryOfficeRepository } from "../../../../../test/memory/MemoryOfficeRepository";
import { HandlePass } from "../../../providers/implementations/HandlePass";

describe("Read Self User", () => {
  const handlePass = new HandlePass();
  const officeRepository = new MemoryOfficeRepository();
  const userRepository = new MemoryUserRepository();
  const readSelfService = new ReadSelfService(userRepository);

  const fakeUser = {
    id: "faae00bb-cda1-49b7-aee8-7dc59d5ab889",
    name: "Aatrox",
    email: "aatrox@gmail.com",
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

    userRepository.db.users.push({
      ...fakeUser,
    });
  });

  test("Read all Data", async () => {
    const user = await readSelfService.execute({ id: fakeUser.id });

    expect(user).toHaveProperty("id");
  });
});

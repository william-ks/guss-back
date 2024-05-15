import { beforeEach, describe, expect, test } from "vitest";
import { HandlePass } from "../../../providers/implementations/HandlePass";
import { MemoryOfficeRepository } from "./../../../../../test/memory/MemoryOfficeRepository";
import { MemoryUserRepository } from "./../../../../../test/memory/MemoryUserRepository";
import { CreateUserService } from "./createUser.service";
import { Office } from "../../../entities/Office";

describe("Create User Service", () => {
  const handlePass = new HandlePass();
  const userRepository = new MemoryUserRepository();
  const officeRepository = new MemoryOfficeRepository();
  const createUserService = new CreateUserService(
    userRepository,
    handlePass,
    officeRepository,
  );

  officeRepository.db.offices.push(
    new Office(
      {
        title: "Dev",
      },
      "1",
    ),
  );

  // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
  let fakeUser: any = {
    name: "Aatrox",
    email: "aatrox@gmail.com",
    officeId: "1",
  };

  test("create user - OK", async () => {
    const pass = await createUserService.execute({ ...fakeUser });
    fakeUser.password = pass;
    expect(userRepository.db.users[0]).toHaveProperty("name", fakeUser.name);
    expect(userRepository.db.users[0]).toHaveProperty("password");
  });

  test("create repeated user - NOT", async () => {
    try {
      await createUserService.execute({ ...fakeUser });
    } catch (e) {
      expect(e.code).toBe(400);
    }
  });

  test("Create user with nonexistent officeId - NOT", async () => {
    try {
      await createUserService.execute({ ...fakeUser, officeId: "12390" });
    } catch (e) {
      expect(e.code).toBe(400);
    }
  });
});

import { describe, expect, test } from "vitest";

describe("Create Student Test", () => {
  const student = {
    photo:
      "https://i.pinimg.com/736x/d0/18/8d/d0188d1799fc36f3ee3b9607e0f502f5.jpg", //?
    name: "John doe",
    email: "johnDoe@gmail.com",
    celphone: "+5531988776655",
    cpf: "99988877766", //?
    address: "Rua joaquim ferreira, n° 35, petropolis, 32673026", //?
    birthday: "22/10/2015", //?
    class_time: "Segunda a Sexta", //?
  };

  test("Invalid birthDay - 400", async () => {
    try {
      
    } catch (e) {
      expect(e).toBe(200);
    }
  });

  test("All Correct Data - 200", async () => {
    expect(200).toBe(200);
  });

  test("Repeted Email - 400", async () => {
    expect(200).toBe(200);
  });

  test("Missing Data", async () => {
    expect(200).toBe(200);
  });
});

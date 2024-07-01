import { randomUUID } from "crypto";

export class Student {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public celphone?: string;
  public cpf?: string;
  public birthDate?: string;
  public class_time?: string;

  constructor(props: Omit<Student, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    } else {
      this.id = id;
    }
  }
}

import { idGenerator } from "../composables/idGenerator";

export class Student {
  public readonly id?: number;
  public readonly public_id: string;
  public name: string;
  public email: string;
  public password: string;
  public celphone?: string;
  public cpf?: string;
  public birthday?: string;
  public class_time?: string;

  constructor(props: Omit<Student, "public_id">, public_id?: string) {
    Object.assign(this, props);

    if (!public_id) {
      this.public_id = idGenerator();
    } else {
      this.public_id = public_id;
    }
  }
}

import { idGenerator } from "../../../composables/idGenerator";

export class Student {
  public readonly id?: number;
  public readonly publicId: string;
  public name: string;
  public email: string;
  public password: string;
  public phone?: string;
  public cpf?: string;
  public birthday?: string;
  public class_time?: string;

  constructor(props: Omit<Student, "publicId">, publicId?: string) {
    Object.assign(this, props);

    if (!publicId) {
      this.publicId = idGenerator();
    } else {
      this.publicId = publicId;
    }
  }
}

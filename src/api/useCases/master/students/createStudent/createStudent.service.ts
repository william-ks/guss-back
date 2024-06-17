import { schemaValidate } from "../../../functions/schemaValidate";
import { IHandlePass } from "../../../providers/IHandlePass";
import { IStudentRepository } from "../../../repositories/IStudentRepository";
import { ICreateStudentDTO } from "./createStudent.DTO";
import { createStudentSchema } from "./createStudent.schema";

export class CreateStudentService {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly handlePass: IHandlePass,
  ) {}

  async execute(props: ICreateStudentDTO) {
    await schemaValidate(props, createStudentSchema);

    const studentAlreadyExists = await this.studentRepository.find({
      key: "email",
      value: props.email,
    });

    if (studentAlreadyExists) {
      throw {
        code: 400,
        message: "Este e-mail já existe no nosso banco de dados.",
      };
    }

    const password = this.handlePass.generatePass(7);

    await this.studentRepository.create({ ...props, password });
  }
}

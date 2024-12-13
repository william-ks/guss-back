import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { idGenerator } from "../../../../composables/idGenerator";
import { IHandlePass } from "../../../../providers/passwords/IHandlePass";
import { IStudentRepo } from "../../../../repositories/student/IStudentRepo";
import { ICreateStudentDTO } from "./createStudent.DTO";
import { createStudentSchema } from "./createStudent.schema";

export class CreateStudentService {
  constructor(
    private readonly studentRepository: IStudentRepo,
    private readonly handlePass: IHandlePass,
  ) {}

  async execute(props: ICreateStudentDTO) {
    await schemaValidate(props, createStudentSchema);

    const studentAlreadyExists = await this.studentRepository.find_by({
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

    const publicId = idGenerator();

    await this.studentRepository.create({ ...props, password, publicId });

    return password;
  }
}

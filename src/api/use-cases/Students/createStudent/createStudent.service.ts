import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateStudentDTO } from "./createStudent.DTO";

export class CreateStudentService {
  constructor(private readonly userRepository: IUserRepository, private readonly studentRepository: IStudentRepository) {}

  async handle(props: ICreateStudentDTO) {}
}

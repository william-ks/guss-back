import { Request, Response } from "express";
import { CreateStudentService } from "./createStudent.service";

export class CreateStudentController {
  constructor(private readonly service: CreateStudentService) {}

  async handle(req: Request, res: Response) {
    const { photo, name, email, celphone, cpf, address, birthday, class_time } =
      req.body;

    const password = await this.service.execute({
      photo,
      name,
      email,
      celphone,
      cpf,
      address,
      birthday,
      class_time,
    });

    return res.status(201).json(password);
    // return res.status(201).end();
  }
}

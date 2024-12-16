import { Request, Response } from "express";
import { UploadPhotoService } from "./uploadPhoto.service";

export class UploadPhotoController {
  constructor(private readonly service: UploadPhotoService) {}

  async handle(req: Request, res: Response) {
    const file = req.file;
    const student = req.student;
    const manager = req.manager;

    if (student) {
      const imageLink = await this.service.execute({
        user: {
          publicId: student.publicId,
          type: "student",
        },
        file,
      });
      return res.status(201).json({ link: imageLink });
    }

    if (manager) {
      const imageLink = await this.service.execute({
        user: {
          publicId: manager.publicId,
          type: "manager",
        },
        file,
      });
      return res.status(201).json({ link: imageLink });
    }
  }
}

import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { CreateClassroomService } from "./createClassroom.service";
import { TCreateClassroomBody } from "./entities/createClassroom.schema";

class CreateClassroomController {
    constructor(private service: CreateClassroomService) {}

    async handle(req: FQ<{Body: TCreateClassroomBody}>, reply: FY) {}
}

export { CreateClassroomController };

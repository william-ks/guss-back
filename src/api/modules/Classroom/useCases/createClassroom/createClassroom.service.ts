import { ICreateClassroomDTO } from "./entities/createClassroom.DTO";
import { IClassroomRepository } from "../../repository/IClassroomRepository";

class CreateClassroomService {
    constructor(private classroomRepository: IClassroomRepository){}

    async execute (props: ICreateClassroomDTO) {
    };
}

export { CreateClassroomService };
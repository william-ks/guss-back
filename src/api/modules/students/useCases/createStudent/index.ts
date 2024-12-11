import { HandlePass } from "../../../../providers/passwords/implementations/HandlePass";
import { StudentRepo } from "../../repository/implementation/StudentRepo";
import { CreateStudentController } from "./createStudent.controller";
import { CreateStudentService } from "./createStudent.service";

const studentRepository = new StudentRepo();
const handlePass = new HandlePass();
const createStudentService = new CreateStudentService(
  studentRepository,
  handlePass,
);
const createStudentController = new CreateStudentController(
  createStudentService,
);

export { createStudentController };

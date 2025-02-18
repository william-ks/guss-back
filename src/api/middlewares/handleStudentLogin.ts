import { FastifyRequest as FQ, FastifyReply as FR } from "fastify";
import { StudentRepository } from "../modules/Student/repository/StudentRepository";

const handleStudentLogin = async (req: FQ, reply: FR) => {
	const { publicId } = req.user;

	const studentRepository = new StudentRepository();

	const student = await studentRepository.findUniqueBy({
		key: "publicId",
		value: publicId,
	});

	if (!student) {
		throw {
			code: 403,
			message: "Please log in to continue.",
		};
	}

	if (!student.isActive) {
		throw {
			code: 403,
			message:
				"Your account is inactive. Please contact your administrator",
		};
	}

	req.student = student;
};

export { handleStudentLogin };

import { Manager } from "../../../../Manager/model/Manager";
import { Student } from "../../../../Student/model/Student";
import { TUpdateColorsBody } from "./updateColors.schema";

export interface IUpdateColorsDTO extends TUpdateColorsBody {
	manager?: Manager;
	student?: Student;
}

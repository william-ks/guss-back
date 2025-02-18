import { Manager } from "../../../model/Manager";
import { TUpdateOtherManagerBody } from "./updateOtherManager.schema";

export interface IUpdateOtherManagerDTO extends TUpdateOtherManagerBody {
	idToUpdate: string;
	actualManager: Manager;
}

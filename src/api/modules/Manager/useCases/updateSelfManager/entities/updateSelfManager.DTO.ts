import { Manager } from "../../../model/Manager";
import { TUpdateSelfManagerBody } from "./updateSelfManager.schema";

export interface IUpdateSelfManagerDTO extends TUpdateSelfManagerBody {
	manager: Partial<Manager>;
}

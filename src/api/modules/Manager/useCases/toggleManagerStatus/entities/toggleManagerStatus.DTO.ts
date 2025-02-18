import { TToggleManagerStatusBody } from "./toggleManagerStatus.schema";

export interface IToggleManagerStatusDTO extends TToggleManagerStatusBody {
	idToUpdate: string;
	actualId: number;
}

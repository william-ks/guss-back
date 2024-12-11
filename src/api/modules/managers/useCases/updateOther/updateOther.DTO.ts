import { Manager } from "../../../../entities/Manager";
import { IUpdateSelfManagerDTO } from "../updateSelf/updateSelfManager.DTO";

export interface IUpdateOtherDTO extends Partial<IUpdateSelfManagerDTO> {
  managerPublicId: string;
  actualManager: Manager;
}

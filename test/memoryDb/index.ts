import { Feature } from "../../src/api/entities/Feature";
import { Office } from "../../src/api/entities/Office";
import { User } from "../../src/api/entities/User";

export interface IDB {
  users: User[];
  features: Feature[];
  offices: Office[];
}

const db: IDB = {
  users: [],
  features: [
    {
      id: "1",
      code: "read_another_user",
      title: "Ler outro usuário.",
    },
  ],
  offices: [],
};

export default db;

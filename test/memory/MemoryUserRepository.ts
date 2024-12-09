import { UserFeature } from "./../../src/api/entities/userFeature";
import { User } from "../../src/api/entities/User";
import {
  IFindBy,
  ISaveUser,
  IUserRepository,
} from "./../../src/api/repositories/IUserRepository";
import db, { IDB } from "../memoryDb/index";

export class MemoryUserRepository implements IUserRepository {
  public db: IDB;

  constructor() {
    this.db = db;
  }

  async findBy({ key, value }: IFindBy): Promise<User | null> {
    let userFound = this.db.users.find((el) => {
      return el[key] === value;
    });

    const features = this.db.features;

    return userFound || null;
  }

  async save(data: ISaveUser): Promise<void> {
    const { name, email, roleId, password, UserFeatures } = data;

    this.db.users.push(
      new User({
        name,
        email,
        roleId,
        password,
        isActive: true,
        started_at: new Date(),
        UserFeatures,
      }),
    );
  }
}

import { User } from "../../src/api/entities/User";
import {
  IFindBy,
  ISaveUser,
  IUserRepository,
} from "./../../src/api/repositories/IUserRepository";

export class MemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async findBy({ key, value }: IFindBy): Promise<User | null> {
    const userFound = this.users.find((el) => {
      return el[key] === value;
    });

    return userFound || null;
  }

  async save(data: ISaveUser): Promise<void> {
    const { name, email, roleId, password } = data;

    this.users.push(
      new User({
        name,
        email,
        roleId,
        password,
        isActive: true,
        started_at: new Date(),
        UserFeatures: [],
      }),
    );
  }
}

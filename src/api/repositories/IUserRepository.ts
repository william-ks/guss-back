import { UserFeature } from "./../entities/userFeature";
import { User } from "../entities/User";

export interface IFindBy {
  key: "email" | "id";
  value: string;
  full?: boolean;
}

export interface ISaveUser {
  name: string;
  email: string;
  officeId: string;
  password: string;
  UserFeatures?: {
    id: string;
  };
}

export interface IUserRepository {
  findBy({ key, value }: IFindBy): Promise<User | null>;
  // findAll(): Promise<User[]>;
  save(data: ISaveUser): Promise<void>;
  // changeActiveStatus(data: IChangeActiveStatus): Promise<void>;
}

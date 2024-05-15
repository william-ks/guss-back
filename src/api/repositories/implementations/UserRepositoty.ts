import { IFindBy, ISaveUser, IUserRepository } from "../IUserRepository";
import { prisma } from "../../../config/prisma";
import { User } from "../../entities/User";

export class UserRepository implements IUserRepository {
  async findBy({ key, value }: IFindBy): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        [key]: value,
      },
      include: {
        office: true,
        userFeatures: {
          include: {
            feature: true,
          },
        },
      },
    });

    return user;
  }

  async save(data: ISaveUser): Promise<void> {
    const { name, email, officeId, password } = data;

    await prisma.user.create({
      data: {
        name,
        email,
        password,
        officeId,
      },
    });
  }
}

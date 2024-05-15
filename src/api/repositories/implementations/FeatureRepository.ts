import { prisma } from "../../../config/prisma";
import { Feature } from "../../entities/Feature";
import { IFeatureRepository } from "../IFeatureRepository";

export class FeatureRepository implements IFeatureRepository {
  async find(id: string): Promise<Feature> {
    const found = await prisma.feature.findFirst({
      where: {
        id,
      },
    });

    return found;
  }
}

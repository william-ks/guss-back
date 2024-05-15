import { Feature } from "../entities/Feature";

export interface IFeatureRepository {
  find(id: string): Promise<Feature | undefined>;
}

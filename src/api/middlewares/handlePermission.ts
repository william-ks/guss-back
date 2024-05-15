import { NextFunction, Request, Response } from "express";

export const HandlePermission =
  (feature: string) => (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    const hasFeature = user.UserFeatures.find((el) => {
      return el.code === feature;
    });

    if (!hasFeature) {
      throw {
        code: 403,
        message: "Você não tem autorização para isso.",
      };
    }

    next();
  };

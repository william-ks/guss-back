import { NextFunction, Request, Response } from "express";

export const handlePermissions =
  (permissionRequired: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const managerPermissions = req.manager.permissions;

    try {
      const foundPermissionInManager = managerPermissions.find((el) => {
        return el.permission.code === permissionRequired;
      });

      if (!foundPermissionInManager) {
        throw {
          code: 401,
          message: "Not authorized.",
        };
      }

      next();
    } catch (e) {
      throw {
        code: 401,
        message: "Not authorized.",
      };
    }
  };

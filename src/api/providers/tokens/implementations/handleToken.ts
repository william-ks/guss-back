import jwt from "jsonwebtoken";
import { IHandleToken } from "../../tokens/IHandleToken";

export class HandleToken implements IHandleToken {
  createToken(id: string, to: "gestor" | "student"): string {
    if (to === "gestor") {
      const token = jwt.sign({}, process.env.JWT_PASS_GESTOR, {
        subject: id,
        expiresIn: "8h",
      });

      return token;
    } else {
      const token = jwt.sign({}, process.env.JWT_PASS_STUDENT, {
        subject: id,
        expiresIn: "8h",
      });

      return token;
    }
  }

  readToken(token: string, to: "gestor" | "student"): string {
    if (to === "gestor") {
      const { sub } = jwt.verify(token, process.env.JWT_PASS_GESTOR);

      return sub as string;
    } else {
      const { sub } = jwt.verify(token, process.env.JWT_PASS_STUDENT);

      return sub as string;
    }
  }
}

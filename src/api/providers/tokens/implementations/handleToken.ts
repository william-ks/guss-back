import jwt from "jsonwebtoken";
import { ICreateToken, IHandleToken } from "../../tokens/IHandleToken";

export class HandleToken implements IHandleToken {
  createToken(props: ICreateToken): string {
    const { publicId, to } = props;

    if (to === "manager") {
      const token = jwt.sign({}, process.env.JWT_PASS_MANAGER, {
        subject: publicId,
        expiresIn: "8h",
      });

      return token;
    } else {
      const token = jwt.sign({}, process.env.JWT_PASS_STUDENT, {
        subject: publicId,
        expiresIn: "8h",
      });

      return token;
    }
  }

  readToken(token: string, to: "manager" | "student"): string {
    if (to === "manager") {
      const { sub } = jwt.verify(token, process.env.JWT_PASS_MANAGER);

      return sub as string;
    } else {
      const { sub } = jwt.verify(token, process.env.JWT_PASS_STUDENT);

      return sub as string;
    }
  }
}

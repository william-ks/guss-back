import jwt from "jsonwebtoken";
import { IHandleToken } from "../IHandleToken";

export class HandleToken implements IHandleToken {
  createToken(id: string): string {
    const token = jwt.sign({}, process.env.JWT_PASS || "Password", {
      subject: id,
      expiresIn: "8h",
    });

    return token;
  }

  readToken(token: string): string {
    const { sub } = jwt.verify(token, process.env.JWT_PASS || "Password");

    return sub as string;
  }
}

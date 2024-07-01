import { customAlphabet } from "nanoid";

export const idGenerator = () => {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  const id = customAlphabet(alphabet, 20)();

  return id;
};

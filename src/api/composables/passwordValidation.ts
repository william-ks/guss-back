import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(8)
  .refine(
    (password) => {
      const hasUpperCase = /[A-Z]/.test(password);

      const hasLowerCase = /[a-z]/.test(password);

      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const hasNumber = /\d/.test(password);

      return hasUpperCase && hasLowerCase && hasSymbol && hasNumber;
    },
    {
      message:
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um símbolo e um número",
    },
  );

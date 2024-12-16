import { NextFunction, Request, Response } from "express";

const allowEitherMiddleware = (
  ...middlewares: Array<
    (req: Request, res: Response, next: NextFunction) => Promise<void> | void
  >
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let lastError: Error | null = null;

    for (const middleware of middlewares) {
      try {
        await middleware(req, res, () => {
          // Se o middleware chama `next()` sem erro, consideramos como autenticado
          return Promise.resolve();
        });
        // Se um middleware passar sem erro, encerra a verificação
        return next();
      } catch (err) {
        // Armazena o erro e continua para o próximo middleware
        lastError = err as Error;
      }
    }

    // Se nenhum middleware autenticar, propaga o último erro
    next(lastError || new Error("Unauthorized"));
  };
};

export { allowEitherMiddleware };

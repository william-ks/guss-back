import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { router } from "./api/routes";
import { handleErrors } from "./api/middlewares/handleErrors";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(router);
    this.express.use(handleErrors);
  }
}

const app = new App().express;

export { app };

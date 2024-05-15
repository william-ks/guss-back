import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import { handleErrors } from "./api/middlewares/handleErrors";
import { router } from "./api/routes";

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

require('dotenv').config();
import * as express from "express";
import { Application } from "express"
import Server from "./index";
import { logger } from '@/lib/logger'


const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT_SERVER ? parseInt(process.env.PORT_SERVER, 10) : 3000;

app
  .listen(PORT, "localhost", function () {
    logger.info(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      logger.error("Error: address already in use");
    } else {
      logger.error(err);
    }
  });


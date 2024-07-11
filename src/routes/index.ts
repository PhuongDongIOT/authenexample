import { Application } from "express";
import authRoutes from "./auth.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/auth", authRoutes);
  }
}

import { Express } from "express";

import { userApi } from "./user";
import { dashboardApi } from "./dashboard";

export function loadApi(app: Express) {
    app.use("/user", userApi);
    app.use("/dashboard", dashboardApi);
}

import { Router } from "express";

import { JobResponse } from "../../utility/ResponseTemplate";
import { authRequired } from "../middleware/loginChecker";

export const dashboardApi = Router();

dashboardApi.use(authRequired);

// Signup
dashboardApi.get("/", async (req, res, next) => {
    let r = new JobResponse();

    res.send(r.json());
});

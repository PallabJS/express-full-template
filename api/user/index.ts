import { Router } from "express";

import { userUtils } from "../../services/database/postgreSQL/models/User/Utility";

import { JobResponse } from "../../utility/ResponseTemplate";

import { encryptor } from "../../utility/Encrypt";
import { AppError } from "../../utility/AppError";
import { User } from "../../services/database/postgreSQL/models/User/Model";

export const userApi = Router();

// Signup
userApi.post("/signup", async (req, res, next) => {
    let r = new JobResponse();
    try {
        r = await userUtils.add(req.body);
        if (r.error) throw new AppError("Custom_Error", r.msg, 400);
    } catch (e: any) {
        r.formErrorResponse(e.type, e);
    }
    res.status(r.statusCode).send(r.json());
});

// Login using email and password
userApi.post("/login", async (req, res, next) => {
    let r = new JobResponse();
    try {
        let body = req.body;
        if (!body) throw new AppError("User_Input_Error");
        if (typeof body.email !== "string")
            throw new AppError("Custom_Error", "Email address is invalid", 400);
        if (typeof body.password !== "string")
            throw new AppError("Custom_Error", "Password is incorrect");

        r = await userUtils.getUser(body.email);
        if (r.data === null)
            throw new AppError("Custom_Error", "Email address is not registered", 400);

        r = encryptor.createJwt({ email: body.email, password: body.password }, 30);
    } catch (e: any) {
        r.formErrorResponse(e.type, e);
    }
    res.status(r.statusCode).send(r.json());
});

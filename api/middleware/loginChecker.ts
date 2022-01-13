import { NextFunction, Request, Response } from "express";
import { userUtils } from "../../services/database/postgreSQL/models/User/Utility";
import { AppError } from "../../utility/AppError";
import { encryptor } from "../../utility/Encrypt";
import { JobResponse } from "../../utility/ResponseTemplate";

export async function authRequired(req: Request, res: Response, next: NextFunction) {
    let r = new JobResponse();
    let token: any = req.headers.authorization;
    try {
        let r = encryptor.unwrapJwt(token);
        let data: any = r.data;

        // if jwt was decoded check for email
        if (r.data && (await userUtils.getUser(data.email))) {
            r.set("success", "", null, 200);
        }
        if (r.error && !r.msg) throw new AppError("Authorization_Error");
        if (r.error) throw new AppError("Custom_Error", r.msg, 401);
    } catch (e: any) {
        r.formErrorResponse(e.type, e);
    }

    // If there was any error during jwt check, return from here and DON'T go ahead
    if (r.error) res.status(r.statusCode).send(r.json());
    next();
}

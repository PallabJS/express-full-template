const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import { JobResponse } from "./ResponseTemplate";

import { secretKey } from "../config";
import { AppError } from "./AppError";

class Encrypt {
    /**
     *
     * @param {object|string|[]} payload payload data to be encrypted
     * @param {number} expiry token expiry time in minutes
     */
    createJwt(payload: object | string | [] | null, expiry: number = 30) {
        let res = new JobResponse();
        try {
            if (payload === null)
                throw new AppError("Custom_Error", "Not enough data to create login token", 400);
            let token = jwt.sign(payload, secretKey, {
                algorithm: "HS512",
                expiresIn: expiry * 60,
            });
            res.set("success", "User login token has been generated", token, 200);
        } catch (e: any) {
            res.formErrorResponse(e.type, e);
        }
        return res;
    }
    /**
     * Extracts the raw data from the token
     * @param token signed jwt token
     */
    unwrapJwt(token: string) {
        let res = new JobResponse();
        let decodedJwt = null;
        try {
            try {
                decodedJwt = jwt.verify(token, secretKey);
            } catch (e: any) {
                throw new AppError("Custom_Error", e.message, 401);
            }
            res.set("success", "", decodedJwt, 200);
        } catch (e: any) {
            res.formErrorResponse(e.type, e);
        }
        return res;
    }

    /**
     * Encrypts a string using bcrypt
     * @param text message to be encrypted
     */
    encrypt(text: string) {
        let res = new JobResponse();
        try {
            let encryptedText: any = bcrypt.hashSync(text, 10);
            res.set("success", "", encryptedText, 200);
        } catch (e: any) {
            res.formErrorResponse(e.type, e);
        }
        return res;
    }
}

const encryptor = new Encrypt();

export { encryptor, Encrypt };

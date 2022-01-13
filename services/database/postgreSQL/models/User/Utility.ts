import { BaseError } from "sequelize/dist/index.js";
import { encryptor } from "../../../../../utility/Encrypt";
import { JobResponse } from "../../../../../utility/ResponseTemplate";
import { getReadableSqlError } from "../../errorHandler";
import { User, UserInterface } from "./Model";

class UserUtils {
    constructor() {}

    /**
     * Signs up a new user
     */
    async add({ firstname, middlename, lastname, email, password }: UserInterface) {
        let res = new JobResponse();
        try {
            let newUser: any = null;
            res = encryptor.encrypt(password);
            newUser = await User.create({
                firstname,
                middlename,
                lastname,
                email,
                password: res.data,
            });
            res.set("success", "New user created successfully", null, 200);
        } catch (e: any) {
            if (e instanceof BaseError) {
                res.set("error", getReadableSqlError(e), null, 400);
            } else {
                res.formErrorResponse(e.type, e);
            }
        }
        return res;
    }

    /**
     * Returns a registered user if present otherwise returns null
     * @param email Registered email address
     */
    async getUser(email: string | any) {
        let res = new JobResponse();
        try {
            res.data = await User.findOne({ where: { email: email } });
        } catch (e: any) {
            res.formErrorResponse(e.type, e);
        }
        return res;
    }
}

const userUtils = new UserUtils();
export { UserUtils, userUtils };

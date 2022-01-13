export type ErrorType =
    | "Internal_Server_Error"
    | "Database_Error"
    | "User_Input_Error"
    | "Page_Not_Found_Error"
    | "Authorization_Error"
    | "Invalid_Token_Error"
    | "Token_Creation_Error"
    | "Email_Already_Exists_Error"
    | "Custom_Error";

export type ErrorDisplayTypes = "error" | "text";

export class AppError extends Error {
    type: ErrorType;

    code: number;
    static showErrorAs: ErrorDisplayTypes = "error";
    static statusTexts = {
        Internal_Server_Error: {
            code: 500,
            error: "Internal server error",
            text: "There was an issue handling your request, please try again",
        },
        Database_Error: {
            code: 500,
            error: "Database error",
            text: "There was an issue with database interation",
        },
        User_Input_Error: {
            code: 400,
            error: "User input error",
            text: "One of the inputs you have entered is invalid",
        },
        Page_Not_Found_Error: {
            code: 404,
            error: "Page not found Error",
            text: "the page you were looking for does not exist",
        },
        Authorization_Error: {
            code: 401,
            error: "Authorization error",
            text: "You are not authorized to use this service",
        },
        Invalid_Token_Error: {
            code: 401,
            error: "Invalid token error",
            text: "Your token is either invalid or expired, please login again",
        },
        Token_Creation_Error: {
            code: 500,
            error: "Token creating failed",
            text: "We could not create a login token for the requesting user, please try again",
        },
        Email_Already_Exists_Error: {
            code: 400,
            error: "Email already registered",
            text: "Signup process stopped as this email has already been used for another account",
        },
        Custom_Error: {
            code: 400,
            error: "",
            text: "",
        },
    };

    constructor(type: ErrorType, message: string = "", code?: number) {
        super(message);
        this.type = type;
        this.message = message || AppError.statusTexts[type][AppError.showErrorAs];
        this.code = code || AppError.statusTexts[type].code;
    }
}

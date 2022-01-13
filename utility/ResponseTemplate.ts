import { AppError, ErrorType, ErrorDisplayTypes } from "./AppError";

type Status = "success" | "error";

export class JobResponse {
    success: boolean = false;
    error: boolean = false;
    msg: string | undefined = undefined;
    data: object[] | object | null = null;
    statusCode: number = 200;

    /**
     * Sets the response status of the current operation
     */
    set(
        status: Status,
        msg: string = "",
        data: object[] | object | null = null,
        statusCode?: number
    ) {
        status === "success" ? (this.success = true) : (this.success = false);
        this.error = !this.success;

        this.msg = msg;
        this.data = data;
        this.statusCode = statusCode || 200;
    }

    json() {
        let plainObject = { ...this, statusCode: undefined };
        return plainObject;
    }

    /**
     * Forms error response: ErrorType based on the type errorType parameter
     * @param errorType
     * @param e
     */
    formErrorResponse(errorType: ErrorType, e: AppError | any) {
        // If the errorType is not passed create a default error of type Internal Server Error
        if (!errorType) {
            let errorDisplayType: string =
                AppError.statusTexts.Internal_Server_Error[AppError.showErrorAs];
            this.set("error", errorDisplayType, null, 500);
        } else {
            this.set("error", e.message, null, e.code);
        }
    }
}

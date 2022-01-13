import { BaseError } from "sequelize/dist";

const violations = {
    notNull: "notNull Violation",
    notUnique: "unique violation",
};

export function getReadableSqlError(e: BaseError) {
    const errorObj: any = { ...e };
    let error = errorObj.errors[0];
    switch (error.type) {
        case violations.notNull:
            return `${error.path} was not provided`;
        case violations.notUnique:
            return `This ${error.path} has already been used`;
        default:
            return error.message;
    }
}

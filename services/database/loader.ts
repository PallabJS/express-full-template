import { syncDatabase } from "./postgreSQL/Loader";

// Types
type DbType = "mongo" | "postgre";

type DbTypes = {
    type: DbType | null;
    all?: DbType[] | null;
};

interface Status {
    loaded: DbType[];
    failed: DbType[];
}

export function loadDatabase({ type, all = null }: DbTypes) {
    let status: Status = { loaded: [], failed: [] };

    if (type === "postgre") {
        syncDatabase();
        status.loaded.push("postgre");
    }
    if (type === "mongo") {
        console.log("load mongo");
    }
    return status;
}

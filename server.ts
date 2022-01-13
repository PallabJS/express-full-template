import { runApp } from "./app";
import { loadDatabase } from "./services/database/loader";

function StartServer() {
    // All pre-initialization must happen below
    let res = loadDatabase({ type: "postgre" });

    // Spin up the Express server
    runApp();
}

StartServer();

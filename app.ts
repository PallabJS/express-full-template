// Modules imports
import express from "express";
import { loadApi } from "./api/loader";

// App imports
import { expressOptions } from "./config";

// App instantiation
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export function runApp() {
    loadApi(app);

    app.listen(expressOptions, () => {
        console.log("Express Server is running at port: ", expressOptions.port);
    });
}

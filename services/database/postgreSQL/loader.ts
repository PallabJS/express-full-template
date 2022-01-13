import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("test", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
    logging: false,
});

import { User } from "./models/User/Model";

/**
 * Run this function to synchronize database tables
 */
function syncDatabase() {
    User.sync({ alter: true, logging: false });
}

export { syncDatabase };

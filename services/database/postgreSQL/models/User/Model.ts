import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../loader";

export interface UserInterface {
    firstname: string;
    middlename: string;
    lastname: string;
    password: string;
    email: string;
}

export class User extends Model {}
User.init(
    {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middlename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    { sequelize: sequelize, timestamps: false }
);

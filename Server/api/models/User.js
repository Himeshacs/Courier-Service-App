import { DataTypes } from "sequelize"
import { sequelize } from "../db/database.js"
import Shipment from "./Shipment.js"

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 8
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default.png"
    }
})

User.hasMany(Shipment, {
    foreignKey: {
        allowNull: false,
        name: "author"
    }
})



export default User
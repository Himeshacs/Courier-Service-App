

import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Shipment = sequelize.define('Shipment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    senderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senderAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    recipientName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipientAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.TEXT, 
        defaultValue: 'pending',
        allowNull: false,
    }

});



export default Shipment;

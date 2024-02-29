import express from "express";
import { createShipment, deleteShipmentById, getShipmentById, getShipments, updateShipmentById,trackShipmentStatus } from "../controllers/shipment.controllers.js";
import { validateSchema, verifyToken } from "../middlewares/auth.middlewares.js";
import { shipmentSchema } from "../validations/shipment.validations.js";

const router = express.Router();

router.get('/', getShipments);
router.get('/:id', getShipmentById);
router.post('/', [verifyToken, validateSchema(shipmentSchema)], createShipment);
router.delete('/:id', [verifyToken], deleteShipmentById);
router.put('/:id', [verifyToken], updateShipmentById);
router.get('/:id/status', trackShipmentStatus);

export default router;

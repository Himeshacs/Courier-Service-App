import Shipment from "../models/Shipment.js";
import User from "../models/User.js";
import { uuidSchema } from "../validations/shipment.validations.js"


export const getShipments = async (req, res) => {
    const shipment = await Shipment.findAll({ raw: true })
    const DTO = await Promise.all(shipment.map(async item => {
        const user = await User.findByPk(item.author)
        return { id: item.id, senderName: item.senderName, recipientName: item.recipientName, senderAddress: item.senderAddress,recipientAddress:item.recipientAddress,details:item.details,status:item.status, createdAt: item.createdAt, updatedAt: item.updatedAt, author: user.username, authorId: user.id }
    }))
    return res.json(DTO)
}

export const getShipmentById = async (req, res) => {
    const { id } = req.params
    try {
        await uuidSchema.validate(id)
        const shipment = await Shipment.findByPk(id)
        if (shipment) {
            const user = await User.findByPk(shipment.author)

          
            return res.json({ id: shipment.id, senderName: shipment.senderName, recipientName: shipment.recipientName, senderAddress: shipment.senderAddress,recipientAddress:shipment.recipientAddress,details:shipment.details, status:shipment.status, createdAt: shipment.createdAt, updatedAt: shipment.updatedAt, author: user.username, authorId: user.id })
        }
        return res.status(404).json({ error: "Shipment does not exists" })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const createShipment = async (req, res) => {
    const { senderName, senderAddress, recipientName ,recipientAddress,details ,status} = req.body
    const user = req.user
   

    const newShipment = await Shipment.create({ senderName, senderAddress, recipientName,recipientAddress,details,status, author:user.id})

    if (newShipment) {
        return res.status(201).json(newShipment)
    }
    return res.status(500).json({ error: "Server error" })
}

export const deleteShipmentById = async (req, res) => {
    const { id } = req.params

    try {
        await uuidSchema.validate(id)
        const user = await User.findByPk(req.user.id)
        const shipment = await Shipment.findByPk(id)

        if (shipment) {
            if (user.id === shipment.author) {
                await Shipment.destroy({ where: { id } })
                return res.send({ message: "Shipment deleted" })
            }
            return res.status(403).json({ error: "You can only delete your shipments" })
        } else {
            return res.status(404).json({ error: "Shipment does not exist" })
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const updateShipmentById = async (req, res) => {
    const { id } = req.params
    const { senderName, senderAddress, recipientName, recipientAddress, details, status } = req.body

    try {
        await uuidSchema.validate(id)
        const shipment = await Shipment.findByPk(id)
        if (shipment) {
            await Shipment.update({ senderName, senderAddress, recipientName, recipientAddress, details, status }, { where: { id } })
            return res.status(200).json({ message: "Shipment updated" })
        }
        return res.status(404).json({ error: "Shipment does not exist" })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


export const trackShipmentStatus = async (req, res) => {
    const { id } = req.params;
    
    try {
        await uuidSchema.validate(id);

        const shipment = await Shipment.findByPk(id);

        if (shipment) {
            return res.status(200).json({ status: shipment.status }); 
        } else {
            return res.status(404).json({ error: "Shipment not found" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


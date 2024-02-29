import axios, { AxiosError } from "axios"
import { ShipmentInterface, UserInterface } from "./interfaces"


axios.defaults.baseURL = "http://localhost:8080/"

/* Auth */
export const register = async (username: string, password: string, email: string) => {
    return await axios.post<Response>("/auth/register", { username, password, email })
}

export const login = async (username: string, password: string) => {
    try {
        return await axios.post<Response>("/auth/login", { username, password }, { withCredentials: true })
    } catch (error) {
        throw new Response("Bad username or password!", { status: 401 })
    }
}

export const checkJWT = async () => {
    return await axios.post<Response>("/auth/check", {}, { withCredentials: true })
}

export const logout = async () => {
    localStorage.removeItem("currentUser")
    return await axios.post<Response>("/auth/logout")
}

/* Profile pictures */
export const uploadPicture = async (f: FormData) => {
    return await axios.post("/users/profile", f, { withCredentials: true })
}

export const getPicture = async (id: any) => {
    return await axios.post<Response>(`/users/picture/${id}`)
}

/* User */
export const editUser = async (id: any, u: UserInterface) => {
    return await axios.put<Response>(`/users/${id}`, u, { withCredentials: true })
}

export const deleteUser = async (id: any) => {
    return await axios.delete<Response>(`/users/${id}`, { withCredentials: true })
}


/* Shipments */
export const getShipments = async () => {
    const response = await axios.get<Response>("/shipment")
    const data = response.data
    return data
}

export const createShipment = async (s: ShipmentInterface) => {
    const response = await axios.post<Response>("/shipment", { 
        senderName: s.senderName,
        senderAddress: s.senderAddress,
        recipientName: s.recipientName,
        recipientAddress: s.recipientAddress,
        details: s.details
        
    }, { withCredentials: true })
    const data = response.data
    return data
}

export const getShipmentByID = async (id: any) => {
    try {
        const response = await axios.get<Response>(`/shipment/${id}`)
        const data = response.data
        return data
    } catch (error) {
        const err = error as AxiosError
        if (err.response?.status === 400) {
            throw new Response("Bad Request", { status: 400 })
        }

        if (err.response?.status === 404) {
            throw new Response("Not Found", { status: 404 })
        }

        if (err.response?.statusText !== "OK") {
            throw new Error("Could not fetch shipment")
        }
    }
}
export const trackShipmentStatus = async (id: any) => {
    try {
        const response = await axios.get<Response>(`/shipment/${id}/status`)
        const data = response.data
        return data
    } catch (error) {
        const err = error as AxiosError
        if (err.response?.status === 400) {
            throw new Response("Bad Request", { status: 400 })
        }

        if (err.response?.status === 404) {
            throw new Response("Not Found", { status: 404 })
        }

        if (err.response?.statusText !== "OK") {
            throw new Error("Could not fetch shipment")
        }
    }
}
export const deleteShipmentById = async (id: any) => {
    return await axios.delete<Response>(`/shipment/${id}`, { withCredentials: true })
}

export const updateShipmentById = async (id: any, s: ShipmentInterface) => {
    return await axios.put<Response>(`/shipment/${id}`, { 
        senderName: s.senderName,
        senderAddress: s.senderAddress,
        recipientName: s.recipientName,
        recipientAddress: s.recipientAddress,
        details: s.details,
        status:s.status
    }, { withCredentials: true })
}



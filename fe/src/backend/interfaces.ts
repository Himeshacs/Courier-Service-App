import { Dispatch, SetStateAction } from "react"


export interface ShipmentInterface {
    id?: string;
    senderName: string;
    senderAddress: string;
    recipientName: string;
    recipientAddress: string;
    details: string;
    author?: string,
    status?:string;
    authorId?: string,
    createdAt?: Date;
    updatedAt?: Date;
   
}


export interface UserInterface {
    id?: string,
    username: string,
    email: string
}

export interface UserContextInterface {
    currentUser: UserInterface,
    setCurrentUser: Dispatch<SetStateAction<UserInterface>>
}

export interface SearchContextInterface {
    text: string,
    setText: Dispatch<SetStateAction<string>>,
}
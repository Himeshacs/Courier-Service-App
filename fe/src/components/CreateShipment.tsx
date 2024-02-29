import { Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createShipment } from '../backend/api'
import { UserContextInterface } from '../backend/interfaces'
import { AuthContext } from '../context/AuthProvider'
import Footer from './Footer'

export default function CreateShipment() {
    const { currentUser } = useContext(AuthContext) as UserContextInterface
    const navigate = useNavigate()
    const toast = useToast()

    const [recipientName, setRecipientName] = useState<string>("")
    const [senderName, setSenderName] = useState<string>("")
    const [senderAddress, setSenderAddress] = useState<string>("")
    const [recipientAddress, setRecipientAddress] = useState<string>("")
    const [details, setDetails] = useState<string>("")

    useEffect(() => {
        if (Object.entries(currentUser).length === 0) {
            navigate("/")
            return
        }
    }, [currentUser])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (senderName.length !== 0 && senderAddress.length !== 0 && recipientName.length !== 0 && recipientAddress.length !==0 && details.length !== 0 ) {
            await createShipment({ senderName, senderAddress, recipientName ,recipientAddress,details})
            toast({
                title: 'Success',
                description: "Shipment created",
                status: 'success',
                duration: 5000,
                isClosable: true,
                variant: "solid"
            })
            navigate("/")
        }
    }

    return (
        <div>
        <Flex minH={"100vh"} align={"center"} justify="center">
            <Flex w={"80%"} justify={"center"}   >
                <form onSubmit={handleSubmit}>
                    <Flex gap={6} boxShadow={"lg"} p={4} flexDir={"column"}>
                        <Heading textAlign={"center"}>Create Shipment 🚚</Heading>
                        <Flex gap={6} flexWrap="wrap">
                            <Flex flexBasis="100%" gap={36}>
                                <FormControl isRequired>
                                    <FormLabel>Sender's Name:</FormLabel>
                                    <Input onChange={(e) => setSenderName(e.target.value)} type="text" name="senderName" placeholder='Enter sender name' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Recipient's Name:</FormLabel>
                                    <Input onChange={(e) => setRecipientName(e.target.value)} type="text" name="recipientName" placeholder='Enter recipient name' />
                                </FormControl>
                            </Flex>
                            <Flex flexBasis="100%" gap={36}>
                                <FormControl isRequired>
                                    <FormLabel>Sender's Address:</FormLabel>
                                    <Input onChange={(e) => setSenderAddress(e.target.value)} type="text" name="senderAddress" placeholder='Enter sender address' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Recipient's Address:</FormLabel>
                                    <Input onChange={(e) => setRecipientAddress(e.target.value)} type="text" name="recipientAddress" placeholder='Enter recipient address' />
                                </FormControl>
                            </Flex>
                            <FormControl isRequired flexBasis="100%">
                                <FormLabel>Details:</FormLabel>
                                <Input onChange={(e) => setDetails(e.target.value)} type="text" name="details" placeholder='Enter details' />
                            </FormControl>
                        </Flex>
                        <Button type="submit" backgroundColor={'green'} color={'white'}>Save</Button>
                    </Flex>
                </form>
            </Flex>
        </Flex>
        <Footer />
    </div>
    
    )
}

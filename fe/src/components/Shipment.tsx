import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Stack, Text, Textarea, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import moment from 'moment'
import { useContext, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { FaPen, FaTrash } from 'react-icons/fa'
import ReactQuill from 'react-quill'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { deleteShipmentById, getShipmentByID, updateShipmentById } from '../backend/api'
import { ShipmentInterface, UserContextInterface } from '../backend/interfaces'
import { AuthContext } from '../context/AuthProvider'
import Footer from './Footer'

export default function Shipment() {
    const [shipment, setShipment] = useState<ShipmentInterface>(useLoaderData() as ShipmentInterface)

    const { currentUser } = useContext(AuthContext) as UserContextInterface

    const toast = useToast()
    const navigate = useNavigate()
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const [senderName, setSenderName] = useState<string>(shipment.senderName)
    const [senderAddress, setSenderAddress] = useState<string>(shipment.senderAddress)
    const [recipientName, setRecipientName] = useState<string>(shipment.recipientName)
    const [recipientAddress, setRecipientAddress] = useState<string>(shipment.recipientAddress)
    const [details, setDetails] = useState<string>(shipment.details)
    const [status, setStatus] = useState<any>(shipment.status)
    const [sort, setSort] = useState<boolean>(true)

    
    const handleDelete = async () => {
        await deleteShipmentById(shipment.id!).then(() => {
            toast({
                title: 'Success',
                description: "Shipment deleted",
                status: 'success',
                duration: 5000,
                isClosable: true,
                variant: "solid"
            })
            navigate("/")
        })
    }
    const handleUpdate = async () => {
        if (senderName.length !== 0 && senderAddress.length !== 0 && recipientName.length !== 0 && recipientAddress.length !==0 && details.length !== 0 && status.length !==0) {
            const response = await updateShipmentById(shipment.id, { senderName, senderAddress, recipientName,recipientAddress,details,status })

            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: "Shipment modified",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    variant: "solid"
                })
                handleRerender()
                onCloseEdit()
            }

        }
    }
    const handleRerender = async () => {
        const shipments = await getShipmentByID(shipment.id)
        setShipment(shipments as any as ShipmentInterface)
    }
   

    return (
        <>
        <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb='1rem'>Are you sure?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleDelete} colorScheme='blue' mr={3}>Yes</Button>
                    <Button onClick={onCloseDelete} variant='ghost'>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modify your shipment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Recipient Name</FormLabel>
                        <Input defaultValue={recipientName} onChange={(e) => setRecipientName(e.target.value)} name="recipientName" type="text" placeholder='Recipient name' />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Recipient Address</FormLabel>
                        <Input defaultValue={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} name="recipientAddress" type="text" placeholder='Recipient address' />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Sender Name</FormLabel>
                        <Input defaultValue={senderName} onChange={(e) => setSenderName(e.target.value)} name="senderName" type="text" placeholder='Sender name' />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Sender Address</FormLabel>
                        <Input defaultValue={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} name="senderAddress" type="text" placeholder='Sender address' />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Details</FormLabel>
                        <Input defaultValue={details} onChange={(e) => setDetails(e.target.value)} name="details" type="text" placeholder='Details' />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Status</FormLabel>
                        <Select defaultValue={status} onChange={(e) => setStatus(e.target.value)} name="status" placeholder="Select status">
                            <option value="pending">Pending</option>
                            <option value="in_transit">In Transit</option>
                            <option value="delivered">Delivered</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button name="submit" onClick={handleUpdate} colorScheme='blue' mr={3}>Modify</Button>
                    <Button onClick={onCloseEdit} variant='ghost'>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    
        <Flex flexDir={"column"} minH={"100vh"}>
            <Flex mt={2} mb={2} justify={"center"}>
                {shipment ?
                    <Card p={[1, 3]} w={["90%", "70%"]} boxShadow={"md"}>
                        <CardHeader>
                            <HStack align={"center"} direction={['row', 'row']}>
                                <Avatar src={`http://localhost:8080/users/picture/${shipment.authorId}`} size={"sm"} />
                                <Box>
                                    <Text fontWeight={"bold"}>{shipment.author}</Text>
                                    <Text>{moment(shipment.createdAt).fromNow()}</Text>
                                </Box>
                                <Spacer />
                                {(currentUser.username === shipment.author || currentUser.username === 'admin') &&
                                    <HStack gap={2}>
                                        <Tooltip label="Click to delete your shipment">
                                            <IconButton onClick={onOpenDelete} colorScheme={"red"} aria-label='delete shipment' icon={<FaTrash />} />
                                        </Tooltip>
                                        <Tooltip label="Click to edit your shipment">
                                            <IconButton onClick={onOpenEdit} colorScheme={"blue"} aria-label='edit shipment' icon={<FaPen />} />
                                        </Tooltip>
                                    </HStack>
                                }
                            </HStack>
                        </CardHeader>
                        <CardBody>
                            <Heading mb={4}>Recipient Name: {shipment.recipientName}</Heading>
                            <Text mb={2}>Recipient Address: {ReactHtmlParser(shipment.recipientAddress)}</Text>
                            <Text mb={2}>Sender Name: {ReactHtmlParser(shipment.senderName)}</Text>
                            <Text mb={2}>Sender Address: {ReactHtmlParser(shipment.senderAddress)}</Text>
                            <Text mb={2}>Details: {ReactHtmlParser(shipment.details)}</Text>
                            <Text>Status: {ReactHtmlParser(shipment.status)}</Text>
                        </CardBody>
                    </Card>
                    : null
                }
            </Flex>
        </Flex>
        <Footer />
    </>
    
    )
}

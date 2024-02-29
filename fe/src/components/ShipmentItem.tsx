import React, { useRef } from 'react';
import moment from "moment"
import { Link } from 'react-router-dom'
import { ShipmentInterface } from '../backend/interfaces'
import { Avatar, Box, Card, CardBody, CardFooter, Flex, CardHeader, Heading, Text, Stack, Button } from '@chakra-ui/react'

export default function ShipmentItem(p: ShipmentInterface) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const copyToClipboard = () => {
        if (textAreaRef.current) {
            textAreaRef.current.select();
            document.execCommand('copy');
        }
    };

    return (
        <>
        <Card p={[1, 3]} boxShadow={"md"} w={["80%", "70%"]} >
            <CardHeader>
                <Flex align="center">
                    <Avatar src={`http://localhost:8080/users/picture/${p.authorId}`} size={"sm"} />
                    <Box ml={2}>
                        <Text fontWeight={"bold"}>{p.author}</Text>
                        <Text>{moment(p.createdAt).fromNow()}</Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody>
                <Link to={`/shipment/${p.id}`}>
                    <Heading _hover={{ textDecor: "underline" }}>{p.senderName}</Heading>
                </Link>
                <Text color={'blue'}>{p.details}</Text>
            </CardBody>
            <CardFooter>
                <Stack spacing={2}>
                    <Flex align="center">
                        <Text fontWeight="bold" marginRight="2">Recipient Name:</Text>
                        <Text>{p.recipientName}</Text>
                    </Flex>
                    <Flex align="center">
                        <Text fontWeight="bold">Sender Address:</Text>
                        <Text>{p.senderAddress}</Text>
                    </Flex>
                    <Flex align="center">
                        <Text fontWeight="bold">Recipient Address:</Text>
                        <Text>{p.recipientAddress}</Text>
                    </Flex>
                    <Flex align="center">
                        <Text fontWeight="bold">Status:</Text>
                        <Text>{p.status}</Text>
                    </Flex>
                    <Flex align="center">
                        <Text fontWeight="bold" marginRight="2">Tracking Number:</Text>
                        <Text>{p.id}</Text>
                        <Button onClick={copyToClipboard} ml={1} backgroundColor={'lightgreen'}>Copy</Button>
                    </Flex>
                    <textarea ref={textAreaRef} style={{ position: 'absolute', left: '-9999px' }} readOnly value={p.id} />
                </Stack>
            </CardFooter>
        </Card>
        </>
    )
}

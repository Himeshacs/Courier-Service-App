import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../backend/api'
import Footer from './Footer'

export default function Register() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (username.length !== 0 && password.length !== 0 && email.length !== 0) {

            if (password.length < 8) {
                toast({
                    title: 'Error',
                    description: "Passwords minimum length 8",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    variant: "solid"
                })
                return;
            }

            if (password !== password2) {
                toast({
                    title: 'Error',
                    description: "Passwords are not equal",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    variant: "solid"
                })
                return;
            }

            try {
                await register(username, password, email)
                navigate("/")
                toast({
                    title: 'Success',
                    description: "Created a new account successfully",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    variant: "solid"
                })
            } catch (error) {
                toast({
                    title: 'Error',
                    description: "Username or email already exists",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    variant: "solid"
                })
            }
        }
    }

    return (
        <>
              <Flex minHeight={"100vh"} mt={2} justify={"center"} align={"center"}>
            
                <Flex p={5} boxShadow={"lg"} gap={5} flexDir={"column"}  w={["90%", "50%", "30%"]} align={"center"}>
                    {/* Add your image here */}
                    <img src='https://assets-v2.lottiefiles.com/a/da8d9286-116e-11ee-aeac-07c47fa5efd8/yRmxUgvzA6.gif' alt="Registration" style={{ width: '200px', marginBottom: '20px' }} />
                    <Heading size={"lg"} color={'green'}>Create account</Heading>
                    <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input onChange={(e) => setUsername(e.target.value)}   type="text" name="username" placeholder='Username' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password again</FormLabel>
                        <Input onChange={(e) => setPassword2(e.target.value)} type="password" name="password2" placeholder='Password again' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='Email' />
                    </FormControl>
                    <Button name="submit" type="submit" backgroundColor={"green"} color={"white"} _hover={{ bg: "darkgreen" }}>
                        Register
                    </Button>
                    </form>
                    <Text>
                        Already have an account? <Text _hover={{ textDecor: "underline" }}><Link to="/login">Click here</Link></Text>
                    </Text>
                </Flex>
            
        </Flex>
            <Footer />
        </>
    )
}

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../backend/api";
import { UserContextInterface, UserInterface } from "../backend/interfaces";
import { AuthContext } from "../context/AuthProvider";
import Footer from "./Footer";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(
    AuthContext
  ) as UserContextInterface;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(currentUser).length !== 0) {
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username?.length !== 0 && password?.length !== 0) {
      try {
        const { data } = await login(username, password);
        setCurrentUser(data as any as UserInterface);
        toast({
          title: "Success",
          description: "Logged in successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          variant: "solid",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Bad username or password",
          status: "error",
          duration: 5000,
          isClosable: true,
          variant: "solid",
        });
      }
    }
  };

  return (
    <>
      <Flex minHeight={"100vh"} mt={2} justify={"center"} align={"center"}>
        <Flex
          p={5}
          boxShadow={"lg"}
          gap={5}
          flexDir={"column"}
          w={["90%", "50%", "30%"]}
          align={"center"}
        >
          <img
            src="https://assets-v2.lottiefiles.com/a/da8d9286-116e-11ee-aeac-07c47fa5efd8/yRmxUgvzA6.gif"
            alt="Image"
            width="50%"
          />
          <Heading size={"lg"} color={"green"}>
            Log in
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                placeholder="Username"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Password"
              />
            </FormControl>
            <Flex justify={"center"} mt={4}>
              <Button
                type="submit"
                backgroundColor={"green"}
                color={"white"}
                _hover={{ bg: "darkgreen" }}
              >
                Login
              </Button>
            </Flex>
          </form>
          <Text>
            Don't have an account?{" "}
            <Text _hover={{ textDecor: "underline" }}>
              <Link to="/register" color={"green"}>
                Click here
              </Link>
            </Text>
          </Text>
        </Flex>
      </Flex>

      <Footer />
    </>
  );
}

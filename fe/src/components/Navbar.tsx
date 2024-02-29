import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { checkJWT, logout } from "../backend/api";
import {
  SearchContextInterface,
  UserContextInterface,
  UserInterface,
} from "../backend/interfaces";
import { AuthContext } from "../context/AuthProvider";
import { SearchContext } from "../context/SearchProvider";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { toggleColorMode, colorMode } = useColorMode();
  const { currentUser, setCurrentUser } = useContext(
    AuthContext
  ) as UserContextInterface;

  const [search, setSearch] = useState<string>("");

  const { setText } = useContext(SearchContext) as SearchContextInterface;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate("/");
      setText(search);
    }
  };

  const handleLogout = async () => {
    await logout().then(() => {
      setCurrentUser({} as UserInterface);
    });
  };

  useEffect(() => {
    if (Object.entries(currentUser).length !== 0) {
      setInterval(() => {
        checkJWT().catch(() => {
          logout().then(() => {
            window.location.reload();
          });
        });
      }, 4000);
    }
  }, [currentUser]);

  const isAdmin = currentUser.username === "admin";
  console.log("currentuser", currentUser.username);
  return (
    <>
      {isAdmin ? (
        // Admin navbar
        <Flex
          boxShadow={isOpen ? "" : "md"}
          p={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={"row"}
        >
          <HStack display={{ md: "none" }}>
            <IconButton
              icon={isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
          <HStack justify={{ base: "center", md: "left" }} gap={10} w={"100%"}>
            <Box ml={{ lg: "5%" }}>
              <Link to="/">
                <Text fontWeight={"medium"} fontSize={"2xl"}>
                  Admin
                </Text>
              </Link>
              
            </Box>
            <Link to="/">
                <Text fontWeight={"medium"} fontSize={"md"}>
                  Manage Shipments
                </Text>
              </Link>
              <Link to="/write">
                <Text fontWeight={"medium"} fontSize={"md"}>
                Create Shipment
                </Text>
              </Link>
             
            <InputGroup
              display={{ base: "none", md: "block" }}
              maxWidth={"25%"}
            >
              <InputRightElement children={<FaSearch />} />
              <Input
                onKeyDown={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
                variant={"filled"}
                type="text"
                placeholder="Search by Sender's Name "
              />
            </InputGroup>
          </HStack>
          {Object.entries(currentUser).length !== 0 ? (
            <HStack mr={{ lg: "5%" }}>
              <Box>
                <Menu>
                  <MenuButton
                    margin={0}
                    _hover={{ cursor: "pointer", opacity: "0.8" }}
                    as={Avatar}
                    src={`http://localhost:8080/users/picture/${currentUser.id}`}
                  />
                  <MenuList>
                    <MenuGroup title={currentUser.username}>
                      <MenuItem onClick={() => navigate("/profile")}>
                        My Account
                      </MenuItem>
                      
                      <MenuDivider />
                      <MenuItem onClick={() => handleLogout()}>
                        Log out
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Box>
            </HStack>
          ) : (
            <HStack mr={{ lg: "5%" }}>
              <Button
                display={{ base: "none", md: "block" }}
                onClick={() => navigate("/login")}
                colorScheme={"green"}
              >
                Log in
              </Button>
              <Button
                display={{ base: "none", md: "block" }}
                onClick={() => navigate("/register")}
                colorScheme={"green"}
                variant={"outline"}
              >
                Create account
              </Button>
            </HStack>
          )}
        
        </Flex>
      ) : (
        <Flex
          boxShadow={isOpen ? "" : "md"}
          p={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={"row"}
        >
          <HStack display={{ md: "none" }}>
            <IconButton
              icon={isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
          <HStack justify={{ base: "center", md: "left" }} gap={10} w={"100%"}>
            <Box ml={{ lg: "5%" }}>
              <Link to="/">
                <Text fontWeight={"medium"} color={'Red'} fontSize={"xl"}>
                ShipTrack Pro🌏
                </Text>
              </Link>
              
            </Box>
           
            <InputGroup
              display={{ base: "none", md: "block" }}
              maxWidth={"25%"}
            >
              <InputRightElement children={<FaSearch />} />
              <Input
                onKeyDown={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
                variant={"filled"}
                type="text"
                placeholder="Search by Sender's Name "
              />
            </InputGroup>
          </HStack>
          {Object.entries(currentUser).length !== 0 ? (
            <HStack mr={{ lg: "5%" }}>
              <Box>
                <Menu>
                  <MenuButton
                    margin={0}
                    _hover={{ cursor: "pointer", opacity: "0.8" }}
                    as={Avatar}
                    src={`http://localhost:8080/users/picture/${currentUser.id}`}
                  />
                  <MenuList>
                    <MenuGroup title={currentUser.username}>
                      <MenuItem onClick={() => navigate("/profile")}>
                        My Account
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/write")}>
                      Create Shipment
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/track")}>
                      Track Shipment
                      </MenuItem>
                     
                
                      <MenuDivider />
                      <MenuItem onClick={() => handleLogout()}>
                        Log out
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Box>
            </HStack>
          ) : (
            <HStack mr={{ lg: "5%" }}>
              <Button
                display={{ base: "none", md: "block" }}
                onClick={() => navigate("/login")}
                colorScheme={"green"}
              >
                Log in
              </Button>
              <Button
                display={{ base: "none", md: "block" }}
                onClick={() => navigate("/register")}
                colorScheme={"green"}
                variant={"outline"}
              >
                Create account
              </Button>
            </HStack>
          )}
     
        </Flex>
      )}
    </>
  );
}

import { Flex, Text, Heading } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  ShipmentInterface,
  SearchContextInterface,
} from "../backend/interfaces";
import { SearchContext } from "../context/SearchProvider";
import Footer from "./Footer";
import ShipmentItem from "./ShipmentItem";

export default function Dashboard() {
  const [shipments, setShipments] = useState<ShipmentInterface[]>(
    useLoaderData() as ShipmentInterface[]
  );
  const { text } = useContext(SearchContext) as SearchContextInterface;

  const filteredShipments =
    text.length !== 0
      ? shipments.filter((i) =>
          text.length !== 0 ? i.senderName.includes(text) : i
        )
      : shipments;

  return (
    <>
      <Flex
        minHeight={"100vh"}
        mt={4}
        justify={"center"}
        alignItems={"flex-start"}
      >
        {filteredShipments.length > 0 ? (
          <Flex gap={"2px"} w={["60%", "70%"]} ml={12} flexDir={"column"}>
            {filteredShipments.map((shipment, key) => (
              <ShipmentItem key={key} {...shipment} />
            ))}
          </Flex>
        ) : (
          <Flex
            gap={"2px"}
            w={["60%", "70%"]}
            ml={12}
            flexDir={"column"}
            alignItems="center"
          >
            <Text
              mt={40}
              justifyContent={"center"}
              alignContent={"center"}
              textAlign="justify"
            >
              <Heading as="h1" size="xl" mb={4}>
                Welcome To ShipTrack Pro
              </Heading>
              Welcome to ShipTrack Pro - Your Ultimate Courier Service
              Companion! ShipTrack Pro is your go-to platform for managing all
              your shipment needs with ease and efficiency. Designed exclusively
              for clients like you, ShipTrack Pro offers a seamless and
              intuitive experience for creating and tracking shipments. With
              ShipTrack Pro, you can say goodbye to the hassle of traditional
              courier services. Our user-friendly interface allows you to
              effortlessly create shipments by providing sender and recipient
              details, ensuring a smooth process from start to finish. Track
              your shipments in real-time, stay updated on their status, and
              enjoy peace of mind knowing your packages are on their way.
              ShipTrack Pro puts you in control, providing transparency and
              convenience at every step of the journey.
            </Text>
          </Flex>
        )}

        <Flex justify={"flex-end"} ml={0} mt={4} w={["50%", "40%"]}>
          <img
            src="https://assets-v2.lottiefiles.com/a/2f9685c0-1175-11ee-9057-e371ce163d07/Z4aAihl1Af.gif"
            alt="Description of the image"
          />
        </Flex>
      </Flex>

      <Footer />
    </>
  );
}

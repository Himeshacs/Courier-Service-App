import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import { trackShipmentStatus } from "../backend/api";
const ShipmentStatusPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<any>("");
  const [shipmentStatus, setShipmentStatus] = useState<any>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await trackShipmentStatus(trackingNumber);
      setShipmentStatus(data?.status);
    } catch (error) {
      console.error("Error tracking shipment:", error);
    }
  };

  return (
    <Flex minHeight={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <form onSubmit={handleSubmit}>
        <Flex direction={"column"} p={5} boxShadow={"lg"} w={"400px"}>
          <Text fontSize={"xl"} fontWeight={"bold"} mb={4}>
            Check Shipment Status
          </Text>
          <Image
            src="https://cdn.dribbble.com/users/980520/screenshots/2859415/monitoring.gif"
            alignItems={"center"}
          />

          <FormControl isRequired>
            <FormLabel>Enter Tracking Number</FormLabel>
            <Input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              type="text"
              name="trackingNumber"
              placeholder="Tracking Number"
            />
          </FormControl>
          <Button type="submit" mt={4} colorScheme="green">
            Submit
          </Button>
          {shipmentStatus && (
            <Text mt={4} fontWeight={"bold"}>
              Shipment Status: {shipmentStatus}
            </Text>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export default ShipmentStatusPage;

import React from 'react';
import Card from '../../layouts/Card';
import { Text, Button } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState } from 'react';

const RideCard = props => {
  const from = props.from;
  const to = props.to;
  const doj = props.doj;
  const price = props.price;
  const nop = props.nop;
  const rideID = props.rideID;
  const pid = props.pid;
  const uid = props.uid;
  const publisherDetail = props.publisher;
  const [msg, setMsg] = useState('Request Ride');

  const requestRide = async () => {
    try {
      const d = await axios.post(
        `https://muj-travel-buddy-backend-production.up.railway.app/users/${uid}/requests`,
        { publisher_id: pid, ride_id: rideID }
      );
      setMsg('Ride Requested');
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  return (
    <FadeInUp>
      <Card
        py="3rem"
        my="2rem"
        px="2rem"
        mx="4rem"
        width="90vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ sm: '200px' }}
        bg={"white"}
        position="relative"
      >
        <Grid templateColumns="repeat(7, 1fr)" gap={3}>
          <GridItem
            w="100%"
            bgColor={'orange.200'}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'3xl'}>
              {from}
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            bgColor={'orange.200'}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'3xl'}>
              {to}
            </Text>
          </GridItem>

          <GridItem w="100%" textAlign={'center'}>
            <Text fontWeight={'bold'}>Date of Journey:</Text>
            {doj}
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <Text fontSize={'2xl'}>{nop} Passengers</Text>
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <b>Price</b>
            <br />
            Rs. {price}
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <Text fontSize={'lg'}>
              <b>Ride by</b> <br />
              {`${publisherDetail.fname} ${publisherDetail.lname}`}
            </Text>
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <Button onClick={requestRide}>{msg}</Button>
          </GridItem>
        </Grid>
        <br />
        <br />
      </Card>
    </FadeInUp>
  );
};

export default RideCard;

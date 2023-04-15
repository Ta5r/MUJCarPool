import React from 'react';
import { Grid, Button, GridItem, Text } from '@chakra-ui/react';
import Card from '../../layouts/Card';
import ModalBox from '../../layouts/ModalBox';
import FadeInUp from '../../Animation/FadeInUp';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const MyRide = ({ from, to, nop, price, rideID, doj, UID }) => {
  var color = 'white';
  var statusColor = 'orange.200';

  const [reqs, setReqs] = useState([]);

  useEffect(async () => {
    try {
      let dat = await axios.get(
        `http://localhost:8000/ride/request/show/${rideID}`
      );
      console.log('==================================');
      console.log(dat.data);
      setReqs(dat.data);
      console.log('==================================');
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);
  // console.log('11111111111111111111111111111111111111111');
  // console.log(reqs);
  // console.log('11111111111111111111111111111111111111111');

  const checkPassengers = async () => {};

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
        bg={color}
        position="relative"
      >
        <Grid templateColumns="repeat(6, 1fr)" gap={3}>
          <GridItem
            w="100%"
            bgColor={statusColor}
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
            bgColor={statusColor}
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
          <GridItem w="100%">
            <Button>Details</Button>
            <ModalBox rideID={rideID} UID={UID} />
            {reqs.map(response => (
              <Text>{response.RequestName}</Text>
            ))}
          </GridItem>
        </Grid>
        <br />
        <br />
      </Card>
    </FadeInUp>
  );
};

export default MyRide;

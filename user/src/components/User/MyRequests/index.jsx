import React from 'react';
import Card from '../../layouts/Card';
import { Link, Text, Button } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import ModalBox from '../../layouts/ModalBox';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RideCard = props => {
  const requesteeID = props.requesteeID;
  const rideID = props.rideID;
  const pid = props.pid;
  const uid = props.uid;
  const requestStatus = props.requestStatus;
  const [msg, setMsg] = useState('Button');
  const [rideDetails, setRideDetails] = useState({});

  const statusColors = {
    pending: 'orange.200',
    accepted: 'green.200',
    rejected: 'red.200',
  };

  const requestRide = async () => {
    console.log(statusColors[requestStatus]);
  };

  useEffect(() => {
    try {
      axios.get(`http://127.0.0.1:5000/rides/${rideID}`).then(response => {
        setRideDetails(response.data);
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);

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
        bg={'white'}
        position="relative"
      >
        <Grid templateColumns="repeat(7, 1fr)" gap={3}>
          <GridItem
            w="100%"
            bgColor={statusColors[requestStatus]}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'3xl'}>
              {requestStatus}
            </Text>
          </GridItem>

          <GridItem
            w="100%"
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'3xl'}>
              From {rideDetails.from_location}
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'3xl'}>
              To {rideDetails.to_location}
            </Text>
          </GridItem>

          {/* <GridItem w="100%" textAlign={'center'}>
            <Text fontWeight={'bold'}>Ride ID:</Text>
            {rideID}
          </GridItem> */}
          <GridItem w="100%" textAlign={'center'}>
            <b>Date</b>
            {rideDetails.doj}
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <b>Price</b>
            <br />
            Rs. {rideDetails.price}
          </GridItem>
          {/* <GridItem w="100%" textAlign={'center'}>
            <Text fontSize={'lg'}>
              <b>Ride by</b> <br />
              {`${publisherDetail.fname} ${publisherDetail.lname}`}
            </Text>
          </GridItem> */}
        </Grid>
        <br />
        <br />
      </Card>
    </FadeInUp>
  );
};

export default RideCard;

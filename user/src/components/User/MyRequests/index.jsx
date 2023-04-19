import React from 'react';
import Card from '../../layouts/Card';
import { Text } from '@chakra-ui/react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RideCard = props => {
  const rideID = props.rideID;
  const requestStatus = props.requestStatus;
  const [rideDetails, setRideDetails] = useState({});

  const statusColors = {
    pending: 'orange.200',
    accepted: 'green.200',
    rejected: 'red.200',
  };

  useEffect(() => {
    try {
      axios
        .get(
          `https://muj-travel-buddy-backend-production.up.railway.app/rides/${rideID}`
        )
        .then(response => {
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
        mx={['1rem', '2rem', '3rem', '4rem']}
        width="70vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ xs: '400px', sm: '300px', md: '150px', lg: '150px' }}
        bg={'white'}
        position="relative"
      >
        <SimpleGrid columns={[1,2,3,4,5]} spacing={"40px"}>
          <Box
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
          </Box>

          <Box
            w="100%"
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'3xl'}>
              {rideDetails.from_location} 
            </Text>
          </Box>
          <Box
            w="100%"
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'3xl'}>
              {rideDetails.to_location}
            </Text>
          </Box>
          <Box w="100%" textAlign={'center'}>
            <Text fontWeight={600} fontSize={'2xl'}>
              {rideDetails.doj}
            </Text>
          </Box>
          <Box w="100%" textAlign={'center'}>
            <b>Price</b>
            <br />
            Rs. {rideDetails.price}
          </Box>
        </SimpleGrid>
        <br />
        <br />
      </Card>
    </FadeInUp>
  );
};

export default RideCard;

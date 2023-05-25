import React from 'react';
import Card from '../../layouts/Card';
import { Text } from '@chakra-ui/react';
import { SimpleGrid, Box, Button } from '@chakra-ui/react';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RideCard = props => {
  const rideID = props.rideID;
  const requestStatus = props.requestStatus;
  const [rideDetails, setRideDetails] = useState({});
  const [publisher, setPublisher] = useState({});

  const statusColors = {
    pending: 'orange.200',
    accepted: 'green.200',
    rejected: 'red.200',
  };

  useEffect(() => {
    try {
      axios
        .get(
          `https://muj-travel-buddy.onrender.com/rides/${rideID}`
        )
        .then(response => {
          setRideDetails(response.data);
          setPublisher(response.data.publisher);
        });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);

  const callNum = () => {
    const dummyNum = rideDetails.publisher.phone;
    window.open(`tel:+91${dummyNum}`);
  };
  const callEmail = () => {
    const dummyMail = rideDetails.publisher.email;
    window.open(`mailto:${dummyMail}`);
  };
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
        <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={'40px'}>
          <Box
            w="100%"
            bgColor={statusColors[requestStatus]}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'2xl'}>
              {requestStatus.toUpperCase()}
            </Text>
          </Box>

          <Box
            w="100%"
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'2xl'}>
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
            <Text fontWeight={600} fontSize={'2xl'}>
              {rideDetails.to_location}
            </Text>
          </Box>
          <Box w="100%" textAlign={'center'}>
            <Text fontWeight={600} fontSize={'xl'}>
              Date On
            </Text>
              {rideDetails.doj}
          </Box>
          <Box w="100%" textAlign={'center'}>
            <b>Price</b>
            <br />
            Rs. {rideDetails.price}
          </Box>

          <Box align={'center'}>
            {requestStatus == 'accepted' ? (
              <div>
                <Button onClick={callNum}>Call</Button>

                <Button onClick={callEmail} ml={'1rem'}>
                  Email
                </Button>
              </div>
            ) : (
              <Box>
                <Text fontWeight={'700'}>Ride By</Text>
                {publisher.fname} {publisher.lname}
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </Card>
    </FadeInUp>
  );
};

export default RideCard;

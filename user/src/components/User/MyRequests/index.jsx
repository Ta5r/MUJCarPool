import React from 'react';
import Card from '../../layouts/Card';
import { Text } from '@chakra-ui/react';
import {
  StarIcon,
  CalendarIcon,
  RepeatClockIcon,
  ArrowDownIcon,
  TimeIcon,
  ChevronDownIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  Spacer,
  HStack,
  VStack,
  Stack,
  Avatar,
  SimpleGrid,
  Box,
  Button,
} from '@chakra-ui/react';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RideCard = props => {
  const rideID = props.rideID;
  const requestStatus = props.requestStatus;
  const [rideDetails, setRideDetails] = useState({});
  const [publisher, setPublisher] = useState({});

  const statusColors = {
    pending: 'orange.100',
    accepted: 'green.100',
    rejected: 'red.100',
  };

  useEffect(() => {
    try {
      axios
        .get(`https://muj-travel-buddy.onrender.com/rides/${rideID}`)
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
      <Flex
        minW={'340px'}
        bgColor={statusColors[requestStatus]}
        p={'2rem'}
        mx={'1rem'}
        my={'2rem'}
        borderRadius="16px"
        width={['90vw', '80vw', '70vw', '55vw']}
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      >
        <VStack>
          <VStack>
            <Text fontWeight={500} fontSize={['lg', 'lg', 'xl', '2xl']}>
              {rideDetails.from_location}
            </Text>
            <ArrowDownIcon />
            {/* <TriangleDownIcon/> */}
            {/* <ChevronDownIcon/> */}
            <Text fontWeight={500} fontSize={['lg', 'lg', 'xl', '2xl']}>
              {rideDetails.to_location}
            </Text>
          </VStack>
          <HStack>
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1565802527863-1353e4ebce91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80'
              }
            />
            <VStack>
              <Text
                fontSize={['xs', 'sm']}
                fontWeight={'400'}
                color={'#424242'}
              >
                {publisher.fname} {publisher.lname}
                {/* {`${publisherDetail.fname}`} */}
                <br />
                <Flex minW={['30px', '50px', '40px']}>
                  <StarIcon mt={'4px'} px={'1px'} mx={'3px'} />
                  4.4
                </Flex>
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <Spacer />

        <Flex flexDirection={'column'} justifyContent={'space-around'}>
          <Box w="100%">
            <Flex>
              <CalendarIcon mt={['4px', '8px']} mx={'4px'} />

              <Text
                color={'#1e1e1e'}
                fontSize={['md', 'md', 'lg', 'xl']}
                fontWeight={'400'}
              >
                {rideDetails.doj}
              </Text>
            </Flex>
          </Box>
          <Box w="100%">
            <Text
              color={'#1e1e1e'}
              fontSize={['md', 'md', 'lg', 'xl']}
              fontWeight={'400'}
            >
              Rs. {rideDetails.price}
            </Text>
          </Box>
        </Flex>

        <Spacer />

        <VStack justifyContent={'space-around'}>
          <Box align={'center'}>
            {requestStatus === 'accepted' ? (
              <Stack direction={['column', 'column', 'row']}>
                <Button onClick={callNum}>Call</Button>
                <Button onClick={callEmail} ml={'1rem'}>
                  Email
                </Button>
              </Stack>
            ) : requestStatus === 'rejected' ? (
              <Box>
                <Text fontWeight={'700'}>Request Denied</Text>
              </Box>
            ) : (
              <Flex>
                <TimeIcon mt={['4px', '8px']} mx={'4px'} />
                <Text
                  color={'#1e1e1e'}
                  fontSize={['md', 'md', 'lg', 'xl']}
                  fontWeight={'400'}
                >
                  Pending
                </Text>
              </Flex>
            )}
          </Box>
        </VStack>
      </Flex>
    </FadeInUp>
  );
};

export default RideCard;

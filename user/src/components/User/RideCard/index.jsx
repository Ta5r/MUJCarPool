import React from 'react';
import { Text, Button } from '@chakra-ui/react';
import {
  StarIcon,
  ArrowDownIcon,
  TimeIcon,
  ChevronDownIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import { Box, Avatar, HStack, VStack, Flex, Spacer } from '@chakra-ui/react';
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
  const [msg, setMsg] = useState('Request');

  const requestRide = async () => {
    try {
      const d = await axios.post(
        `https://muj-travel-buddy.onrender.com/users/${uid}/requests`,
        { publisher_id: pid, ride_id: rideID }
      );
      setMsg('Requested');
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  return (
    <FadeInUp>
      <Flex
        minW={'340px'}
        bgColor={'white'}
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
              {from}
            </Text>
            <ArrowDownIcon />
            {/* <TriangleDownIcon/> */}
            {/* <ChevronDownIcon/> */}
            <Text fontWeight={500} fontSize={['lg', 'lg', 'xl', '2xl']}>
              {to}
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
                {`${publisherDetail.fname}`}
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
              <TimeIcon mt={['4px', '8px']} mx={'4px'} />
              <Text
                color={'#1e1e1e'}
                fontSize={['md', 'md', 'lg', 'xl']}
                fontWeight={'400'}
              >
                {doj}
              </Text>
            </Flex>
          </Box>
          <Box w="100%">
            <Text
              color={'#1e1e1e'}
              fontSize={['md', 'md', 'lg', 'xl']}
              fontWeight={'400'}
            >
              {nop} Seats
            </Text>
          </Box>
        </Flex>

        <Spacer />

        <VStack>
          <HStack>
            <Text color={'#1e1e1e'} fontSize={['sm', 'md', 'lg', 'lg']}>
              <br />
              <b>Rs. {price}</b>
            </Text>
          </HStack>
          <HStack>
            <Box w="100%">
              <Button onClick={requestRide}>{msg}</Button>
            </Box>
          </HStack>
        </VStack>
      </Flex>

      {/* </Card> */}
    </FadeInUp>
  );
};

export default RideCard;

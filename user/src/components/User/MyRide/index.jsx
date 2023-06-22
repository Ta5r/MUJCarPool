import React from 'react';
import {
  // CalendarIcon,
  // RepeatClockIcon,
  ArrowDownIcon,
  TimeIcon,
  // ChevronDownIcon,
  // TriangleDownIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  Spacer,
  HStack,
  VStack,
  Text,
  Box,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import FadeInUp from '../../Animation/FadeInUp';
import { useNavigate } from 'react-router-dom';

export const MyRide = ({ from, to, nop, price, rideID, doj, UID }) => {
  const navigate = useNavigate();

  const redirectReq = async () => {
    console.log(rideID);
    setTimeout(() => {
      navigate('/user/dashboard/ridestatus/' + rideID);
    }, 1000);
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
        width={['90vw', '80vw', '70vw', '45vw']}
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
            <Box align="center">
              <Button onClick={redirectReq}>Details</Button>
            </Box>
          </HStack>
        </VStack>
      </Flex>
    </FadeInUp>
  );
};

export default MyRide;

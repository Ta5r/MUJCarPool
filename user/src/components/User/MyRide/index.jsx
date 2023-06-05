import React from 'react';
import {
  Box,
  Button,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import Card from '../../layouts/Card';
import FadeInUp from '../../Animation/FadeInUp';
import { useNavigate } from 'react-router-dom';

export const MyRide = ({ from, to, nop, price, rideID, doj, UID }) => {
  var color = 'white';
  var statusColor = 'orange.200';

  const navigate = useNavigate();

  const redirectReq = async () => {
    console.log(rideID);
    setTimeout(() => {
      navigate('/user/dashboard/ridestatus/' + rideID);
    }, 1000);
  };

  return (
    <FadeInUp>
      <Card
        py="3rem"
        my="2rem"
        px="2rem"
        mx={['1rem', '2rem', '3rem', '4rem']}
        width="80vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ xs: '400px', sm: '300px', md: '150px', lg:'150px' }}
        bg={color}
        position="relative"
      >
        <SimpleGrid columns={[1,2, 3, 4, 5, 6]} spacing="40px">
          <Box
            w="100%"
            bgColor={statusColor}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={['2xl','3xl','4xl']}>
              {from}
            </Text>
          </Box>
          <Box
            w="100%"
            bgColor={statusColor}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={['2xl','3xl','4xl']}>
              {to}
            </Text>
          </Box>
          <Box align="center">
            <Text fontWeight={'bold'}>Date of Journey:</Text>
            {doj}
          </Box>
          <Box align="center">
            <Text fontSize={'xl'} fontWeight={'bold'}>
              {nop}
            </Text>
            <Text>Seats</Text>
          </Box>
          <Box align="center">
            <b>Price</b>
            <br />
            Rs. {price}
          </Box>
          <Box align="center">
            <Button onClick={redirectReq}>Details</Button>
          </Box>
        </SimpleGrid>
        <br />
        <br />
      </Card>
    </FadeInUp>
  );
};

export default MyRide;

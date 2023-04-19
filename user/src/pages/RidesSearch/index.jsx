import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
// import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/RideCard';
import {
  ChakraProvider,
  Text,
  Stack,
  Flex,
  Button,
  Image,
  Link,
  Heading,
  theme,
} from '@chakra-ui/react';
import SearchBox from './SearchBox';
const RidesSearch = props => {
  const eid = props.uid;
  const [allRides, setAllRides] = useState([]);
  const UID = localStorage.getItem('UID');

  try {
    axios
      .get('https://muj-travel-buddy-backend-production.up.railway.app/rides')
      .then(response => {
        setAllRides(response.data);
      });
  } catch (err) {
    console.log('Error occured ');
    console.log(err);
  }

  return (
    <ChakraProvider theme={theme}>
      <Navbar
        eid={UID}
        // name={fname}
        // lname={S_lname}
        // email={S_email}
        // phone={S_phone}
      />
      <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1}>
          <Image
            alt={'MUJ-IMAGE'}
            objectFit={'cover'}
            h="100vh"
            w="50vw"
            src={
              'https://mujslcm.jaipur.manipal.edu:122/keen/themes/keen/theme/demo1/dist/assets/media/misc/bg_1.jpg'
            }
          />
        </Flex>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          {/* <Stack spacing={6} w={'full'} maxW={'lg'}> */}
            <SearchBox/>
          {/* </Stack> */}
        </Flex>
        
      </Stack>
      {/* <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Browse Ongoing Rides
      </Text> */}

      {/* <SearchBox /> */}

      {allRides.map(res =>
        res.publisher_id !== parseInt(localStorage.getItem('UID')) ? (
          <RideCard
            key={res.id}
            // myName={fname}
            uid={parseInt(localStorage.getItem('UID'))}
            to={res.to_location}
            from={res.from_location}
            doj={res.doj}
            nop={res.passenger_count}
            price={res.price}
            rideID={res.id}
            pid={res.publisher_id}
            publisher={res.publisher}
          />
        ) : null
      )}
      <SearchBox />
    </ChakraProvider>
  );
};

export default RidesSearch;
